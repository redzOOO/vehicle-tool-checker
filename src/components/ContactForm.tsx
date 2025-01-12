import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ContactFormData } from "@/types/contact";
import { HumanVerification } from "./contact/HumanVerification";
import { UrgencySelect } from "./contact/UrgencySelect";
import { TermsSection } from "./contact/TermsSection";

interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => void;
  isLoading?: boolean;
}

export const ContactForm = ({ onSubmit, isLoading }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    addressLine1: "",
    postcode: "",
    phone: "",
    notes: "",
    urgency: "standard",
  });
  const [isHuman, setIsHuman] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHuman) {
      toast.error("Please verify that you are human");
      return;
    }
    if (!formData.name || !formData.addressLine1 || !formData.postcode || !formData.phone || !formData.urgency) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto animate-fadeIn">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Name *
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="addressLine1" className="block text-sm font-medium">
          First Line of Address *
        </label>
        <Input
          id="addressLine1"
          value={formData.addressLine1}
          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="postcode" className="block text-sm font-medium">
          Postcode *
        </label>
        <Input
          id="postcode"
          value={formData.postcode}
          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium">
          Contact Number *
        </label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <UrgencySelect
        value={formData.urgency}
        onChange={(value) => setFormData({ ...formData, urgency: value })}
      />

      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium">
          Additional Notes
        </label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
        />
      </div>

      <HumanVerification isChecked={isHuman} onCheckedChange={setIsHuman} />

      <TermsSection />

      <Button type="submit" className="w-full" disabled={isLoading || !isHuman}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};