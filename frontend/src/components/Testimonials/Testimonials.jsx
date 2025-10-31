import React, { useRef } from "react";
import "./Testimonials.css";

import user1 from "../../assets/images/person_1.jpg";
import user2 from "../../assets/images/person_2.jpg";
import user3 from "../../assets/images/person_3.jpg";
import user4 from "../../assets/images/person_2.jpg";
import user5 from "../../assets/images/person_1.jpg";

const testimonials = [
  { name: "Alice", feedback: "Best water delivery service! Fast & fresh.", img: user1 },
  { name: "Brian", feedback: "Premium quality water. Highly recommend.", img: user2 },
  { name: "Cindy", feedback: "Excellent customer service and timely delivery.", img: user3 },
  { name: "David", feedback: "I love the taste and packaging. 10/10!", img: user4 },
  { name: "Ella", feedback: "Always reliable and refreshing!", img: user5 },
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -320, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>

        <div className="scroll-btn left" onClick={() => scroll("left")}>
          ❮
        </div>

        <div className="testimonial-scroll" ref={scrollRef}>
          {testimonials.map((testi, index) => (
            <div className="testimonial-card" key={index}>
              <img src={testi.img} alt={testi.name} className="testimonial-img" />
              <p>"{testi.feedback}"</p>
              <h4>- {testi.name}</h4>
            </div>
          ))}
        </div>

        <div className="scroll-btn right" onClick={() => scroll("right")}>
          ❯
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
