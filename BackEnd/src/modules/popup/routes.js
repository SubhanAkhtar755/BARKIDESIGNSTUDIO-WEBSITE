import { Router } from "express";
import { createPopupController, getAllPopupsController } from "./controllers.js";

const router = Router();

// Create popup submission
router.post("/submit", createPopupController);

// Get all popups (for admin panel)
router.get("/all", getAllPopupsController);

export default router;
