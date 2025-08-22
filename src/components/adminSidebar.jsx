import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaShoppingCart, 
  FaUsers, 
  FaChartLine,  
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import main_logo from "../assets/main_logo.png";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/dashboard/products", label: "Products", icon: <FaShoppingCart /> },
  { path: "/dashboard/orders", label: "Orders", icon: <FaShoppingCart /> },
  { path: "/dashboard/customers", label: "Customers", icon: <FaUsers /> },
  { path: "/dashboard/analytics", label: "Analytics", icon: <FaChartLine /> },
  { path: "/dashboard/settings", label: "Settings", icon: <FaCog /> },
];


const handleLogout = () =>{
  localStorage.removeItem("token");
  navigate("/", {replace: true});
}

  return (
    <div className="w-64 h-screen sticky top-0 bg-[#121212] border-r border-gray-800 flex flex-col p-5 text-white">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-center">
        <img src={main_logo} alt="logo" className="w-40" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto hide-scrollbar">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                  ${
                    location.pathname === item.path
                      ? "bg-gray-800 text-indigo-400"
                      : "hover:bg-gray-800 hover:text-indigo-400"
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout pinned at bottom */}
      <button 
      onClick={handleLogout}
      className="flex items-center gap-2 font-bold py-2 mt-auto px-3 rounded-lg hover:bg-gray-800 hover:text-red-400 transition-colors">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
