import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { getProductsForSale, createSale } from "../../services/saleService.js";
import { getCustomers } from "../../services/customerService.js";

function Sales() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsForSale();
        setProducts(response.products || []);
        const customerResponse = await getCustomers();
        setCustomers(customerResponse.customers || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        (product.barcode || "").includes(search)
    );
  }, [products, search]);

  const grandTotal = cart.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0
  );

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      return alert("Cart is empty.");
    }

    try {
      const saleData = {
        customer: selectedCustomer || null,
        invoiceNumber: `INV-${Date.now()}`,
        saleDate: new Date(),
        grandTotal,
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
          subtotal: item.sellingPrice * item.quantity,
        })),
      };

      const response = await createSale(saleData);

      alert(response.message);

      setCart([]);

      const productsResponse = await getProductsForSale();
      setProducts(productsResponse.products || []);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to complete sale."
      );
    }
  };

  return (
    <div className="h-full flex flex-col gap-5">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Sales
          </h1>

          <p className="text-gray-400">
            Point of Sale
          </p>

        </div>

      </div>

      <div className="grid grid-cols-12 gap-5 flex-1 min-h-0">

        {/* PRODUCTS */}

        <div className="col-span-8 bg-[#2A2D31] rounded-xl flex flex-col overflow-hidden">

          <div className="p-5 border-b border-gray-700">

            <div className="flex justify-between items-center gap-4">

              <h2 className="text-xl font-semibold">
                Products
              </h2>

              <div className="flex items-center gap-3">

                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="bg-[#1E2022] border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-green-500"
                >
                  <option value="">Walk-in Customer</option>

                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.fullName}
                    </option>
                  ))}
                </select>

                <div className="relative w-72">

                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#1E2022] pl-10 pr-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-green-500"
                  />

                </div>

              </div>

            </div>

            <div className="flex-1 overflow-y-auto p-4">

              {loading ? (

                <p className="text-gray-400">
                  Loading products...
                </p>

              ) : (

                <div className="grid grid-cols-3 gap-3">

                  {filteredProducts.map((product) => (

                    <div
                      key={product._id}
                      onClick={() => addToCart(product)}
                      className="bg-[#1E2022] border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-green-500 hover:bg-[#25282C] transition"
                    >

                      <h3 className="font-semibold text-white truncate">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        SKU: {product.sku}
                      </p>

                      <div className="flex justify-between items-center mt-3">

                        <span className="text-green-400 font-bold">
                          Rs. {product.sellingPrice}
                        </span>

                        <span className="text-xs text-gray-400">
                          Stock {product.stock}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>



        {/* CART */}

        <div className="col-span-4 bg-[#2A2D31] rounded-xl flex flex-col overflow-hidden">

          <div className="p-5 border-b border-gray-700 flex items-center gap-3">

            <ShoppingCart size={22} />

            <h2 className="text-xl font-semibold">
              Cart
            </h2>

          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {cart.length === 0 ? (

              <div className="text-center text-gray-400 mt-20">
                No products added.
              </div>

            ) : (

              cart.map((item) => (

                <div
                  key={item._id}
                  className="bg-[#1E2022] rounded-lg p-3 border border-gray-700"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-400">
                        Rs. {item.sellingPrice}
                      </p>

                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      ✕
                    </button>

                  </div>

                  <div className="flex justify-between items-center mt-4">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-8 h-8 rounded bg-red-600 hover:bg-red-700"
                      >
                        -
                      </button>

                      <span className="w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-8 h-8 rounded bg-green-600 hover:bg-green-700"
                      >
                        +
                      </button>

                    </div>

                    <div className="font-bold text-green-400">

                      Rs. {(item.sellingPrice * item.quantity).toFixed(2)}

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

          <div className="border-t border-gray-700 p-5 bg-[#25282C]">

            <div className="flex justify-between text-lg font-bold mb-5">

              <span>Total</span>

              <span className="text-green-400">
                Rs. {grandTotal.toFixed(2)}
              </span>

            </div>

            <button
              onClick={handleCompleteSale}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
            >
              Complete Sale
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Sales;