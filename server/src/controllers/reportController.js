import Product from "../models/productModel.js";
import Sale from "../models/saleModel.js";
import Purchase from "../models/purchaseModel.js";
import Customer from "../models/customerModel.js";
import Supplier from "../models/supplierModel.js";
import mongoose from "mongoose";

export const getDashboardReport = async (req, res) => {
    try {
        const [
            totalProducts,
            totalCustomers,
            totalSuppliers,
            totalSales,
            totalPurchases,
            lowStockProducts,
        ] = await Promise.all([
            Product.countDocuments(),
            Customer.countDocuments(),
            Supplier.countDocuments(),
            Sale.find(),
            Purchase.find(),
            Product.find({
                $expr: {
                    $lte: ["$stock", "$minStock"],
                },
            })
                .select("name stock minStock")
                .limit(5),
        ]);

        const totalRevenue = totalSales.reduce(
            (sum, sale) => sum + sale.grandTotal,
            0
        );

        const totalPurchaseAmount = totalPurchases.reduce(
            (sum, purchase) => sum + purchase.grandTotal,
            0
        );

        const totalProfit = totalRevenue - totalPurchaseAmount;

        const recentSales = await Sale.find()
            .populate("customer", "fullName")
            .sort({ createdAt: -1 })
            .limit(5);

        const monthlySales = await Sale.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$saleDate" } },
                    totalSales: { $sum: "$grandTotal" },
                },
            },
            {
                $sort: { "_id.month": 1 },
            },
        ]);

        res.status(200).json({
            success: true,
            dashboard: {
                totalProducts,
                totalCustomers,
                totalSuppliers,
                totalSales: totalSales.length,
                totalPurchases: totalPurchases.length,
                totalRevenue,
                totalPurchaseAmount,
                totalProfit,
                lowStockCount: lowStockProducts.length,
                lowStockProducts,
                monthlySales,
                recentSales,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};