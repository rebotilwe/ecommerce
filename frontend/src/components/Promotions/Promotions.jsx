import React from "react";
import "./Promotions.css";

const promotions = [
  { title: "Buy 2 Get 1 Free", description: "On all 500ml bottles", bgColor: "#d3ad7f" },
  { title: "Free Delivery", description: "On orders above R200", bgColor: "#b89161" },
  { title: "20% Off", description: "On Sparkling Range", bgColor: "#f4c27f" },
];

const Promotions = () => {
  return (
    <section className="promotions">
      <div className="container">
        <div className="promo-grid">
          {promotions.map((promo, index) => (
            <div
              className="promo-card"
              key={index}
              style={{ backgroundColor: promo.bgColor }}
            >
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
