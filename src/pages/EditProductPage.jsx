import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminFormFields from "./adminFormFields";
import API from "@/utils/api";

const EditProductPage = () => {
  const { id } = useParams();
  const isEdit = !!id; // true if editing
  const [product, setProduct] = useState(isEdit ? null : {}); // blank object for new product
  const [loading, setLoading] = useState(isEdit); // only loading if editing
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return; // skip fetch if adding new product

    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API.PRODUCTS}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Product not found");
        navigate("/dashboard/products"); // redirect back if product doesn't exist
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isEdit, navigate]);

  if (loading) return <p className="text-gray-200 text-center mt-6">Loading...</p>;

  return (
    <AdminFormFields
      product={product}
      onUpdateSuccess={() => navigate("/dashboard/products")}
      isEdit={isEdit} // optional prop if your form needs it
    />
  );
};

export default EditProductPage;
