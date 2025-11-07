import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import "./Products.css";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8085/api/admin/products");
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map(p => ({
            ...p,
            sizes: Array.isArray(p.sizes) ? p.sizes : JSON.parse(p.sizes),
            price: Array.isArray(p.prices) ? p.prices : JSON.parse(p.prices)
          }));
          setProducts(formatted);

          // Dynamically generate categories
          const cats = ["All", ...new Set(formatted.map(p => p.category))];
          setCategories(cats);
        }
      } catch (err) {
        console.warn("⚠️ Backend not running, no products loaded");
      }
    };
    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Get price for selected size
  const getPrice = (product, size) => {
    const idx = product.sizes.indexOf(size);
    return idx >= 0 ? product.price[idx] : product.price[0];
  };

  // Add to cart
  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart");
      return;
    }
    const size = selectedSizes[product.id] || product.sizes[0];
    const price = getPrice(product, size);
    addToCart({
      productId: product.id,
      name: product.name,
      size,
      price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1>Our Products</h1>

        {/* Category Buttons */}
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

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
        <div className="product-card" key={product.id}>
  <img
    src={product.image.startsWith("/uploads") ? `http://localhost:8085${product.image}` : product.image}
    alt={product.name}
  />
  <h3>{product.name}</h3>

  <select
    value={selectedSizes[product.id] || product.sizes[0]}
    onChange={(e) =>
      setSelectedSizes({
        ...selectedSizes,
        [product.id]: e.target.value,
      })
    }
  >
    {product.sizes.map((size, idx) => (
      <option key={idx} value={size}>
        {size} - R{product.price[idx]}
      </option>
    ))}
  </select>

  <button
    className="btn btn-primary"
    onClick={() => handleAddToCart(product)}
  >
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
