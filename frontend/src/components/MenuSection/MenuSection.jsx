import React from "react";
import "./MenuSection.css";

import menu_1 from "../../assets/images/stillWater.jpeg";
import menu_2 from "../../assets/images/sparklingWater.jpeg";
import menu_3 from "../../assets/images/flavoredWater.jpeg";
import menu_4 from "../../assets/images/sportrange.png";

const menus = [
  {
    menu_name: "Still Range",
    menu_image: menu_1,
    description:
      "Pure, natural bottled water sourced from protected springs, perfect for everyday hydration.",
  },
  {
    menu_name: "Sparkling Range",
    menu_image: menu_2,
    description:
      "Refreshingly carbonated water with natural bubbles for a sparkling delight.",
  },
  {
    menu_name: "Flavored Range",
    menu_image: menu_3,
    description:
      "Infused with subtle natural flavors for a tasteful twist without added sugars.",
  },
  {
    menu_name: "Sport Range",
    menu_image: menu_4,
    description:
      "Enhanced with electrolytes and minerals to replenish and hydrate active lifestyles.",
  },
];

const MenuSection = () => {
  return (
    <section className="menu-section">
      <div className="container">
        <h2>Our Water Ranges</h2>
        <div className="menu-grid">
          {menus.map((menu, index) => (
            <div className="menu-card" key={index}>
              <div className="menu-img-wrapper">
                <img src={menu.menu_image} alt={menu.menu_name} />
              </div>
              <h3>{menu.menu_name}</h3>
              <p className="menu-info">{menu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
