import React from 'react';

export const SuccessMessage = () => {
  return (
    <div className="text-center p-8 bg-primary/5 border-2 border-primary rounded-lg shadow-lg animate-fadeIn">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-primary">
          Thank You for Contacting Us!
        </h3>
        <p className="text-lg text-gray-700">
          We have received your details and will be in touch with you shortly.
        </p>
        <p className="text-sm text-gray-600">
          Our team typically responds within 1-2 hours during business hours.
        </p>
      </div>
    </div>
  );
};