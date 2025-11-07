// src/pages/Admin/ProductsManager.jsx
import React, { useState, useEffect } from "react";
import "./ProductsManager.css";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    image: null, // for file upload
    sizes: "",
    prices: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8085/api/admin/products");
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);
      formData.append(
        "sizes",
        JSON.stringify(form.sizes.split(",").map((s) => s.trim()))
      );
      formData.append(
        "prices",
        JSON.stringify(form.prices.split(",").map((p) => parseFloat(p)))
      );

      let url = "http://localhost:8085/api/admin/products";
      let method = "POST";

      if (form.id) {
        url += `/${form.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save product");

      setForm({ id: null, name: "", category: "", image: null, sizes: "", prices: "" });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:8085/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      image: null, // keep null until a new file is selected
      sizes: Array.isArray(product.sizes) ? product.sizes.join(",") : product.sizes,
      prices: Array.isArray(product.prices) ? product.prices.join(",") : product.prices,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-products">
      <h2>🛒 Manage Products</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <input
          type="text"
          placeholder="Sizes (comma-separated)"
          value={form.sizes}
          onChange={(e) => setForm({ ...form, sizes: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prices (comma-separated)"
          value={form.prices}
          onChange={(e) => setForm({ ...form, prices: e.target.value })}
        />
        <button type="submit">{form.id ? "Update Product" : "Add Product"}</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sizes</th>
              <th>Prices</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image && (
                      <img
                        src={`http://localhost:8085${p.image}`}
                        alt={p.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{Array.isArray(p.sizes) ? p.sizes.join(", ") : p.sizes}</td>
                  <td>{Array.isArray(p.prices) ? p.prices.join(", ") : p.prices}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsManager;
