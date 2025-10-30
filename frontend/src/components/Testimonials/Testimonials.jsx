import React from "react";
import "./Testimonials.css";

const testimonials = [
  { name: "Alice", feedback: "Best water delivery service! Fast & fresh." },
  { name: "Brian", feedback: "Premium quality water. Highly recommend." },
  { name: "Cindy", feedback: "Excellent customer service and timely delivery." },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((testi, index) => (
            <div className="testimonial-card" key={index}>
              <p>"{testi.feedback}"</p>
              <h4>- {testi.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
