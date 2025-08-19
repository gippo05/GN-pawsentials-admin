import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaBoxOpen, 
  FaTags, 
  FaShoppingCart, 
  FaUsers, 
  FaChartLine, 
  FaBell, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import main_logo from "../assets/main_logo.png";

const AdminSidebar = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className="w-64 min-h-screen bg-[#121212] border-r border-gray-200 flex flex-col p-5 text-white">
      {/* Logo */}
      <div className="mb-10 w-full">
        <img src={main_logo} alt="logo" className="w-60" />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="list-none p-0 m-0">
          <li className="mb-4 flex items-center gap-2">
            <FaTachometerAlt />
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          </li>

        <li className="mb-4 flex items-center gap-2">
            <FaShoppingCart />
            <Link to="/products" className="hover:text-blue-400">Products</Link>
          </li>

          <li className="mb-4 flex items-center gap-2">
            <FaShoppingCart />
            <Link to="/sales" className="hover:text-blue-400">Sales</Link>
          </li>

          <li className="mb-4 flex items-center gap-2">
            <FaUsers />
            <Link to="/customers" className="hover:text-blue-400">Customers</Link>
          </li>

          <li className="mb-4 flex items-center gap-2">
            <FaChartLine />
            <Link to="/analytics" className="hover:text-blue-400">Analytics</Link>
          </li>


          <li className="mb-4 flex items-center gap-2">
            <FaCog />
            <Link to="/settings" className="hover:text-blue-400">Settings</Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-2 font-bold py-2 px-0 hover:text-red-400">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
