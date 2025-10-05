import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Create transporter (Gmail)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`,           // Sender: form user
            to: process.env.LAB_EMAIL,              // Receiver: your lab email
            subject: `New Contact Form Submission from ${name}`,
            text: message,
            html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: "Email could not be sent." });
    }
};
