import { EmailData } from "./types.ts";
import { checkToolCompatibility } from "../../../src/utils/lockTools.ts";

export const generateVehicleSection = (vehicle?: EmailData['vehicle']) => {
  if (!vehicle) return '';
  
  const toolCompatibility = checkToolCompatibility(vehicle.make, vehicle.year);
  
  return `
    <div style="margin-top: 24px; margin-bottom: 24px; background-color: #f9fafb; padding: 16px; border-radius: 8px;">
      <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Vehicle Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Make:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.make}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Year:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.year}</td>
        </tr>
        ${vehicle.registration ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Registration:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.registration}</td>
        </tr>
        ` : ''}
        ${vehicle.colour ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Colour:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.colour}</td>
        </tr>
        ` : ''}
      </table>
      <div style="margin-top: 16px;">
        <h4 style="color: #1a1f2c; font-size: 16px; margin-bottom: 8px;">Tool Compatibility</h4>
        <p><strong>Compatible Tools:</strong> ${toolCompatibility.compatibleTools.join(', ') || 'None found'}</p>
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
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 24px;">
          <div style="background-color: #f3f4f6; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="color: #1a1f2c; margin: 0; font-size: 24px;">New Contact Form Submission</h2>
            <p style="color: #4b5563; margin: 8px 0 0 0;">Urgency Level: <strong>${data.urgency.toUpperCase()}</strong></p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Name:</strong></td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Location:</strong></td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.location}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.phone}</td>
              </tr>
            </table>
          </div>

          ${data.notes ? `
            <div style="margin-bottom: 24px;">
              <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Additional Notes</h3>
              <p style="background-color: #f9fafb; padding: 12px; border-radius: 4px; margin: 0;">${data.notes}</p>
            </div>
          ` : ''}
          
          ${data.vehicle ? generateVehicleSection(data.vehicle) : ''}
        </div>
      </body>
    </html>
  `;
  return template.trim();
};