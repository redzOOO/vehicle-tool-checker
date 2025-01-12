import React from 'react';
import { ContactForm } from '@/components/ContactForm';
import { ContactFormData } from '@/types/contact';

interface ContactMessageProps {
  onSubmit: (formData: ContactFormData) => void;
  isLoading: boolean;
}

export const ContactMessage = ({ onSubmit, isLoading }: ContactMessageProps) => {
  return (
    <>
      <p className="text-center text-gray-600">
        Please provide your details below and we'll get back to you shortly
      </p>
      <ContactForm onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
};