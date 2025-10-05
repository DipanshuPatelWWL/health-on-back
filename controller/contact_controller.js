import nodemailer from "nodemailer";
import { getAdminTemplate, getUserTemplate } from "../templates/emailTemplates.js";

export const sendContactEmail = async (req, res) => {
    const { name, email, message, phone } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Gmail transporter with explicit timeout
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            pool: true,
            socketTimeout: 10000,
            greetingTimeout: 5000,
        });

        // Admin Email
        const adminMail = {
            from: `"${name}" <${email}>`,
            to: process.env.LAB_EMAIL || process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            html: getAdminTemplate(name, email, phone, message),
        };

        // User Confirmation Email
        const userMail = {
            from: `"HealthOn Path Lab" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Thank You for Contacting HealthOn Path Lab`,
            html: getUserTemplate(name, message),
        };

        // Send both in parallel with timeout guard
        const result = await Promise.race([
            Promise.all([
                transporter.sendMail(adminMail),
                transporter.sendMail(userMail),
            ]),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Mail send timeout (Render likely blocking SMTP)")), 15000)
            ),
        ]);
        res.status(200).json({ success: true, message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({
            success: false,
            message: "Email could not be sent.",
            error: error.message,
        });
    }
};
