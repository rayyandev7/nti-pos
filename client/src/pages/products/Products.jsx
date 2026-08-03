import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { getProducts, deleteProduct, } from "../../services/productService";
import ProductModal from "../../components/products/ProductModal";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const productsPerPage = 10;

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully.");

      fetchProducts();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete product.");
    }
  };

  // Search Filter
  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(keyword) ||
      product.sku.toLowerCase().includes(keyword) ||
      product.category?.name.toLowerCase().includes(keyword) ||
      product.brand?.name.toLowerCase().includes(keyword)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    if (sortField === "category") {
      valueA = a.category?.name || "";
      valueB = b.category?.name || "";
    }

    if (sortField === "brand") {
      valueA = a.brand?.name || "";
      valueB = b.brand?.name || "";
    }

    if (typeof valueA === "string") valueA = valueA.toLowerCase();
    if (typeof valueB === "string") valueB = valueB.toLowerCase();

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;

    return 0;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Products
          </h1>

          <p className="text-gray-400 mt-1">
            Manage all products in your inventory.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 bg-[#2B2D31] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-green-500"
        />
      </div>

      {/* Table */}
      <div className="bg-[#2B2D31] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1E2022]">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="text-left px-6 py-4 cursor-pointer select-none"
              >
                Product{" "}
                {sortField === "name" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("sku")}
                className="text-left px-6 py-4 cursor-pointer select-none"
              >
                SKU{" "}
                {sortField === "sku" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("category")}
                className="text-left px-6 py-4 cursor-pointer select-none"
              >
                Category{" "}
                {sortField === "category" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("brand")}
                className="text-left px-6 py-4 cursor-pointer select-none"
              >
                Brand{" "}
                {sortField === "brand" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("purchasePrice")}
                className="text-left px-6 py-4 cursor-pointer select-none"
              >
                Purchase{" "}
                {sortField === "purchasePrice" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("sellingPrice")}
                className="text-left px-6 py-4 cursor-pointer select-none"
              >
                Selling{" "}
                {sortField === "sellingPrice" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("stock")}
                className="text-left px-6 py-4 cursor-pointer select-none"
              >
                Stock{" "}
                {sortField === "stock" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="text-center px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">
                  <Loader text="Loading products..." />
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-700 hover:bg-[#34373C]"
                >
                  <td className="px-6 py-4">{product.name}</td>

                  <td className="px-6 py-4">{product.sku}</td>

                  <td className="px-6 py-4">
                    {product.category?.name}
                  </td>

                  <td className="px-6 py-4">
                    {product.brand?.name}
                  </td>

                  <td className="px-6 py-4">
                    Rs. {product.purchasePrice}
                  </td>

                  <td className="px-6 py-4">
                    Rs. {product.sellingPrice}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${product.stock <= product.minStock
                        ? "bg-red-600"
                        : "bg-green-600"
                        }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        refreshProducts={fetchProducts}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}

export default Products;