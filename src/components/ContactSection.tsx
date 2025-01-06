import { ContactForm, ContactFormData } from "@/components/ContactForm";
import { toast } from "sonner";

export const ContactSection = () => {
  const handleContactSubmit = async (formData: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <p className="text-center text-gray-600">
        Please provide your details below and we'll get back to you shortly
      </p>
      <ContactForm onSubmit={handleContactSubmit} />
    </div>
  );
};