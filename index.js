import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendContactEmail } from "./controller/contact_controller.js";

dotenv.config();
const app = express();

// JSON middleware
app.use(express.json());

// CORS setup: Only frontend allowed
const allowedOrigins = "https://heath-on-path-lab.vercel.app"
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

// Routes
app.post("/api/contact", sendContactEmail);
app.get("/", (req, res) => res.send("Backend is running!"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
