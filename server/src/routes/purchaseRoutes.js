import express from "express";
import { createPurchase,getAllPurchases,getPurchaseById,deletePurchase } from "../controllers/purchaseController.js";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createPurchase);
router.get("/", protect, getAllPurchases);
router.get("/:id", protect, getPurchaseById);
router.delete("/:id", protect, authorize("admin"), deletePurchase);

export default router;