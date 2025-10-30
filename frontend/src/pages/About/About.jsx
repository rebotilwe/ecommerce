import React from "react";
import "./About.css";
import about_img from "../../assets/images/header_img.jpeg"; // replace with your actual image

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container about-hero-content">
          <h1>About Thirsti</h1>
          <p>Delivering premium bottled water straight to your door.</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story-grid">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Thirsti is a premium bottled water brand committed to delivering pure,
              fresh, and eco-friendly water to our customers. We cater to individuals,
              offices, and retailers who value quality and convenience.
            </p>
            <p>
              Our mission is to make premium hydration accessible while maintaining
              sustainable practices and top-notch customer service.
            </p>
          </div>
          <div className="story-image">
            <img src={about_img} alt="About Thirsti" />
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <h2>Our Mission & Values</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <h3>Quality</h3>
              <p>Providing the purest and freshest bottled water to every customer.</p>
            </div>
            <div className="mission-card">
              <h3>Convenience</h3>
              <p>Easy online ordering and reliable delivery.</p>
            </div>
            <div className="mission-card">
              <h3>Sustainability</h3>
              <p>Eco-conscious packaging and responsible sourcing practices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
