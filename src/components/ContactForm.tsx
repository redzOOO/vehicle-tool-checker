import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  drivingLicence?: File;
  v5Document?: File;
}

export const ContactForm = ({ onSubmit, isLoading }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    location: "",
    phone: "",
    notes: "",
    urgency: "standard",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.phone || !formData.urgency) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'drivingLicence' | 'v5Document') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size must be less than 5MB");
        return;
      }
      setFormData({ ...formData, [field]: file });
    }
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
        <label htmlFor="drivingLicence" className="block text-sm font-medium">
          Driving Licence (Photo/Scan) *
        </label>
        <Input
          id="drivingLicence"
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => handleFileChange(e, 'drivingLicence')}
          required
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="v5" className="block text-sm font-medium">
          V5 Document (Photo/Scan) *
        </label>
        <Input
          id="v5"
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => handleFileChange(e, 'v5Document')}
          required
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};