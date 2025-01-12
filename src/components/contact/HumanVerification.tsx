import { Checkbox } from "@/components/ui/checkbox";

interface HumanVerificationProps {
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const HumanVerification = ({ isChecked, onCheckedChange }: HumanVerificationProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="human"
        checked={isChecked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
        className="data-[state=checked]:bg-primary"
      />
      <label
        htmlFor="human"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I confirm I am human *
      </label>
    </div>
  );
};