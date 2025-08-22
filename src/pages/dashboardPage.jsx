import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const ordersRes = await axios.get("https://backend-gnpawsentials.onrender.com/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` } });
        setTotalOrders(ordersRes.data.totalOrders);

        const salesRes = await axios.get("https://backend-gnpawsentials.onrender.com/api/dashboard/total-sales/totalsales", {
        headers: { Authorization: `Bearer ${token}` } }
        );
        setTotalSales(salesRes.data.totalSales);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
         if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
          alert("⚠️ Session expired. Please log in again.");
            }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Orders Card */}
      <Card className="bg-[#1E1E1E] text-white">
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </CardContent>
      </Card>

      {/* Total Sales Card */}
      <Card className="bg-[#1A1A1A] text-white">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">₱{totalSales}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
