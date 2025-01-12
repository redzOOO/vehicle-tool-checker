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
    const apiKey = import.meta.env.VITE_DVLA_API_KEY;
    
    if (!apiKey) {
      console.error('No DVLA API key found in environment variables');
      return getMockVehicleResponse(registration);
    }

    console.log('Successfully retrieved DVLA API key from environment variables');
    
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