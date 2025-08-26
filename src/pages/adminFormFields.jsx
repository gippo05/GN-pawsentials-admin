import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "@/utils/api";

const AdminFormFields = ({ product = {}, onUpdateSuccess }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const {id} = useParams();

  const navigate = useNavigate();

  // Update form fields whenever product prop changes
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setOriginalPrice(product.originalPrice || "");
      setDescription(product.description || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("originalPrice", originalPrice);

    if (image) {
      // checks if uploading a new file
      formData.append("image", image);
    } else {
      // If not uploading, send current image so backend knows to keep it
      formData.append("image", product.image);
    }

       if (id) { // updates existing products
      await axios.put(
        `${API.PRODUCTS}/admin/updateProduct/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product has been updated!");
      onUpdateSuccess?.();
    } else {
      // Creates a new product instead if ID doesnt exist.
      await axios.post(
        `${API.PRODUCTS}/admin/CreateNewProduct`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product has been created!");
      onUpdateSuccess?.();
    }
  } catch (err) {
    console.error(err);
    alert("Update failed. Check console for details.");
  }
};


  return (
    <div className="max-w-lg mx-auto mt-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
      >
        &larr; Back
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E1E1E] p-6 rounded-xl shadow-md flex flex-col gap-5"
      >
        <h2 className="text-white text-xl font-semibold mb-2">Add/Edit Product</h2>

        <label className="text-gray-300">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full p-2 rounded bg-[#121212] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8884d8]"
          />
        </label>

        <label className="text-gray-300">
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 w-full p-2 rounded bg-[#121212] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8884d8]"
          />
        </label>

        <label className="text-gray-300">
          Original Price
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
            className="mt-1 w-full p-2 rounded bg-[#121212] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8884d8]"
          />
        </label>

        <label className="text-gray-300">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 w-full p-2 rounded bg-[#121212] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8884d8]"
          />
        </label>

        <label className="text-gray-300">
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 w-full p-2 rounded bg-[#121212] border border-gray-700 text-gray-200"
          />
        </label>

        <button className="mt-3 px-4 py-2 bg-[#8884d8] hover:bg-[#9C7EDC] text-white rounded font-medium transition">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AdminFormFields;
