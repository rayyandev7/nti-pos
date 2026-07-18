import { Bell, Search, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-14 bg-[#2B2D31] border-b border-gray-700 flex items-center justify-between px-5">

      {/* Left Side */}
      <div className="relative w-80">

        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full h-10 bg-[#1E2022] text-white rounded-lg pl-10 pr-4 border border-gray-600 outline-none focus:border-green-500"
        />

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <button className="text-gray-300 hover:text-white transition">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">

          <UserCircle
            size={34}
            className="text-green-500"
          />

          <div className="leading-tight">
            <p className="text-white font-semibold text-sm">
              {user?.fullName || "Guest"}
            </p>

            <p className="text-xs text-gray-400 capitalize">
              {user?.role || ""}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;