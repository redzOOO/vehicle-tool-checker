import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormData } from "@/types/contact";
import { toast } from "sonner";
import { checkToolCompatibility } from "@/utils/lockTools";
import { supabase } from "@/integrations/supabase/client";

interface ContactSectionProps {
  vehicle?: {
    make: string;
    year: string;
  };
}

export const ContactSection = ({ vehicle }: ContactSectionProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContactSubmit = async (formData: ContactFormData) => {
    try {
      setIsLoading(true);
      
      // Get tool compatibility if vehicle info is available
      if (vehicle) {
        const toolCompatibility = checkToolCompatibility(vehicle.make, vehicle.year);
        console.log('Compatible Tools:', toolCompatibility.compatibleTools);
      }
      
      // Prepare form data
      const emailData = {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
        notes: formData.notes,
        urgency: formData.urgency,
      };
      
      console.log('Sending email data:', emailData);
      
      // Send email using Edge Function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: emailData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      setIsSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error submitting form. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">
        We can offer assistance!
      </h2>
      {!isSubmitted ? (
        <>
          <p className="text-center text-gray-600">
            Please provide your details below and we'll get back to you shortly
          </p>
          <ContactForm onSubmit={handleContactSubmit} isLoading={isLoading} />
        </>
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow animate-fadeIn">
          <p className="text-lg text-gray-700">
            Thank you for submitting your details. We will be in contact with you shortly.
          </p>
        </div>
      )}
    </div>
  );
};