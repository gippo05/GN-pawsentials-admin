import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../components/adminSidebar";
import AdminTopBar from "../components/adminTopbar";
import OrdersPage from "./ordersPage";
import DashboardPage from "./dashboardPage";
import ProductsPage from "./productsPage";
import EditProductPage from "./EditProductPage";

const AdminPage = ({onSearchChange, searchedValue}) => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopBar />

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage onSearchChange={onSearchChange} 
                                                          searchedValue={searchedValue}/>} />
            <Route path="products/new" element={<EditProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />}/>
                  
            <Route path="orders" element={<OrdersPage onSearchChange={onSearchChange}
                                                      searchedValue={searchedValue}/>} />
            <Route path="customers" element={<h2>Customer Service Content</h2>} />
            <Route path="analytics" element={<h2>Analytics Content</h2>} />
            <Route path="settings" element={<h2>Settings Content</h2>} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
