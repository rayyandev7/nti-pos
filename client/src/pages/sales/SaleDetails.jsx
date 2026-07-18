import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSaleById } from "../../services/saleService";

function SaleDetails() {
  const { id } = useParams();

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await getSaleById(id);
        setSale(response.sale);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (!sale) {
    return <p className="text-white">Sale not found.</p>;
  }

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Sale Details</h1>
        <p className="text-gray-400">
          Invoice: {sale.invoiceNumber}
        </p>
      </div>

      <div className="bg-[#2A2D31] rounded-xl p-6 grid grid-cols-2 gap-6">

        <div>
          <p className="text-gray-400">Customer</p>
          <h2 className="text-xl">
            {sale.customer?.fullName || "Walk-in Customer"}
          </h2>
        </div>

        <div>
          <p className="text-gray-400">Cashier</p>
          <h2 className="text-xl">
            {sale.createdBy?.fullName}
          </h2>
        </div>

        <div>
          <p className="text-gray-400">Sale Date</p>
          <h2>
            {new Date(sale.saleDate).toLocaleString()}
          </h2>
        </div>

        <div>
          <p className="text-gray-400">Grand Total</p>
          <h2 className="text-2xl text-green-400 font-bold">
            Rs. {sale.grandTotal.toFixed(2)}
          </h2>
        </div>

      </div>

      <div className="bg-[#2A2D31] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1E2022]">

            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Subtotal</th>
            </tr>

          </thead>

          <tbody>

            {sale.items.map((item) => (

              <tr
                key={item._id}
                className="border-t border-gray-700"
              >
                <td className="p-4">
                  {item.product?.name}
                </td>

                <td className="p-4">
                  {item.quantity}
                </td>

                <td className="p-4">
                  Rs. {item.sellingPrice}
                </td>

                <td className="p-4 text-green-400">
                  Rs. {item.subtotal}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SaleDetails;