import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSales } from "../../services/saleService";

function SaleHistory() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await getAllSales();
                setSales(response.sales || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Sale History</h1>
            <p className="text-gray-400 mb-6">All completed sales</p>

            <div className="bg-[#2A2D31] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#1E2022]">
                        <tr>
                            <th className="text-left p-4">Invoice</th>
                            <th className="text-left p-4">Customer</th>
                            <th className="text-left p-4">Cashier</th>
                            <th className="text-left p-4">Total</th>
                            <th className="text-left p-4">Date</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : sales.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center">
                                    No sales found.
                                </td>
                            </tr>
                        ) : (
                            sales.map((sale) => (
                                <tr
                                    key={sale._id}
                                    className="border-t border-gray-700 hover:bg-[#1E2022]"
                                >
                                    <td className="p-4">{sale.invoiceNumber}</td>
                                    <td className="p-4">
                                        {sale.customer?.fullName || "Walk-in Customer"}
                                    </td>
                                    <td className="p-4">{sale.createdBy?.fullName}</td>
                                    <td className="p-4 text-green-400">
                                        Rs. {sale.grandTotal.toFixed(2)}
                                    </td>
                                    <td className="p-4">
                                        {new Date(sale.saleDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            to={`/sale-details/${sale._id}`}
                                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SaleHistory;