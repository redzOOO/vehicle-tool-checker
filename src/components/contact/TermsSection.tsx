export const TermsSection = () => {
  return (
    <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium mb-2">Important Information:</h4>
      <p>Before we can proceed with any vehicle services, we will require:</p>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <li>Valid proof of vehicle ownership (V5C document)</li>
        <li>A valid driving licence matching the vehicle registration</li>
        <li>Additional identity verification may be required</li>
      </ul>
      <p className="mt-2">These documents will be requested as part of our verification process after initial contact.</p>
    </div>
  );
};