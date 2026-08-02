import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPurchases,
  deletePurchase,
} from "../../services/purchaseService";
import Loader from "../../components/common/Loader";
import { toast } from "react-toastify";

function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
  try {
    setLoading(true);

    const response = await getPurchases();
    setPurchases(response.purchases || []);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load purchase history.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this purchase?")) return;

    try {
  await deletePurchase(id);

  toast.success("Purchase deleted successfully.");

  fetchPurchases();
} catch (error) {
  console.error(error);

  toast.error(
    error.response?.data?.message ||
    "Failed to delete purchase."
  );
}
  };
if (loading) {
  return <Loader text="Loading purchase history..." />;
}
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

  {purchases.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        className="text-center py-10 text-gray-400"
      >
        No purchase history found.
      </td>
    </tr>
  ) : (
    purchases.map((purchase) => (

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
                  className="bg-red-600 px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))
)}

        </tbody>

      </table>

    </div>
  );
}
export default PurchaseHistory;