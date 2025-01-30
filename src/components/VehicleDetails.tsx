import { Card } from "@/components/ui/card";
import { checkToolCompatibility } from "@/utils/lockTools";
import { Check, X } from "lucide-react";

interface Vehicle {
  make: string;
  colour: string;
  year: string;
  registration: string;
}

interface VehicleDetailsProps {
  vehicle: Vehicle;
  isCompatible: boolean;
}

export const VehicleDetails = ({ vehicle, isCompatible }: VehicleDetailsProps) => {
  const serviceability = checkToolCompatibility(vehicle.make, vehicle.year);

  const ServiceabilityIndicator = ({ condition, text }: { condition: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      {condition ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <X className="h-5 w-5 text-red-600" />
      )}
      <span className={`text-sm ${condition ? 'text-green-800' : 'text-red-800'}`}>
        {text}
      </span>
    </div>
  );

  return (
    <Card className="p-6 w-full max-w-md mx-auto animate-fadeIn">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Vehicle Details</h3>
          <div className="flex flex-col space-y-2">
            <ServiceabilityIndicator 
              condition={serviceability.canService} 
              text="Can be worked on"
            />
            <ServiceabilityIndicator 
              condition={serviceability.canRecode} 
              text="Recoding available"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Registration</p>
            <p className="font-medium">{vehicle.registration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Make</p>
            <p className="font-medium">{vehicle.make}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Colour</p>
            <p className="font-medium">{vehicle.colour}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Year</p>
            <p className="font-medium">{vehicle.year}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};