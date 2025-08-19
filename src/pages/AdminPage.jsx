import AdminSidebar from "../components/adminSidebar";
import AdminTopBar from "../components/adminTopbar";
import { Route } from "react-router-dom";
const AdminPage = ({ children }) => {
  return (
    <>
    
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <AdminTopBar />

        {/* Page content */}
        <main className="flex-1 flex items-center justify-center bg-white">
          {children || <h1 className="text-3xl font-bold">Dashboard</h1>}
        </main>
      </div>
    </div>
    </>
    
  );
};

export default AdminPage;
