import express from "express";
import { getDashboardStats, getRecentSales,getLowStockProducts,getRecentPurchases,getRecentCustomers,getDashboardData } from "../controllers/dashboardController.js";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getDashboardStats);
router.get("/recent-sales", protect, authorize("admin"), getRecentSales);
router.get("/low-stock",protect,authorize("admin"),getLowStockProducts);
router.get("/recent-purchases",protect,authorize("admin"),getRecentPurchases);
router.get("/recent-customers",protect,authorize("admin"),getRecentCustomers);
router.get("/", protect, getDashboardData);

export default router;
