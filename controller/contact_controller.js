import Resend from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Admin Email (Sent to LAB)
        const adminHtml = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

        // Auto-Reply Email (Sent to User)
        const userHtml = `
      <h2>Thank you, ${name}!</h2>
      <p>We have received your message and will get back to you shortly.</p>
      <p><strong>Your Message:</strong></p>
      <p>${message}</p>
    `;

        // Send admin email
        await resend.emails.send({
            from: process.env.LAB_EMAIL,
            to: process.env.LAB_EMAIL,
            subject: `New Contact Message from ${name}`,
            html: adminHtml,
        });

        // Send auto-reply to user
        await resend.emails.send({
            from: process.env.LAB_EMAIL,
            to: email,
            subject: "We’ve received your message!",
            html: userHtml,
        });

        return res.json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        console.error("Email error:", err);
        return res.status(500).json({ success: false, message: "Failed to send email" });
    }
};
