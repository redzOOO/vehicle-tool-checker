import { useState } from "react";
import { RegistrationInput } from "@/components/RegistrationInput";
import { VehicleDetails } from "@/components/VehicleDetails";
import { ContactForm, ContactFormData } from "@/components/ContactForm";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const checkVehicleCompatibility = async (registration: string) => {
  try {
    // Fetch the API key from Supabase secrets table
    const { data, error } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'DVLA_API_KEY')
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching DVLA API key:', error);
      toast.error("Failed to access DVLA API key");
      return null;
    }

    if (!data) {
      toast.error("DVLA API key not configured. Please contact support.");
      return null;
    }

    const apiKey = data.value;
    
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
  } catch (error) {
    console.error('Error in checkVehicleCompatibility:', error);
    toast.error("An unexpected error occurred while checking vehicle compatibility");
    return null;
  }
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<any>(null);
  const [isCompatible, setIsCompatible] = useState(false);

  const handleRegistrationSubmit = async (registration: string) => {
    setIsLoading(true);
    try {
      const result = await checkVehicleCompatibility(registration);
      if (result) {
        setVehicle(result.vehicle);
        setIsCompatible(result.isCompatible);
        if (!result.isCompatible) {
          toast.error("Sorry, this vehicle is not compatible with our tools");
        }
      }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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