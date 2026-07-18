import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { getBrands } from "../../services/brandService";

function ProductModal({
    isOpen,
    onClose,
    refreshProducts,
    selectedProduct,
}) {
    if (!isOpen) return null;

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        barcode: "",
        category: "",
        brand: "",
        purchasePrice: "",
        sellingPrice: "",
        stock: "",
        minStock: "",
    });

    useEffect(() => {
        if (!isOpen) return;

        const fetchDropdownData = async () => {
            try {
                const categoryResponse = await getCategories();
                const brandResponse = await getBrands();

                setCategories(categoryResponse.categories);
                setBrands(brandResponse.brands);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDropdownData();
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (selectedProduct) {
                await updateProduct(selectedProduct._id, formData);
            } else {
                await createProduct(formData);
            }

            alert(
                selectedProduct
                    ? "Product updated successfully."
                    : "Product created successfully."
            );

            refreshProducts();

            setFormData({
                name: "",
                sku: "",
                barcode: "",
                category: "",
                brand: "",
                purchasePrice: "",
                sellingPrice: "",
                stock: "",
                minStock: "",
            });

            onClose();

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message || "Failed to create product."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name || "",
                sku: selectedProduct.sku || "",
                barcode: selectedProduct.barcode || "",
                category: selectedProduct.category?._id || "",
                brand: selectedProduct.brand?._id || "",
                purchasePrice: selectedProduct.purchasePrice || "",
                sellingPrice: selectedProduct.sellingPrice || "",
                stock: selectedProduct.stock || "",
                minStock: selectedProduct.minStock || "",
            });
        } else {
            setFormData({
                name: "",
                sku: "",
                barcode: "",
                category: "",
                brand: "",
                purchasePrice: "",
                sellingPrice: "",
                stock: "",
                minStock: "",
            });
        }
    }, [selectedProduct]);

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#2B2D31] rounded-xl w-full max-w-4xl p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-bold text-white">
                        {selectedProduct ? "Edit Product" : "Add Product"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-3xl"
                    >
                        ×
                    </button>

                </div>

                {/* Form */}

                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-2 gap-5">

                        <Input
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <Input
                            label="SKU"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                        />

                        <Input
                            label="Barcode"
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleChange}
                        />

                        <Input
                            label="Purchase Price"
                            name="purchasePrice"
                            type="number"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                        />

                        <Input
                            label="Selling Price"
                            name="sellingPrice"
                            type="number"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                        />

                        <Input
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                        />

                        <Input
                            label="Minimum Stock"
                            name="minStock"
                            type="number"
                            value={formData.minStock}
                            onChange={handleChange}
                        />

                        <div>

                            <label className="block text-gray-300 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[#1E2022] border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                            >
                                <option value="">Select Category</option>

                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div>

                            <label className="block text-gray-300 mb-2">
                                Brand
                            </label>

                            <select
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full bg-[#1E2022] border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                            >
                                <option value="">Select Brand</option>

                                {brands.map((brand) => (
                                    <option
                                        key={brand._id}
                                        value={brand._id}
                                    >
                                        {brand.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                    <div className="flex justify-end gap-3 mt-8">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg bg-gray-600 hover:bg-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-500"
                        >
                            {loading
                                ? "Saving..."
                                : selectedProduct
                                    ? "Update Product"
                                    : "Save Product"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
}) {
    return (
        <div>

            <label className="block text-gray-300 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-[#1E2022] border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
            />

        </div>
    );
}

function Select({ label }) {
    return (
        <div>

            <label className="block text-gray-300 mb-2">
                {label}
            </label>

            <select
                className="w-full bg-[#1E2022] border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
            >
                <option>Select {label}</option>
            </select>

        </div>
    );
}

export default ProductModal;