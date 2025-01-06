import { useState } from "react";
import { RegistrationInput } from "@/components/RegistrationInput";
import { VehicleDetails } from "@/components/VehicleDetails";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Vehicle {
  make: string;
  model: string;
  year: string;
  registration: string;
}

interface VehicleCheckerProps {
  onCompatibleVehicle: () => void;
}

const checkVehicleCompatibility = async (registration: string) => {
  try {
    const { data, error } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'DVLA_API_KEY')
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching DVLA API key:', error);
      toast.error("Failed to access DVLA API key");
      return null;
    }

    if (!data) {
      toast.error("DVLA API key not configured. Please contact support.");
      return null;
    }

    const apiKey = data.value;
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock response - replace with actual DVLA API call
    return {
      isCompatible: registration.startsWith("A"),
      vehicle: {
        make: "Toyota",
        model: "Corolla",
        year: "2020",
        registration: registration,
      },
    };
  } catch (error) {
    console.error('Error in checkVehicleCompatibility:', error);
    toast.error("An unexpected error occurred while checking vehicle compatibility");
    return null;
  }
};

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