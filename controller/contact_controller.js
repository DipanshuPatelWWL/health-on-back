import nodemailer from "nodemailer";
import { getAdminTemplate, getUserTemplate } from "../templates/emailTemplates.js";

export const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send admin mail
        await transporter.sendMail({
            from: `"HealthOn Path Lab" <${process.env.EMAIL_USER}>`,
            to: process.env.LAB_EMAIL || "dipanshupatel857@gmail.com",
            subject: `New Contact Message from ${name}`,
            html: getAdminTemplate(name, email, message),
        });

        // Send user auto-reply
        await transporter.sendMail({
            from: `"HealthOn Path Lab" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We’ve received your message!",
            html: getUserTemplate(name, message),
        });

        res.json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
};
