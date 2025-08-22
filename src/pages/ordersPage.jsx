import { useEffect, useState } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://backend-gnpawsentials.onrender.com/api/orders?page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setOrders(res.data.orders); // backend returns { orders, total, page, totalPages }
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching orders: ", error);

          if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
          alert("⚠️ Session expired. Please log in again.");
            }
      }
    };
    fetchOrders();
  }, [page]);

  return (
    <div className="w-full h-auto p-6">
      <table className="w-full border-collapse border border-gray-700 text-left">
        <thead className="bg-[#121212] text-white">
          <tr>
            <th className="p-3 border border-gray-700">ID</th>
            <th className="p-3 border border-gray-700">Customer</th>
            <th className="p-3 border border-gray-700">Payment Method</th>
            <th className="p-3 border border-gray-700">Items</th>
            <th className="p-3 border border-gray-700">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="odd:bg-[#1E1E1E] even:bg-[#2A2A2A] text-gray-200"
            >
              <td className="p-3 border border-gray-700">{order._id}</td>
              <td className="p-3 border border-gray-700">
                {order.customer?.name}
              </td>
              <td className="p-3 border border-gray-700">
                {order.paymentMethod}
              </td>
              <td className="p-3 border border-gray-700">
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <img
                        src={`https://backend-gnpawsentials.onrender.com${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border border-gray-700">{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-gray-200">
        <button
          className="px-4 py-2 bg-[#8884d8] border border-gray-600 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-black">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-[#8884d8] border border-gray-600 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
