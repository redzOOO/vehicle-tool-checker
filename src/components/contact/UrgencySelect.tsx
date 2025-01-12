import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UrgencySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const UrgencySelect = ({ value, onChange }: UrgencySelectProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="urgency" className="block text-sm font-medium">
        Urgency Level *
      </label>
      <Select value={value} onValueChange={onChange}>
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
  );
};