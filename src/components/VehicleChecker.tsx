import { useState } from "react";
import { RegistrationInput } from "@/components/RegistrationInput";
import { VehicleDetails } from "@/components/VehicleDetails";
import { toast } from "sonner";
import { checkVehicleCompatibility } from "@/utils/vehicleUtils";
import type { Vehicle } from "@/utils/vehicleUtils";

interface VehicleCheckerProps {
  onCompatibleVehicle: () => void;
}

export const VehicleChecker = ({ onCompatibleVehicle }: VehicleCheckerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isCompatible, setIsCompatible] = useState(false);

  const handleRegistrationSubmit = async (registration: string) => {
    setIsLoading(true);
    try {
      const result = await checkVehicleCompatibility(registration);
      if (result) {
        setVehicle(result.vehicle);
        setIsCompatible(result.isCompatible);
        if (result.isCompatible) {
          onCompatibleVehicle();
        } else {
          toast.error("Sorry, this vehicle is not compatible with our tools");
        }
      }
    } catch (error) {
      toast.error("An error occurred while checking vehicle compatibility");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <RegistrationInput onSubmit={handleRegistrationSubmit} isLoading={isLoading} />
      {vehicle && <VehicleDetails vehicle={vehicle} isCompatible={isCompatible} />}
    </div>
  );
};