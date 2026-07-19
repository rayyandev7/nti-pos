import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPurchaseById } from "../../services/purchaseService";

function PurchaseDetails() {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await getPurchaseById(id);
        setPurchase(response.purchase);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPurchase();
  }, [id]);

  if (!purchase) {
    return (
      <div className="p-6 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Purchase Details
      </h1>

      <div className="bg-[#2A2D31] rounded-lg p-6 space-y-3">

        <p>
          <strong>Invoice:</strong> {purchase.invoiceNumber}
        </p>

        <p>
          <strong>Supplier:</strong> {purchase.supplier?.name}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(purchase.purchaseDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Grand Total:</strong> Rs. {purchase.grandTotal}
        </p>

      </div>

      <div className="mt-6 bg-[#2A2D31] rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1E2022]">

            <tr>

              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Subtotal</th>

            </tr>

          </thead>

          <tbody>

            {purchase.items.map((item) => (

              <tr
                key={item._id}
                className="border-t border-gray-700"
              >

                <td className="p-3">
                  {item.product?.name}
                </td>

                <td className="p-3 text-center">
                  {item.quantity}
                </td>

                <td className="p-3 text-center">
                  Rs. {item.purchasePrice}
                </td>

                <td className="p-3 text-center">
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

export default PurchaseDetails;