import { errorMessage } from '@/utils/errors';
import { createMailTransport } from '@/lib/server/mailer';
import { verifyRecaptcha } from '@/lib/server/recaptcha';
import { readJson, reply, text } from '@/lib/server/http';
import { createClient } from "@supabase/supabase-js";

/** POST /api/send-enquiry: delivery-partner enquiry from the clients page. */
export async function sendEnquiry(request: Request): Promise<Response> {
  const body = (await readJson(request)) ?? {};
  const name = text(body.name);
  const email = text(body.email);
  const company = text(body.company);
  const region = text(body.region);
  const message = text(body.message);
  const recaptchaToken = text(body.recaptchaToken);

  // Validate required fields
  if (!name || !email || !company || !region || !message || !recaptchaToken) {
    return reply({ message: "Missing required fields" }, 400);
  }

  const recaptcha = await verifyRecaptcha(recaptchaToken);
  if (!recaptcha.ok) return reply({ message: recaptcha.message }, recaptcha.status);

  // Create a transporter using SMTP
  const transporter = createMailTransport();

  // Initialize Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  try {
    // Send both emails concurrently
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      // Email to secretariat@paan.africa (admin)
      transporter.sendMail({
        from: `"PAAN Enquiry Form" <${process.env.INFO_EMAIL}>`,
        to: process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `New Delivery Partner Enquiry from ${name}`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                New Delivery Partner Enquiry
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Company:</strong> ${company}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Target Region:</strong> ${region}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Project Details:</strong></p>
                <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${message}</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
                <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
                <p style="margin: 5px 0 0; font-size: 12px;">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
              </td>
            </tr>
          </table>
        `,
      }),
      // Confirmation email to the user
      transporter.sendMail({
        from: `"PAAN Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: "Thank You for Your Enquiry - PAAN",
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                Thank You for Your Enquiry!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Thank you for reaching out to the Pan-African Agency Network (PAAN). We have received your enquiry and will connect you with the right partners for your project in ${region}.</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Our team will review your requirements and get back to you within 48 hours with potential partners that match your needs.</p>
                <p style="margin: 20px 0 0; font-size: 16px;">In the meantime, you can explore our network of certified agencies and freelancers:</p>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="https://paan.africa/clients" style="background-color: #F25849; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-size: 14px; font-weight: bold;">Explore Our Network</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
                <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
                <p style="margin: 5px 0 0; font-size: 12px;">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
              </td>
            </tr>
          </table>
        `,
      }),
    ]);

    // Check if either email failed
    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
    }
    if (userEmailResult.status === "rejected") {
      console.error("Failed to send user confirmation email:", userEmailResult.reason);
    }
    if (adminEmailResult.status === "rejected" || userEmailResult.status === "rejected") {
      throw new Error("One or both emails failed to send");
    }

    // Log submission to Supabase
    const { error } = await supabase.from("enquiry_submissions").insert({
      name,
      email,
      company,
      region,
      message,
    });

    if (error) {
      console.error("Error logging submission to Supabase:", error);
      // Note: Not failing the request, as emails were sent successfully
    }

    return reply({ message: "Enquiry sent successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return reply({ message: "Error sending enquiry", error: errorMessage(error) }, 500);
  }
}
