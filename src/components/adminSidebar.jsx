import { Link } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaShoppingCart, 
  FaUsers, 
  FaChartLine,  
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import main_logo from "../assets/main_logo.png";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen sticky top-0 bg-[#121212] border-r border-gray-800 flex flex-col p-5 text-white">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-center">
        <img src={main_logo} alt="logo" className="w-40" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="list-none p-0 m-0 space-y-4">
          <li className="flex items-center gap-3">
            <FaTachometerAlt />
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          </li>

          <li className="flex items-center gap-3">
            <FaShoppingCart />
            <Link to="/products" className="hover:text-blue-400">Products</Link>
          </li>

          <li className="flex items-center gap-3">
            <FaShoppingCart />
            <Link to="/orders" className="hover:text-blue-400">Orders</Link>
          </li>

          <li className="flex items-center gap-3">
            <FaUsers />
            <Link to="/customers" className="hover:text-blue-400">Customers</Link>
          </li>

          <li className="flex items-center gap-3">
            <FaChartLine />
            <Link to="/analytics" className="hover:text-blue-400">Analytics</Link>
          </li>

          <li className="flex items-center gap-3">
            <FaCog />
            <Link to="/settings" className="hover:text-blue-400">Settings</Link>
          </li>
        </ul>
      </nav>

      {/* Logout pinned at bottom */}
      <button className="flex items-center gap-2 font-bold py-2 mt-auto hover:text-red-400">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
