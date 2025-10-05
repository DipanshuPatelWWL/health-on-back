import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
        return res.status(400).json({ success: false, message: "All fields are required." });

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Admin Email
        const adminHtml = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

        // User Auto-reply
        const userHtml = `
      <h2>Thank you, ${name}!</h2>
      <p>We received your message:</p>
      <p>${message}</p>
      <p>— HealthOn Path Lab Team</p>
    `;

        // Send admin email
        await transporter.sendMail({
            from: `"HealthOn Path Lab" <${process.env.EMAIL_USER}>`,
            to: process.env.LAB_EMAIL,
            subject: `New Contact Message from ${name}`,
            html: adminHtml
        });

        // Send auto-reply
        await transporter.sendMail({
            from: `"HealthOn Path Lab" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We received your message!",
            html: userHtml
        });

        res.json({ success: true, message: "Message sent successfully!" });

    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
};
