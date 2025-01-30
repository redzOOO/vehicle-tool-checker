import { supabase } from "@/integrations/supabase/client";
import { checkToolCompatibility } from "./lockTools";

export interface Vehicle {
  make: string;
  colour: string;
  year: string;
  registration: string;
}

export interface VehicleCheckResult {
  isCompatible: boolean;
  vehicle: Vehicle | null;
  error?: string;
}

export const checkVehicleCompatibility = async (registration: string): Promise<VehicleCheckResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('vehicle-check', {
      body: { registration }
    });

    if (error) {
      console.error('Error calling vehicle-check function:', error);
      return {
        isCompatible: false,
        vehicle: null,
        error: "Vehicle information could not be found. Please check the registration number and try again."
      };
    }

    // Check tool compatibility based on the vehicle data
    if (data.vehicle) {
      const compatibility = checkToolCompatibility(data.vehicle.make, data.vehicle.year);
      return {
        ...data,
        isCompatible: compatibility.canService
      };
    }

    return {
      isCompatible: false,
      vehicle: null,
      error: "Vehicle information could not be found. Please check the registration number and try again."
    };
  } catch (error) {
    console.error('Error in checkVehicleCompatibility:', error);
    return {
      isCompatible: false,
      vehicle: null,
      error: "Vehicle information could not be found. Please check the registration number and try again."
    };
  }
};