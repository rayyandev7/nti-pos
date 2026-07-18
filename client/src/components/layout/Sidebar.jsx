import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  Truck,
  Users,
  ShoppingCart,
  ReceiptText,
  History,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-60 bg-[#181A1B] text-white h-screen flex flex-col border-r border-[#2B2D31]">

      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <h1 className="text-2xl font-bold text-green-500">
          NTI POS
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Inventory & Sales
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">

        <SidebarItem to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />

        <SidebarItem to="/products" icon={<Package size={18} />} text="Products" />

        <SidebarItem to="/categories" icon={<FolderTree size={18} />} text="Categories" />

        <SidebarItem to="/brands" icon={<Tags size={18} />} text="Brands" />

        <SidebarItem to="/suppliers" icon={<Truck size={18} />} text="Suppliers" />

        <SidebarItem to="/customers" icon={<Users size={18} />} text="Customers" />

        <SidebarItem to="/purchases" icon={<ShoppingCart size={18} />} text="Purchases" />

        <SidebarItem to="/sales" icon={<ReceiptText size={18} />} text="Sales" />

        <SidebarItem to="/sale-history"icon={<History size={18} />}text="Sale History"/>

        <SidebarItem to="/reports" icon={<BarChart3 size={18} />} text="Reports" />

        <SidebarItem to="/settings" icon={<Settings size={18} />} text="Settings" />

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#2B2D31]">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-600 transition text-gray-300">
          <LogOut size={18} />
          <span className="text-[15px]">Logout</span>
        </button>
      </div>

    </aside>
  );
}

function SidebarItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
          ? "bg-green-600 text-white"
          : "text-gray-300 hover:bg-[#2B2D31]"
        }`
      }
    >
      {icon}
      <span className="text-[15px] font-medium">
        {text}
      </span>
    </NavLink>
  );
}

export default Sidebar;