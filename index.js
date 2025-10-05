import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendContactEmail } from "./controller/contact_controller.js";

dotenv.config();
const app = express();
app.use(express.json());

//  Allowed origins
const allowedOrigins = [
    // "http://localhost:5173",
    "https://heath-on-path-lab.vercel.app"
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) callback(null, true);
            else callback(null, false);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

// ✅ Routes
app.post("/api/contact", sendContactEmail);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
