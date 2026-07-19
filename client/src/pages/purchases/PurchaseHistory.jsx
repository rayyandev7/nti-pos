import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPurchases,
  deletePurchase,
} from "../../services/purchaseService";

function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    try {
      const response = await getPurchases();
      setPurchases(response.purchases || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this purchase?")) return;

    try {
      await deletePurchase(id);
      fetchPurchases();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Purchase History
      </h1>

      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">

        <thead>

          <tr className="border-b border-gray-700">

            <th className="p-4 text-left">Invoice</th>
            <th className="p-4 text-left">Supplier</th>
            <th className="p-4 text-left">Created By</th>
            <th className="p-4 text-center">Total</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {purchases.map((purchase) => (

            <tr
              key={purchase._id}
              className="border-b border-gray-700"
            >

              <td className="p-4">
                {purchase.invoiceNumber}
              </td>

              <td className="p-4">
                {purchase.supplier?.name}
              </td>

              <td className="p-4">
                {purchase.createdBy?.fullName}
              </td>

              <td className="p-4 text-center">
                Rs. {purchase.grandTotal}
              </td>

              <td className="p-4 text-center">
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </td>

              <td className="p-4 text-center space-x-2">

                <Link
                  to={`/purchase-details/${purchase._id}`}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(purchase._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PurchaseHistory;