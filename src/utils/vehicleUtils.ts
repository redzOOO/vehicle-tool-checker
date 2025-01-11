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

export const checkVehicleCompatibility = async (registration: string): Promise<VehicleCheckResult> => {
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
      return getMockVehicleResponse(registration);
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
      console.log('Falling back to mock response');
      return getMockVehicleResponse(registration);
    }
  } catch (error) {
    console.error('Error in checkVehicleCompatibility:', error);
    throw error;
  }
};

const getMockVehicleResponse = (registration: string): VehicleCheckResult => ({
  isCompatible: true,
  vehicle: {
    make: "Toyota",
    model: "Corolla",
    year: "2020",
    registration: registration,
  }
});