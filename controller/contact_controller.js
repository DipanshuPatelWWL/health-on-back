import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Send email to admin
        await resend.emails.send({
            from: process.env.FROM_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Message from ${name}`,
            html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        });

        // Send auto-reply to user
        await resend.emails.send({
            from: process.env.FROM_EMAIL,
            to: email,
            subject: "We’ve received your message!",
            html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting HealthOn Path Lab! We will get back to you shortly.</p>
        <p>Your message: ${message}</p>
      `,
        });

        return res.json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        console.error("Resend email error:", err);
        return res.status(500).json({ success: false, message: "Failed to send email" });
    }
};
