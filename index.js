import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { sendContactEmail } from "./controller/contact_controller.js";

dotenv.config();
const app = express();

// ---------------------
// JSON Middleware
// ---------------------
app.use(express.json());

// ---------------------
// CORS Setup: Only frontend allowed
// ---------------------
const allowedOrigins = [
    "https://heath-on-path-lab.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

// ---------------------
// Helmet Security Headers & CSP
// ---------------------
app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "blob:"],       // allow blob scripts
                "img-src": ["'self'", "data:", "https:"], // allow images from self & external
                "style-src": ["'self'", "'unsafe-inline'", "https:"], // allow inline styles
                "font-src": ["'self'", "https:", "data:"], // allow fonts
            },
        },
    })
);

// ---------------------
// API Routes
// ---------------------
app.post("/api/contact", sendContactEmail);

// Health check
app.get("/", (req, res) => res.send("Backend is running!"));

// ---------------------
// Start Server
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
