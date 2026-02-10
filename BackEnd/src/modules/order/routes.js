import { Router } from "express";
import { createOrderController, getAllOrdersController } from "./controllers.js";

const router = Router();

// Create order submission
router.post("/submit", createOrderController);

// Get all orders (for admin panel)
router.get("/all", getAllOrdersController);

export default router;
