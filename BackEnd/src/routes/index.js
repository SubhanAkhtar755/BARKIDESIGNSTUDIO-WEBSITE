import { Router } from "express";
import contactRoutes from '../modules/contact/routes.js';
import orderRoutes from '../modules/order/routes.js';
import popupRoutes from '../modules/popup/routes.js';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/order', orderRoutes);
router.use('/popup', popupRoutes);

export default router;