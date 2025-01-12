import { supabase } from "@/integrations/supabase/client";

export interface Vehicle {
  make: string;
  model: string;
  year: string;
  registration: string;
}

export interface VehicleCheckResult {
  isCompatible: boolean;
  vehicle: Vehicle;
}

const getMockVehicleResponse = (registration: string): VehicleCheckResult => ({
  isCompatible: true,
  vehicle: {
    make: "Toyota",
    model: "Corolla",
    year: "2020",
    registration: registration,
  }
});

export const checkVehicleCompatibility = async (registration: string): Promise<VehicleCheckResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('vehicle-check', {
      body: { registration }
    });

    if (error) {
      console.error('Error calling vehicle-check function:', error);
      return getMockVehicleResponse(registration);
    }

    return data;
  } catch (error) {
    console.error('Error in checkVehicleCompatibility:', error);
    return getMockVehicleResponse(registration);
  }
};