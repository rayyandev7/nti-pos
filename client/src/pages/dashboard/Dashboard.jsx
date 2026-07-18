import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatCard from "../../components/dashboard/StatCard";
import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Welcome Back, {user?.fullName || "User"} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Products"
          value={dashboardData?.stats?.totalProducts || 0}
        />

        <StatCard
          title="Customers"
          value={dashboardData?.stats?.totalCustomers || 0}
        />

        <StatCard
          title="Suppliers"
          value={dashboardData?.stats?.totalSuppliers || 0}
        />

        <StatCard
          title="Sales"
          value={dashboardData?.stats?.totalSales || 0}
        />
      </div>
    </div>
  );
}

export default Dashboard;