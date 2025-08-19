import { useLocation } from "react-router-dom";
import { SidebarMenu } from "../data/sidebarmenu";

const AdminTopBar = () => {
  const location = useLocation();

  // Find the menu item that matches the current path
  const currentItem = SidebarMenu.find((item) => item.link === location.pathname);

  return (
    <div className="w-full h-16 bg-black flex items-center px-6 shadow-md">
      <h1 className="text-white text-xl font-semibold">
        {currentItem ? currentItem.title : "Dashboard"}
      </h1>
    </div>
  );
};

export default AdminTopBar;
