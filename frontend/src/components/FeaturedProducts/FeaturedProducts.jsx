import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

// ✅ Import images from src/assets/images
import food1 from "../../assets/images/500ml-thirstiBottle.jpeg";
// import food2 from "../../assets/images/1L-thirstiBottle.jpeg";
import product3 from "../../assets/images/5L-thirstiBottle.jpeg";
import product4 from "../../assets/images/refill-pack.jpeg";
import thirstBottle1L from "../../assets/images/1L-thirstiBottle.jpeg";

const products = [
  { id: 1, name: "500ml Water Bottle", price: "R20", img: food1 },
  { id: 2, name: "1L Water Bottle", price: "R35", img: thirstBottle1L },
  { id: 3, name: "5L Water Bottle", price: "R80", img: product3 },
  { id: 4, name: "Refill Pack", price: "R50", img: product4 },
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
              <Link to="/products" className="btn btn-primary">
                Buy Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
