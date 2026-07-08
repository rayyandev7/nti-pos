import Purchase from "../models/purchaseModel.js";
import Product from "../models/productModel.js";

// Create Purchase
export const createPurchase = async (req, res) => {
  try {
    const {
      supplier,
      invoiceNumber,
      purchaseDate,
      items,
      grandTotal,
    } = req.body;

    // Increase stock for each purchased product
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      product.stock += item.quantity;
      await product.save();
    }

    // Save Purchase
    const purchase = await Purchase.create({
      supplier,
      invoiceNumber,
      purchaseDate,
      items,
      grandTotal,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Purchase created successfully.",
      purchase,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Purchases
export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("supplier", "name companyName")
      .populate("createdBy", "fullName email")
      .populate("items.product", "name sku");

    res.status(200).json({
      success: true,
      count: purchases.length,
      purchases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Purchase By ID
export const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const purchase = await Purchase.findById(id)
      .populate("supplier", "name companyName")
      .populate("createdBy", "fullName email")
      .populate("items.product", "name sku");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found.",
      });
    }

    res.status(200).json({
      success: true,
      purchase,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Purchase
export const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;

    const purchase = await Purchase.findById(id);

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found.",
      });
    }

    // Rollback Stock
    for (const item of purchase.items) {
      const product = await Product.findById(item.product);

      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    // Delete Purchase
    await Purchase.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Purchase deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};