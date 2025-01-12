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
    registration?: string;
    colour?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log('Received form data:', formData);
    
    let toolCompatibilityInfo = '';
    let vehicleInfo = '';
    
    if (formData.vehicle) {
      const toolCompatibility = checkToolCompatibility(formData.vehicle.make, formData.vehicle.year);
      
      vehicleInfo = `
        <div style="margin-top: 24px; margin-bottom: 24px;">
          <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Vehicle Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Registration:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.vehicle.registration || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Make:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.vehicle.make}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Year:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.vehicle.year}</td>
            </tr>
            ${formData.vehicle.colour ? `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Colour:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.vehicle.colour}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Tool Compatibility</h3>
          <p><strong>Compatible Tools:</strong> ${toolCompatibility.compatibleTools.join(', ') || 'None'}</p>
        </div>
      `;
    }
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <h2 style="color: #1a1f2c; margin: 0 0 16px 0; font-size: 24px;">New Contact Form Submission</h2>
          <p style="color: #4b5563; margin: 0;">A new contact form has been submitted with the following details:</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Location:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.location}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Urgency:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; ${formData.urgency === 'urgent' ? 'color: #dc2626; font-weight: bold;' : ''}">${formData.urgency.toUpperCase()}</td>
            </tr>
          </table>
        </div>

        ${formData.notes ? `
          <div style="margin-bottom: 24px;">
            <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Additional Notes</h3>
            <p style="background-color: #f9fafb; padding: 12px; border-radius: 4px; margin: 0;">${formData.notes}</p>
          </div>
        ` : ''}
        
        ${vehicleInfo}
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