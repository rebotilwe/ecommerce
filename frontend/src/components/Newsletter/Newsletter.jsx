import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="container">
        <h2>Subscribe to our Newsletter</h2>
        <p>Get updates on new products, promotions, and discounts</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
