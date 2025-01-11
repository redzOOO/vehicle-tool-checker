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
      throw new Error("Failed to access DVLA API key");
    }

    if (!data) {
      console.log('No DVLA API key found');
      // For development/testing, use mock response
      const mockVehicle = {
        make: "Toyota",
        model: "Corolla",
        year: "2020",
        registration: registration,
      };
      return {
        isCompatible: true,
        vehicle: mockVehicle,
      };
    }

    const apiKey = data.value;
    console.log('Successfully retrieved DVLA API key');
    
    try {
      const response = await fetch(`${window.location.origin}/api/vehicle-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ registration })
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      return {
        isCompatible: responseData.isCompatible,
        vehicle: {
          make: responseData.vehicle.make,
          model: responseData.vehicle.model,
          year: responseData.vehicle.year,
          registration: registration,
        }
      };
    } catch (apiError) {
      console.error('API call failed:', apiError);
      // Fallback to mock response for development
      console.log('Falling back to mock response');
      const mockVehicle = {
        make: "Toyota",
        model: "Corolla",
        year: "2020",
        registration: registration,
      };
      return {
        isCompatible: true,
        vehicle: mockVehicle,
      };
    }
  } catch (error) {
    console.error('Error in checkVehicleCompatibility:', error);
    throw error;
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