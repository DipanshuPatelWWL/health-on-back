import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();

// ---------------------
// 1️⃣ CORS Configuration
// ---------------------
app.use(cors({
    origin: "https://heath-on-path-lab.vercel.app", // Only allow your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// ---------------------
// 2️⃣ JSON Middleware
// ---------------------
app.use(express.json());

// ---------------------
// 4️⃣ Root Route (Health Check)
// ---------------------
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// ---------------------
// 5️⃣ Contact Endpoint
// ---------------------
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Admin Email Template
        const adminHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f6fdfd; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <div style="background-color: #0d9488; color: white; padding: 25px; text-align: center;">
                    <img src="https://heath-on-path-lab.vercel.app/assets/logo-C69_9xJN.png" alt="HealthOn Path Lab Logo" style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 10px;" />
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
                            <td style="font-weight: bold; padding: 8px; color: #0f766e;">Email:</td>
                            <td style="padding: 8px; color: #333;">${email}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 8px; color: #0f766e; vertical-align: top;">Message:</td>
                            <td style="padding: 8px; color: #333; white-space: pre-wrap;">${message}</td>
                        </tr>
                    </table>
                </div>
                <div style="background-color: #e6fffa; text-align: center; padding: 12px; font-size: 13px; color: #0f766e;">
                    © ${new Date().getFullYear()} HealthOn Path Lab — All rights reserved.
                </div>
            </div>
        </div>`;

        // User Auto-Reply Template
        const userHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f6fdfd; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <div style="background-color: #0d9488; color: white; padding: 25px; text-align: center;">
                    <img src="https://heath-on-path-lab.vercel.app/assets/logo-C69_9xJN.png" alt="HealthOn Path Lab Logo" style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 10px;" />
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
                        If your query is urgent, you can reach us directly at
                        <strong>+91 6386510400</strong> or <strong>healthonpathlab@gmail.com</strong>.
                    </p>
                    <p style="color: #0f766e; font-weight: bold;">— HealthOn Path Lab Team</p>
                </div>
                <div style="background-color: #e6fffa; text-align: center; padding: 12px; font-size: 13px; color: #0f766e;">
                    © ${new Date().getFullYear()} HealthOn Path Lab — All rights reserved.
                </div>
            </div>
        </div>`;

        // Send Admin Email
        await transporter.sendMail({
            from: `"HealthOn Path Lab" <${process.env.EMAIL_USER}>`,
            to: process.env.LAB_EMAIL || "dipanshupatel857@gmail.com",
            subject: `New Contact Message from ${name}`,
            html: adminHtml,
        });

        // Send Auto-Reply to User
        await transporter.sendMail({
            from: `"HealthOn Path Lab" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We’ve received your message!",
            html: userHtml,
        });

        res.json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

// ---------------------
// 6️⃣ Start Server
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
