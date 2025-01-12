import { Card } from "@/components/ui/card";

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
  return (
    <Card className="p-6 w-full max-w-md mx-auto animate-fadeIn">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Vehicle Details</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              isCompatible
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isCompatible ? "Compatible" : "Not Compatible"}
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
      </div>
    </Card>
  );
};