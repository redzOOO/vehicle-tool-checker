import { EmailData } from "./types.ts";
import { checkToolCompatibility } from "./utils/lockTools.ts";

export const generateVehicleSection = (vehicle?: EmailData['vehicle']) => {
  if (!vehicle) return '';
  
  const toolCompatibility = checkToolCompatibility(vehicle.make, vehicle.year);
  
  return `
    <div style="margin-top: 24px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
      <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
        Vehicle Information
      </h3>
      <div style="display: grid; grid-template-columns: 120px 1fr; gap: 8px;">
        <div style="color: #64748b; font-weight: 500;">Registration:</div>
        <div style="color: #1e293b; font-weight: 600;">${vehicle.registration || 'Not provided'}</div>
        
        <div style="color: #64748b; font-weight: 500;">Make:</div>
        <div style="color: #1e293b;">${vehicle.make}</div>
        
        <div style="color: #64748b; font-weight: 500;">Year:</div>
        <div style="color: #1e293b;">${vehicle.year}</div>
      </div>
      
      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
        <h4 style="color: #1e293b; font-size: 16px; margin: 0 0 8px 0;">Compatible Tools</h4>
        <div style="color: #1e293b;">
          ${toolCompatibility.compatibleTools.length > 0 
            ? toolCompatibility.compatibleTools.join(', ') 
            : 'None found'}
        </div>
      </div>
    </div>
  `;
};

export const generateEmailTemplate = (data: EmailData): string => {
  const template = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background-color: #f1f5f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); padding: 32px;">
          <div style="background-color: #1e40af; padding: 24px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h2>
            <p style="color: #e2e8f0; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 0.05em;">
              ${data.urgency.toUpperCase()} Priority
            </p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
              Contact Details
            </h3>
            <div style="display: grid; grid-template-columns: 120px 1fr; gap: 8px;">
              <div style="color: #64748b; font-weight: 500;">Name:</div>
              <div style="color: #1e293b;">${data.name}</div>
              
              <div style="color: #64748b; font-weight: 500;">Address:</div>
              <div style="color: #1e293b;">${data.addressLine1}</div>
              
              <div style="color: #64748b; font-weight: 500;">Postcode:</div>
              <div style="color: #1e293b;">${data.postcode}</div>
              
              <div style="color: #64748b; font-weight: 500;">Phone:</div>
              <div style="color: #1e293b;">${data.phone}</div>
            </div>
          </div>

          ${data.notes ? `
            <div style="margin-bottom: 24px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 12px 0;">Additional Notes</h3>
              <p style="margin: 0; color: #1e293b;">${data.notes}</p>
            </div>
          ` : ''}
          
          ${data.vehicle ? generateVehicleSection(data.vehicle) : ''}
        </div>
      </body>
    </html>
  `;
  return template.trim();
};