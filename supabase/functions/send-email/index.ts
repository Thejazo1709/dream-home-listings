import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EmailRequest {
  type: "welcome" | "visit_scheduled" | "inquiry" | "feedback";
  to: string;
  name: string;
  data?: {
    propertyTitle?: string;
    visitDate?: string;
    visitTime?: string;
    message?: string;
    subject?: string;
    rating?: number;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { type, to, name, data }: EmailRequest = await req.json();

    // Validate required fields
    if (!type || !to || !name) {
      throw new Error("Missing required fields: type, to, and name are required");
    }

    let subject = "";
    let html = "";

    switch (type) {
      case "welcome":
        subject = "Welcome to TB Real Estate! 🏠";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">Welcome to TB Real Estate, ${name}!</h1>
            <p>Thank you for creating an account with us. We're excited to help you find your perfect home.</p>
            <p>With your TB Real Estate account, you can:</p>
            <ul>
              <li>Save and compare properties</li>
              <li>Schedule property visits</li>
              <li>List your own properties</li>
              <li>Receive personalized recommendations</li>
            </ul>
            <p>Start exploring our curated collection of premium properties today!</p>
            <p style="margin-top: 30px;">Best regards,<br/>The TB Real Estate Team</p>
          </div>
        `;
        break;

      case "visit_scheduled":
        subject = "Your Property Visit is Confirmed! 📅";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">Visit Scheduled Successfully!</h1>
            <p>Dear ${name},</p>
            <p>Your property visit has been scheduled. Here are the details:</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Property:</strong> ${data?.propertyTitle || "N/A"}</p>
              <p><strong>Date:</strong> ${data?.visitDate || "N/A"}</p>
              <p><strong>Time:</strong> ${data?.visitTime || "N/A"}</p>
              ${data?.message ? `<p><strong>Your Message:</strong> ${data.message}</p>` : ""}
            </div>
            <p>Our team will contact you shortly to confirm the visit. If you have any questions, feel free to reach out to us.</p>
            <p style="margin-top: 30px;">Best regards,<br/>The TB Real Estate Team</p>
          </div>
        `;
        break;

      case "inquiry":
        subject = "We've Received Your Inquiry! 📬";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">Thank You for Your Inquiry!</h1>
            <p>Dear ${name},</p>
            <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
            ${data?.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ""}
            ${data?.message ? `<p><strong>Your Message:</strong> ${data.message}</p>` : ""}
            <p>In the meantime, feel free to browse more properties on our website.</p>
            <p style="margin-top: 30px;">Best regards,<br/>The TB Real Estate Team</p>
          </div>
        `;
        break;

      case "feedback":
        subject = "Thank You for Your Feedback! ⭐";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">Thank You for Your Feedback!</h1>
            <p>Dear ${name},</p>
            <p>We truly appreciate you taking the time to share your experience with TB Real Estate.</p>
            ${data?.rating ? `<p><strong>Your Rating:</strong> ${"⭐".repeat(data.rating)}</p>` : ""}
            ${data?.message ? `<p><strong>Your Feedback:</strong> ${data.message}</p>` : ""}
            <p>Your feedback helps us improve our services and serve you better.</p>
            <p style="margin-top: 30px;">Best regards,<br/>The TB Real Estate Team</p>
          </div>
        `;
        break;

      default:
        throw new Error("Invalid email type");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TB Real Estate <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    const responseData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", responseData);
      throw new Error(responseData.message || "Failed to send email");
    }

    console.log("Email sent successfully:", responseData);

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
