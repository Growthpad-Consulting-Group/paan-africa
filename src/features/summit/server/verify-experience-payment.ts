import { readJson, reply } from '@/shared/lib/server/http';
import { errorMessage } from '@/shared/lib/errors';
import { createClient } from "@supabase/supabase-js";

export async function verifyExperiencePayment(request: Request): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = ((await readJson(request)) ?? {}) as Record<string, any>;

  const { reference, bookingId } = body;

  if (!reference || !bookingId) {
    return reply({ message: "Missing required fields" }, 400);
  }

  // Initialize Supabase client
  let supabase = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  try {
    // Verify payment with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return reply({ 
        message: "Payment verification failed",
        data: verifyData 
      }, 400);
    }

    const paymentData = verifyData.data;

    // Update booking in database
    if (supabase) {
      const { error: updateError } = await supabase
        .from("experience_bookings")
        .update({
          payment_status: 'paid',
          booking_status: 'confirmed',
          payment_reference: reference,
          payment_method: paymentData.channel || 'card',
          payment_gateway_response: paymentData,
          confirmed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', bookingId);

      if (updateError) {
        console.error("Error updating booking:", updateError);
        return reply({ 
          message: "Payment verified but failed to update booking",
          error: updateError.message 
        }, 500);
      }
    }

    // Send confirmation email (you can add this here)

    return reply({ 
      message: "Payment verified and booking confirmed",
      bookingId: bookingId,
      reference: reference,
      paymentData: paymentData
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return reply({ message: "Error verifying payment", error: errorMessage(error) }, 500);
  }
}

