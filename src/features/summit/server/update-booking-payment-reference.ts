import { readJson, reply } from '@/shared/lib/server/http';
import { errorMessage } from '@/shared/lib/errors';
import { createClient } from "@supabase/supabase-js";

export async function updateBookingPaymentReference(request: Request): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = ((await readJson(request)) ?? {}) as Record<string, any>;

  const { bookingId, paymentReference } = body;

  if (!bookingId || !paymentReference) {
    return reply({ message: "Missing required fields" }, 400);
  }

  // Initialize Supabase client
  let supabase = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  } else {
    return reply({ message: "Supabase not configured, skipping update" });
  }

  try {
    // Skip if it's a temporary ID
    if (bookingId.startsWith('temp_')) {
      return reply({ message: "Temporary booking ID, skipping database update" });
    }

    const { error } = await supabase
      .from("experience_bookings")
      .update({
        payment_reference: paymentReference,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    if (error) {
      console.error("Error updating booking with payment reference:", error);
      return reply({ message: "Failed to update booking", error: error.message }, 500);
    }

    return reply({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return reply({ message: "Error updating booking", error: errorMessage(error) }, 500);
  }
}

