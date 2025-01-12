import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => void;
  isLoading?: boolean;
}

export interface ContactFormData {
  name: string;
  location: string;
  phone: string;
  notes: string;
  urgency: string;
}

export const ContactForm = ({ onSubmit, isLoading }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    location: "",
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
    if (!formData.name || !formData.location || !formData.phone || !formData.urgency) {
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
        <label htmlFor="location" className="block text-sm font-medium">
          Location (Address or Postcode) *
        </label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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

      <div className="space-y-2">
        <label htmlFor="urgency" className="block text-sm font-medium">
          Urgency Level *
        </label>
        <Select
          value={formData.urgency}
          onValueChange={(value) => setFormData({ ...formData, urgency: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select urgency level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard - Within 48 hours</SelectItem>
            <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
            <SelectItem value="emergency">Emergency - ASAP</SelectItem>
          </SelectContent>
        </Select>
      </div>

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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="human"
          checked={isHuman}
          onCheckedChange={(checked) => setIsHuman(checked as boolean)}
          className="data-[state=checked]:bg-primary"
        />
        <label
          htmlFor="human"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I confirm I am human *
        </label>
      </div>

      <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Important Information:</h4>
        <p>Before we can proceed with any vehicle services, we will require:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Valid proof of vehicle ownership (V5C document)</li>
          <li>A valid driving licence matching the vehicle registration</li>
          <li>Additional identity verification may be required</li>
        </ul>
        <p className="mt-2">These documents will be requested as part of our verification process after initial contact.</p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !isHuman}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};