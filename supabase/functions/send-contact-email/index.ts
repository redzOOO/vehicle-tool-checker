import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { EmailData } from "./types.ts";
import { generateEmailTemplate } from "./emailTemplate.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: EmailData = await req.json();
    console.log('Received form data:', formData);
    
    const emailHtml = generateEmailTemplate(formData);
    console.log('Generated email HTML:', emailHtml);

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