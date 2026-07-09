import express from "express";
import { createSale, getAllSales, getSaleById,deleteSale } from "../controllers/saleController.js";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "cashier"), createSale);
router.get("/", protect, getAllSales);
router.get("/:id", protect, getSaleById);
router.delete("/:id", protect, authorize("admin"), deleteSale);

export default router;