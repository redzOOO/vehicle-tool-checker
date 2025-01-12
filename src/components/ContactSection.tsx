import { useState } from "react";
import { ContactForm, ContactFormData } from "@/components/ContactForm";
import { toast } from "sonner";
import { checkToolCompatibility } from "@/utils/lockTools";

interface ContactSectionProps {
  vehicle?: {
    make: string;
    year: string;
  };
}

export const ContactSection = ({ vehicle }: ContactSectionProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = async (formData: ContactFormData) => {
    try {
      // Get tool compatibility if vehicle info is available
      if (vehicle) {
        const toolCompatibility = checkToolCompatibility(vehicle.make, vehicle.year);
        console.log('Compatible Tools:', toolCompatibility.compatibleTools);
      }
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
    } catch (error) {
      toast.error("Error submitting form");
      console.error(error);
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
          <ContactForm onSubmit={handleContactSubmit} />
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