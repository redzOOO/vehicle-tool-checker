export interface Vehicle {
  make: string;
  year: string;
  registration?: string;
  colour?: string;
}

export interface ContactFormData {
  name: string;
  location: string;
  phone: string;
  notes: string;
  urgency: string;
  vehicle?: Vehicle;
}

export interface EmailData extends ContactFormData {
  vehicle?: Vehicle;
}