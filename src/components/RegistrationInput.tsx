import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RegistrationInputProps {
  onSubmit: (registration: string) => void;
  isLoading?: boolean;
}

export const RegistrationInput = ({ onSubmit, isLoading }: RegistrationInputProps) => {
  const [registration, setRegistration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registration.trim()) {
      toast.error("Please enter a registration number");
      return;
    }
    onSubmit(registration.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <label htmlFor="registration" className="block text-sm font-medium">
          Enter Vehicle Registration
        </label>
        <Input
          id="registration"
          placeholder="e.g., AB12 CDE"
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
          className="uppercase text-center text-lg"
          maxLength={8}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Checking..." : "Check Compatibility"}
      </Button>
    </form>
  );
};