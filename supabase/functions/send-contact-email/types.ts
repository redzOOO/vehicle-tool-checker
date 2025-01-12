export interface Vehicle {
  make: string;
  year: string;
  registration?: string;
  colour?: string;
}

export interface EmailData {
  name: string;
  addressLine1: string;
  postcode: string;
  phone: string;
  notes: string;
  urgency: string;
  vehicle?: Vehicle;
}