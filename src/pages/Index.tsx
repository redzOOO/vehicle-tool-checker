import { useState } from "react";
import { RegistrationInput } from "@/components/RegistrationInput";
import { VehicleDetails } from "@/components/VehicleDetails";
import { ContactForm, ContactFormData } from "@/components/ContactForm";
import { toast } from "sonner";
import { getDvlaApiKey, setDvlaApiKey } from "@/utils/apiKeys";

const checkVehicleCompatibility = async (registration: string) => {
  const apiKey = getDvlaApiKey();
  
  if (!apiKey) {
    // For demo purposes, set the API key if not present
    // In production, you would want to handle this differently
    setDvlaApiKey('');
    toast.error("Please configure DVLA API key in settings");
    throw new Error("DVLA API key not configured");
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mock response - replace with actual DVLA API call
  return {
    isCompatible: registration.startsWith("A"),
    vehicle: {
      make: "Toyota",
      model: "Corolla",
      year: "2020",
      registration: registration,
    },
  };
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<any>(null);
  const [isCompatible, setIsCompatible] = useState(false);

  const handleRegistrationSubmit = async (registration: string) => {
    setIsLoading(true);
    try {
      const result = await checkVehicleCompatibility(registration);
      setVehicle(result.vehicle);
      setIsCompatible(result.isCompatible);
      if (!result.isCompatible) {
        toast.error("Sorry, this vehicle is not compatible with our tools");
      }
    } catch (error) {
      toast.error("Error checking vehicle compatibility");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Thank you! We'll be in touch soon.");
      // Reset form
      setVehicle(null);
      setIsCompatible(false);
    } catch (error) {
      toast.error("Error submitting form");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
            <RegistrationInput onSubmit={handleRegistrationSubmit} isLoading={isLoading} />

            {vehicle && (
              <VehicleDetails vehicle={vehicle} isCompatible={isCompatible} />
            )}

            {isCompatible && vehicle && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">
                  We can offer assistance!
                </h2>
                <p className="text-center text-gray-600">
                  Please provide your details below and we'll get back to you shortly
                </p>
                <ContactForm onSubmit={handleContactSubmit} isLoading={isLoading} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-primary text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
              <p className="text-sm">
                24/7 Emergency Service<br />
                Phone: 0800 123 4567<br />
                Email: info@nwautounlock.co.uk
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
            <div>
              <h3 className="font-semibold text-lg mb-3">Certifications</h3>
              <p className="text-sm">
                • Fully Licensed & Insured<br />
                • DBS Checked<br />
                • Member of the MLA
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