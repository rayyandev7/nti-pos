import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<h1>Home</h1>} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<h1>Dashboard</h1>} />

        <Route path="/products" element={<h1>Products</h1>} />

        <Route path="/categories" element={<h1>Categories</h1>} />

        <Route path="/brands" element={<h1>Brands</h1>} />

        <Route path="/suppliers" element={<h1>Suppliers</h1>} />

        <Route path="/customers" element={<h1>Customers</h1>} />

        <Route path="/purchases" element={<h1>Purchases</h1>} />

        <Route path="/sales" element={<h1>Sales</h1>} />

        <Route path="/reports" element={<h1>Reports</h1>} />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;