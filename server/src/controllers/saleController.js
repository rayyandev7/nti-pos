import Sale from "../models/saleModel.js";
import Product from "../models/productModel.js";
import Customer from "../models/customerModel.js";

// Create Sale
export const createSale = async (req, res) => {
    try {
        const {
            customer,
            invoiceNumber,
            saleDate,
            items,
            grandTotal,
        } = req.body;

        // Check stock and reduce it
        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found.",
                });
            }

            // Check available stock
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}.`,
                });
            }

            // Reduce stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Update customer statistics
        const customerData = await Customer.findById(customer);

        if (!customerData) {
            return res.status(404).json({
                success: false,
                message: "Customer not found.",
            });
        }

        customerData.totalPurchases += 1;
        customerData.totalSpent += grandTotal;

        await customerData.save();

        // Save sale
        const sale = await Sale.create({
            customer,
            invoiceNumber,
            saleDate,
            items,
            grandTotal,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Sale created successfully.",
            sale,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Sales
export const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate("customer", "fullName phone")
            .populate("createdBy", "fullName email")
            .populate("items.product", "name sku");

        res.status(200).json({
            success: true,
            count: sales.length,
            sales,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Sale By ID
export const getSaleById = async (req, res) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findById(id)
            .populate("customer", "fullName phone")
            .populate("createdBy", "fullName email")
            .populate("items.product", "name sku");

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: "Sale not found.",
            });
        }

        res.status(200).json({
            success: true,
            sale,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Sale
export const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findById(id);

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: "Sale not found.",
            });
        }

        // Restore Product Stock
        for (const item of sale.items) {
            const product = await Product.findById(item.product);

            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

// Update Customer Statistics
const customer = await Customer.findById(sale.customer);

        if (customer) {
            customer.totalPurchases -= 1;
            customer.totalSpent -= sale.grandTotal;

            await customer.save();
        }

        // Delete Sale
        await Sale.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Sale deleted successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};