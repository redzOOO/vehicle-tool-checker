import { useState } from "react";
import { ContactFormData } from "@/types/contact";
import { toast } from "sonner";
import { checkToolCompatibility } from "@/utils/lockTools";
import { supabase } from "@/integrations/supabase/client";
import { ContactMessage } from "./contact/ContactMessage";
import { SuccessMessage } from "./contact/SuccessMessage";

interface ContactSectionProps {
  vehicle?: {
    make: string;
    year: string;
    registration?: string;
    colour?: string;
  };
}

export const ContactSection = ({ vehicle }: ContactSectionProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContactSubmit = async (formData: ContactFormData) => {
    try {
      setIsLoading(true);
      
      if (vehicle) {
        const toolCompatibility = checkToolCompatibility(vehicle.make, vehicle.year);
        console.log('Compatible Tools:', toolCompatibility.compatibleTools);
      }
      
      const emailData = {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
        notes: formData.notes,
        urgency: formData.urgency,
        vehicle
      };
      
      console.log('Sending email data:', emailData);
      
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
        <ContactMessage onSubmit={handleContactSubmit} isLoading={isLoading} />
      ) : (
        <SuccessMessage />
      )}
    </div>
  );
};