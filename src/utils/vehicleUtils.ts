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
  vehicle: Vehicle;
}

const getMockVehicleResponse = (registration: string): VehicleCheckResult => {
  const mockVehicle = {
    make: "Toyota",
    colour: "Black",
    year: "2020",
    registration: registration,
  };
  
  const compatibility = checkToolCompatibility(mockVehicle.make, mockVehicle.year);
  
  return {
    isCompatible: compatibility.isCompatible,
    vehicle: mockVehicle
  };
};

export const checkVehicleCompatibility = async (registration: string): Promise<VehicleCheckResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('vehicle-check', {
      body: { registration }
    });

    if (error) {
      console.error('Error calling vehicle-check function:', error);
      return getMockVehicleResponse(registration);
    }

    // Check tool compatibility based on the vehicle data
    const compatibility = checkToolCompatibility(data.vehicle.make, data.vehicle.year);
    
    return {
      ...data,
      isCompatible: compatibility.isCompatible
    };
  } catch (error) {
    console.error('Error in checkVehicleCompatibility:', error);
    return getMockVehicleResponse(registration);
  }
};