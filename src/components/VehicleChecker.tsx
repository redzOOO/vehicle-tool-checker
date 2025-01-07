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
      console.log('No DVLA API key found');
      toast.error("DVLA API key not configured. Please contact support.");
      return null;
    }

    const apiKey = data.value;
    console.log('Successfully retrieved DVLA API key');
    
    // For development/testing, we'll use a mock response
    // In production, this would be replaced with the actual DVLA API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock vehicle data based on registration
    const mockVehicle = {
      make: "Toyota",
      model: "Corolla",
      year: "2020",
      registration: registration,
    };

    // Mock compatibility check (for testing purposes)
    const isCompatible = true;

    console.log('Vehicle check completed:', { isCompatible, vehicle: mockVehicle });
    
    return {
      isCompatible,
      vehicle: mockVehicle,
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