import express from "express";
import { sendContactEmail } from "../controller/contact_controller.js";

const router = express.Router();

router.post("/contact", sendContactEmail);

export default router;
