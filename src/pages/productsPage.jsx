import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config/config";

const ProductsPage = ({ onSearchChange, searchedValue }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/api/dashboard/products/admin?page=${page}&limit=${limit}&search=${searchedValue}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
          alert("⚠️ Session expired. Please log in again.");
        }
      }
    };

    fetchProducts();
  }, [page]);

  // Filter products using searchedValue
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchedValue)
  );

  return (
    <div className="w-full h-auto p-6">
      {/* 🔍 Search bar above the table */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchedValue}
          onChange={onSearchChange}
          className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8884d8]"
        />
      </div>

      {/* Products Table */}
      <table className="w-full border-collapse border border-gray-700 text-left">
        <thead className="bg-[#121212] text-white">
          <tr>
            <th className="p-3 border border-gray-700">ID</th>
            <th className="p-3 border border-gray-700">Product Name</th>
            <th className="p-3 border border-gray-700">Price</th>
            <th className="p-3 border border-gray-700">Product Image</th>
            <th className="p-3 border border-gray-700">Product Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-[#1E1E1E] even:bg-[#2A2A2A] text-gray-200"
              >
                <td className="p-3 border border-gray-700">{product._id}</td>
                <td className="p-3 border border-gray-700">{product.name}</td>
                <td className="p-3 border border-gray-700">{product.price}</td>
                <td className="p-3 border border-gray-700">
                  <img
                    src={`https://backend-gnpawsentials.onrender.com${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 border border-gray-700">
                  {product.reviews}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="p-4 text-center text-gray-400 border border-gray-700"
              >
                No products found
              </td>
            </tr>
          )}
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
        <span className="text-gray-300">
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

export default ProductsPage;
