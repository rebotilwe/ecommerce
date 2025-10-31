// src/data/productsData.js

import still1 from "../assets/images/500ml-thirstiBottle.jpeg";
import still2 from "../assets/images/stillWater.jpeg";
import sparkling1 from "../assets/images/sparklingWater.jpeg";
import flavored1 from "../assets/images/flavoredWater.jpeg";
import sport1 from "../assets/images/sportrange.png"
import refill1 from "../assets/images/refill-pack.jpeg";
import dispenser1 from "../assets/images/dispenser.jpeg";

export const products = [
  {
    id: 1,
    name: "Still Water 500ml",
    category: "Still Range",
    image: still1,
    sizes: ["500ml", "1L", "5L"],
    price: [15, 25, 100],
  },
  {
    id: 2,
    name: "Still Water 1L",
    category: "Still Range",
    image: still2,
    sizes: ["1L", "5L"],
    price: [25, 100],
  },
  {
    id: 3,
    name: "Sparkling Water 500ml",
    category: "Sparkling Range",
    image: sparkling1,
    sizes: ["500ml", "1L"],
    price: [20, 35],
  },
  {
    id: 4,
    name: "Flavored Water 500ml",
    category: "Flavored Range",
    image: flavored1,
    sizes: ["500ml"],
    price: [25],
  },
  {
    id: 5,
    name: "Sport Water 750ml",
    category: "Sport Range",
    image: sport1,
    sizes: ["750ml", "1L"],
    price: [18, 30],
  },
  {
    id: 6,
    name: "Refill 20L",
    category: "Refills",
    image: refill1,
    sizes: ["20L"],
    price: [60],
  },
  {
    id: 7,
    name: "Water Dispenser",
    category: "Dispensers",
    image: dispenser1,
    sizes: ["Standard"],
    price: [500],
  },
];
