// src/pages/Admin/AddProduct.jsx
import React, { useState } from "react";
// import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sizes: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      price: formData.price.split(",").map((p) => parseFloat(p.trim())),
    };

    try {
      const res = await fetch("http://localhost:8085/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert("✅ Product added successfully!");
        window.location.href = "/dashboard/products";
      } else {
        alert("❌ Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Backend not active — data not saved");
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
        />

        <label>Sizes (comma-separated)</label>
        <input
          type="text"
          name="sizes"
          value={formData.sizes}
          onChange={handleChange}
        />

        <label>Prices (comma-separated, e.g. 15, 25, 100)</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
