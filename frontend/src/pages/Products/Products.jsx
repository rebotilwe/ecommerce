// src/pages/Products/Products.jsx
import React, { useState, useContext } from "react";
import { products } from "../../data/productsData";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import "./Products.css";

const categories = [
  "All",
  "Still Range",
  "Sparkling Range",
  "Flavored Range",
  "Sport Range",
  "Refills",
  "Dispensers",
];

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState({});

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);


      const getPrice = (product, size) => {
  const idx = product.sizes.indexOf(size);
  return idx >= 0 ? product.price[idx] : product.price[0];
};

const handleAddToCart = (product) => {
  const size = selectedSizes[product.id] || product.sizes[0];
  const price = getPrice(product, size);
  addToCart({ ...product, size, price });
};

  return (
    <div className="products-page">
      <div className="container">
        <h1>Our Products</h1>

        <div className="categories">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>

              <select
                value={selectedSizes[product.id] || product.sizes[0]}
                onChange={(e) =>
                  setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })
                }
              >
                {product.sizes.map((size, idx) => (
                  <option key={idx} value={size}>
                    {size} - R{product.price[idx]}
                  </option>
                ))}
              </select>

              <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
