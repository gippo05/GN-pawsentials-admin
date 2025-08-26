import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "@/utils/api";
import { BASE_URL } from "@/utils/api";

const ProductsPage = ({ onSearchChange, searchedValue }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API.PRODUCTS}/admin?page=${page}&limit=${limit}&search=${searchedValue}`,
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
  }, [page, searchedValue]);

  // Filter products using searchedValue
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchedValue)
  );

  const handleEdit = (id) =>{
    navigate(`/dashboard/products/edit/${id}`);
  }

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API.PRODUCTS}/admin/deleteProduct/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Optionally, remove the deleted product from state
    setProducts((prev) => prev.filter((product) => product._id !== id));

    alert("Product deleted successfully!");
  } catch (err) {
    console.error("Error deleting product:", err);
    alert("Failed to delete product.");
  }
};

  return (

    <>


      <div className="flex justify-between items-center mb-4">
        {/* Search bar on the left */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchedValue}
          onChange={onSearchChange}
          className="w-1/4 px-4 py-2 rounded-lg bg-[#1E1E1E] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8884d8]"
        />

        {/* Add Product button on the right */}
        <button
          className="px-4 py-2 bg-[#7C5AC3] text-white rounded hover:bg-[#9C7EDC] cursor-pointer"
          onClick={() => navigate("/dashboard/products/new")}
        >
          Add New Product +
        </button>
      </div>

              

      {/* Products Table */}
      <table className="w-full border-collapse border border-gray-700 text-left">
        <thead className="bg-[#121212] text-white">
          <tr>
            <th className="p-3 border border-gray-700">ID</th>
            <th className="p-3 border border-gray-700">Product Name</th>
            <th className="p-3 border border-gray-700">Price</th>
            <th className="p-3 border border-gray-700">Product Image</th>
            <th className="p-3 border border-gray-700">Actions</th>
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
                    src={`${BASE_URL}${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 border border-gray-700 flex gap-2">
                    <button
                      className="px-3 py-1 bg-[#7C5AC3] text-white rounded hover:bg-[#9C7EDC] cursor-pointer"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-[#F87171] text-white rounded hover:bg-[#EF4444] cursor-pointer"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
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
    
    </>
    
  );
};

export default ProductsPage;
