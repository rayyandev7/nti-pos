import express from "express";
import { createSupplier,getAllSuppliers,getSupplierById, updateSupplier,deleteSupplier } from "../controllers/supplierController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createSupplier);
router.get("/", protect, getAllSuppliers);
router.get("/:id", protect, getSupplierById);
router.put("/:id", protect, authorize("admin"), updateSupplier);
router.delete("/:id", protect, authorize("admin"), deleteSupplier);

export default router;