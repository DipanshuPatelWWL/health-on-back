import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact-routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = [
    // "http://localhost:5173",
    "https://health-on-path-lab.vercel.app",
];

// CORS Setup
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn(`CORS blocked for origin: ${origin}`);
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST"],
        credentials: true,
    })
);

//Test Route
app.get("/", (req, res) => {
    res.json({ success: true, message: "Backend is running!" });
});

// Contact API
app.use("/api", contactRoutes);

// Global Error Handler (for debugging CORS or server issues)
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
