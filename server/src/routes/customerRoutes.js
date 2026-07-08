import express from "express";
import { createCustomer,getAllCustomers,getCustomerById,updateCustomer,deleteCustomer } from "../controllers/customerController.js";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createCustomer);
router.get("/", protect, getAllCustomers);
router.get("/:id", protect, getCustomerById);
router.put("/:id", protect, authorize("admin"), updateCustomer);
router.delete("/:id", protect, authorize("admin"), deleteCustomer);

export default router;