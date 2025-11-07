// src/pages/Admin/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./AddProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8085/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => alert("⚠️ Failed to load product details"));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updated = {
      ...product,
      sizes: product.sizes.split(",").map((s) => s.trim()),
      price: product.price.split(",").map((p) => parseFloat(p.trim())),
    };

    try {
      const res = await fetch(`http://localhost:8085/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        alert("✅ Product updated successfully!");
        window.location.href = "/dashboard/products";
      } else {
        alert("❌ Failed to update product");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="add-product-page">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate} className="add-product-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <label>Sizes (comma-separated)</label>
        <input
          type="text"
          name="sizes"
          value={product.sizes}
          onChange={handleChange}
        />

        <label>Prices (comma-separated)</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
