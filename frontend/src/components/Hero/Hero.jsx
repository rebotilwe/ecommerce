import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

import header_img from '../../assets/images/header_img.jpeg';
console.log(header_img); // should print /src/assets/images/header_img.****.jpeg


const Hero = () => {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${header_img})` }}
    >
      <div className="hero-overlay">
              <div className="hero-droplet"></div>
              
        <div className="hero-content">
          <h1>Pure. Fresh. Water.</h1>
          <p>Premium bottled water delivered to your door</p>
          <Link to="/products" className="btn btn-primary hero-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
