export const getAdminTemplate = (name, email, phone, message) => `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f6fdfd; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    <div style="background-color: #0d9488; color: white; padding: 25px; text-align: center;">
      <img src="https://health-on-path-lab.vercel.app/assets/logo-C69_9xJN.png" alt="HealthOn Path Lab Logo"
        style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 10px;" />
      <h1 style="margin: 0; font-size: 28px;">HealthOn Path Lab</h1>
      <p style="margin: 4px 0; font-size: 14px; color: #b2f5ea;">Trusted Diagnostic Centre</p>
    </div>

    <div style="padding: 25px;">
      <h2 style="color: #0f766e;">New Contact Message</h2>
      <p style="font-size: 15px; color: #444;">You’ve received a new message from your website:</p>
      <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; padding: 8px; color: #0f766e;">Name:</td>
          <td style="padding: 8px; color: #333;">${name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="font-weight: bold; padding: 8px; color: #0f766e;">Phone:</td>
          <td style="padding: 8px; color: #333;">${phone}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="font-weight: bold; padding: 8px; color: #0f766e;">Email:</td>
          <td style="padding: 8px; color: #333;">${email}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px; color: #0f766e;">Message:</td>
          <td style="padding: 8px; color: #333; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;" />
      <div style="font-size: 13px; color: #555; text-align: center;">
        <p><strong>HealthOn Path Lab</strong></p>
        <p>Raitha Rd, near AMOLI LAWN, near Hanuman Mandir, BKT, Lucknow, Uttar Pradesh 226013</p>
        <p>+91 6386510400 | healthonpathlab@gmail.com</p>
        <p><strong>Owner:</strong> Dr. Dipanshu Patel</p>
      </div>
    </div>
    <div style="background-color: #e6fffa; text-align: center; padding: 12px; font-size: 13px; color: #0f766e;">
      © ${new Date().getFullYear()} HealthOn Path Lab — All rights reserved.
    </div>
  </div>
</div>
`;

export const getUserTemplate = (name, message) => `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f6fdfd; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    <div style="background-color: #0d9488; color: white; padding: 25px; text-align: center;">
      <img src="https://health-on-path-lab.vercel.app/assets/logo-C69_9xJN.png" alt="HealthOn Path Lab Logo"
        style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 10px;" />
      <h1 style="margin: 0; font-size: 28px;">HealthOn Path Lab</h1>
      <p style="margin: 4px 0; font-size: 14px; color: #b2f5ea;">Trusted Diagnostic Centre</p>
    </div>

    <div style="padding: 25px;">
      <h2 style="color: #0f766e;">Thank You, ${name}!</h2>
      <p style="font-size: 15px; color: #444;">
        We have received your message and our team will get back to you shortly.
        Here’s a copy of your inquiry for your reference:
      </p>
      <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; padding: 8px; color: #0f766e;">Your Message:</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #333; white-space: pre-wrap; background: #f9f9f9;">${message}</td>
        </tr>
      </table>
      <p style="margin-top: 25px; color: #555;">
        If your query is urgent, reach us at <strong>+91 6386510400</strong> or
        <strong>healthonpathlab@gmail.com</strong>.
      </p>
      <p style="color: #0f766e; font-weight: bold;">— HealthOn Path Lab Team</p>
    </div>
    <div style="background-color: #e6fffa; text-align: center; padding: 12px; font-size: 13px; color: #0f766e;">
      © ${new Date().getFullYear()} HealthOn Path Lab — All rights reserved.
    </div>
  </div>
</div>
`;
