import React from "react";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/Hero/Hero";
import MenuSection from "../../components/MenuSection/MenuSection";
import Promotions from "../../components/Promotions/Promotions";
import Testimonials from "../../components/Testimonials/Testimonials";
import Newsletter from "../../components/Newsletter/Newsletter";
const Home = () => {
  return (
    <div>
      <Hero />
      <MenuSection />
      <Promotions />
      <Testimonials />
      <Newsletter />
      <FeaturedProducts />
      {/* You can add Featured Products or other sections here */}
    </div>
  );
};

export default Home;
