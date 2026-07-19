import { useEffect, useState } from "react";
import { getDashboardReport } from "../../services/reportService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardReport();
      setDashboard(response.dashboard);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading Reports...
      </div>
    );
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = {
    labels: dashboard.monthlySales.map(
      (item) => monthNames[item._id.month - 1]
    ),
    datasets: [
      {
        label: "Monthly Sales",
        data: dashboard.monthlySales.map((item) => item.totalSales),
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Reports Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-3xl font-bold text-gray-900">{dashboard.totalProducts}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Customers</h2>
          <p className="text-3xl font-bold text-gray-900">{dashboard.totalCustomers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Suppliers</h2>
          <p className="text-3xl font-bold text-gray-900">{dashboard.totalSuppliers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Low Stock</h2>
          <p className="text-3xl font-bold text-red-600">
            {dashboard.lowStockCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Sales</h2>
          <p className="text-3xl font-bold text-gray-900">{dashboard.totalSales}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Purchases</h2>
          <p className="text-3xl font-bold text-gray-900">{dashboard.totalPurchases}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            Rs. {dashboard.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Profit</h2>
          <p className="text-3xl font-bold text-blue-600">
            Rs. {dashboard.totalProfit.toLocaleString()}
          </p>
        </div>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* Monthly Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Monthly Sales
          </h2>

          <div className="h-72">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Low Stock Products
          </h2>

          {dashboard.lowStockProducts.length === 0 ? (
            <p className="text-gray-500">
              No low stock products.
            </p>
          ) : (
            <div className="space-y-3">
              {dashboard.lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between border-b pb-2"
                >
                  <span className="text-gray-900 font-medium">
                    {product.name}
                  </span>

                  <span className="text-red-600 font-bold">
                    {product.stock}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <div className="mt-8 bg-white rounded-xl shadow p-6 text-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Sales
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-gray-900">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 font-semibold text-gray-700">
                  Invoice
                </th>

                <th className="text-left py-4 font-semibold text-gray-700">
                  Customer
                </th>

                <th className="text-left py-4 font-semibold text-gray-700">
                  Amount
                </th>

                <th className="text-left py-4 font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentSales.map((sale) => (
                <tr
                  key={sale._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 text-gray-900">
                    {sale.invoiceNumber}
                  </td>

                  <td className="py-4 text-gray-900">
                    {sale.customer?.fullName || "Walk-in Customer"}
                  </td>

                  <td className="py-4 font-semibold text-green-600">
                    Rs. {sale.grandTotal.toLocaleString()}
                  </td>

                  <td className="py-4 text-gray-700">
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;