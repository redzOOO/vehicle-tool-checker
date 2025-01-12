import { EmailData } from "./types.ts";
import { checkToolCompatibility } from "../../../src/utils/lockTools.ts";

export const generateVehicleSection = (vehicle?: EmailData['vehicle']) => {
  if (!vehicle) return '';
  
  const toolCompatibility = checkToolCompatibility(vehicle.make, vehicle.year);
  
  return `
    <div style="margin-top: 24px; margin-bottom: 24px;">
      <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Vehicle Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Registration:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.registration || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Make:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.make}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Year:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.year}</td>
        </tr>
        ${vehicle.colour ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Colour:</strong></td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${vehicle.colour}</td>
        </tr>
        ` : ''}
      </table>
    </div>
    <div style="margin-bottom: 24px;">
      <h3 style="color: #1a1f2c; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Tool Compatibility</h3>
      <p><strong>Compatible Tools:</strong> ${toolCompatibility.compatibleTools.join(', ') || 'None'}</p>
    </div>
  `;
};

export const generateEmailTemplate = (data: EmailData) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #f3f4f6; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #1a1f2c; margin: 0; font-size: 24px;">New Contact Form Submission</h2>
            <p style="color: #4b5563; margin: 8px 0 0 0;">A new contact form has been submitted with the following details:</p>
          </div>
          
          <div style="padding: 24px;">
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
                <tr>
                  <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Urgency:</strong></td>
                  <td style="padding: 8px; border: 1px solid #e5e7eb; ${data.urgency === 'urgent' ? 'color: #dc2626; font-weight: bold;' : ''}">${data.urgency.toUpperCase()}</td>
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
        </div>
      </body>
    </html>
  `.trim();
};