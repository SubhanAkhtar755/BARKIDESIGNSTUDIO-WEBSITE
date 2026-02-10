import { Router } from "express";
import { createContactController, getAllContactsController } from "./controllers.js";

const router = Router();

// Create contact form submission
router.post("/submit", createContactController);

// Get all contacts (for admin panel)
router.get("/all", getAllContactsController);

export default router;
