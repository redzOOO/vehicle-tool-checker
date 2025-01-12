import { useState } from "react";
import { VehicleChecker } from "@/components/VehicleChecker";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<{ make: string; year: string; registration: string } | undefined>();
  const [isVehicleCompatible, setIsVehicleCompatible] = useState(false);

  const handleCompatibleVehicle = (vehicle: { make: string; year: string; registration: string }, isCompatible: boolean) => {
    setCurrentVehicle(vehicle);
    setIsVehicleCompatible(isCompatible);
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              North Wales Auto Unlock Services
            </h1>
            <p className="text-gray-600">
              Enter your vehicle registration to check compatibility with our auto unlocking tools
            </p>
          </div>

          <div className="space-y-8">
            <VehicleChecker onCompatibleVehicle={handleCompatibleVehicle} />
            {showContactForm && isVehicleCompatible && <ContactSection vehicle={currentVehicle} />}
          </div>
        </div>
      </main>
      
      <footer className="bg-primary text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
              <p className="text-sm">
                24/7 Emergency Service<br />
                Phone: 0800 123 4567<br />
                Enter your registration above to check compatibility
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Service Areas</h3>
              <p className="text-sm">
                Covering all of North Wales including:<br />
                Wrexham • Rhyl • Llandudno<br />
                Bangor • Colwyn Bay • Prestatyn
              </p>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-blue-800">
            <p className="text-sm">
              © {new Date().getFullYear()} North Wales Auto Unlock Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;