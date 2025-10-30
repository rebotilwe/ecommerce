import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

// Example products
const products = [
  { id: 1, name: "500ml Water Bottle", price: "R20", img: "/images/food_1.jpeg" },
  { id: 2, name: "1L Water Bottle", price: "R35", img: "/images/product2.jpeg" },
  { id: 3, name: "5L Water Bottle", price: "R80", img: "/images/product3.jpeg" },
  { id: 4, name: "Refill Pack", price: "R50", img: "/images/product4.jpeg" },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <Link to="/products" className="btn btn-primary">Buy Now</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
