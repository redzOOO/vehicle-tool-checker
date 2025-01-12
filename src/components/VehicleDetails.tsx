import { Card } from "@/components/ui/card";
import { checkToolCompatibility } from "@/utils/lockTools";

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
  const toolCompatibility = checkToolCompatibility(vehicle.make, vehicle.year);

  return (
    <Card className="p-6 w-full max-w-md mx-auto animate-fadeIn">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Vehicle Details</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              toolCompatibility.isCompatible
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {toolCompatibility.isCompatible ? "Compatible" : "Not Compatible"}
          </span>
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
        {toolCompatibility.isCompatible && toolCompatibility.compatibleTools.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Compatible Tools:</h4>
            <ul className="space-y-1">
              {toolCompatibility.compatibleTools.map((tool, index) => (
                <li key={index} className="text-sm bg-gray-50 p-2 rounded">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};