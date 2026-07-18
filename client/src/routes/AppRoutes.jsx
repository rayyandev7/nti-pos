import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

import Products from "../pages/products/Products";
import Categories from "../pages/categories/Categories";
import Brands from "../pages/brands/Brands";
import Suppliers from "../pages/suppliers/Suppliers";
import Customers from "../pages/customers/Customers";
import Purchases from "../pages/purchases/Purchases";
import Sales from "../pages/sales/Sales";
import SaleHistory from "../pages/sales/SaleHistory";
import SaleDetails from "../pages/sales/SaleDetails";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sale-history" element={<SaleHistory />} />
          <Route path="/sale-details/:id" element={<SaleDetails />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;