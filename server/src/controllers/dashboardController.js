import Product from "../models/productModel.js";
import Customer from "../models/customerModel.js";
import Supplier from "../models/supplierModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";

// Get Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const totalCustomers = await Customer.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const totalPurchases = await Purchase.countDocuments();

    const totalSales = await Sale.countDocuments();

    const lowStockProducts = await Product.countDocuments({
      stock: { $lte: 10 }
    });

    res.status(200).json({
      success: true,

      stats: {
        totalProducts,
        totalCustomers,
        totalSuppliers,
        totalPurchases,
        totalSales,
        lowStockProducts
      }

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get Recent Sales
export const getRecentSales = async (req, res) => {
  try {

    const recentSales = await Sale.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "fullName")
      .populate("createdBy", "fullName");

    res.status(200).json({
      success: true,
      recentSales,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Low Stock Products 
export const getLowStockProducts = async (req, res) => {
  try {

    const products = await Product.find({
      stock: { $lte: 10 }
    })
      .populate("category", "name")
      .populate("brand", "name")
      .sort({ stock: 1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Recent Purchases 
export const getRecentPurchases = async (req, res) => {
  try {

    const recentPurchases = await Purchase.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("supplier", "name companyName")
      .populate("createdBy", "fullName");

    res.status(200).json({
      success: true,
      recentPurchases,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Recent Customers
export const getRecentCustomers = async (req, res) => {
  try {

    const recentCustomers = await Customer.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      recentCustomers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getDashboardData = async (req, res) => {
  try {
    const stats = {
      totalProducts: await Product.countDocuments(),
      totalCustomers: await Customer.countDocuments(),
      totalSuppliers: await Supplier.countDocuments(),
      totalPurchases: await Purchase.countDocuments(),
      totalSales: await Sale.countDocuments(),
      lowStockProducts: await Product.countDocuments({
        $expr: {
          $lte: ["$stock", "$minStock"],
        },
      }),
    };

    const recentSales = await Sale.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "fullName")
      .populate("createdBy", "fullName");

    const recentPurchases = await Purchase.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("supplier", "name companyName")
      .populate("createdBy", "fullName");

    const recentCustomers = await Customer.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const lowStockProductsList = await Product.find({
      $expr: {
        $lte: ["$stock", "$minStock"],
      },
    })
      .populate("category", "name")
      .populate("brand", "name")
      .sort({ stock: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats,
      recentSales,
      recentPurchases,
      recentCustomers,
      lowStockProducts: lowStockProductsList,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
