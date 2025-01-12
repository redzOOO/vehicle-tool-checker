import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { checkToolCompatibility } from "../../../src/utils/lockTools.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  location: string;
  phone: string;
  notes: string;
  urgency: string;
  vehicle?: {
    make: string;
    year: string;
    registration: string;
    colour: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log('Received form data:', formData);
    
    // Get tool compatibility if vehicle info is available
    let toolCompatibilityInfo = '';
    if (formData.vehicle) {
      const toolCompatibility = checkToolCompatibility(formData.vehicle.make, formData.vehicle.year);
      toolCompatibilityInfo = `
        <h3 style="color: #333; margin-top: 20px;">Vehicle Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Registration:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.vehicle.registration}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Make:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.vehicle.make}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Year:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.vehicle.year}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Colour:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.vehicle.colour}</td>
          </tr>
        </table>
        <h3 style="color: #333;">Tool Compatibility</h3>
        <p><strong>Compatible Tools:</strong> ${toolCompatibility.compatibleTools.join(', ') || 'None'}</p>
      `;
    }
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1f2c; border-bottom: 2px solid #1a1f2c; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Location:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.location}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Urgency:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; ${formData.urgency === 'urgent' ? 'color: #dc2626;' : ''}">${formData.urgency}</td>
          </tr>
        </table>

        ${formData.notes ? `
          <h3 style="color: #333;">Additional Notes</h3>
          <p style="background: #f9fafb; padding: 12px; border-radius: 4px; margin: 10px 0;">${formData.notes}</p>
        ` : ''}
        
        ${toolCompatibilityInfo}
      </div>
    `;

    console.log('Sending email with HTML:', emailHtml);

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Auto Unlock Services <contact@northwalesautounlock.co.uk>",
        to: ["lee.redhead@outlook.com"],
        subject: `New Contact Form Submission - ${formData.urgency.toUpperCase()} Request`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend API error:', error);
      throw new Error(error);
    }

    const data = await res.json();
    console.log('Email sent successfully:', data);
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);