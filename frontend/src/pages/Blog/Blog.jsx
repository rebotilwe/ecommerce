// src/pages/Blog/Blog.jsx
import React from "react";
import "./Blog.css";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Benefits of Staying Hydrated",
    date: "October 20, 2025",
    excerpt: "Discover why drinking enough water daily improves your health, energy, and focus.",
    image: "/src/assets/images/hydration.jpg",
  },
  {
    id: 2,
    title: "How to Choose the Right Water Dispenser",
    date: "October 15, 2025",
    excerpt: "Learn the factors to consider when selecting a dispenser for home or office use.",
    image: "/src/assets/images/dispenser.jpeg",
  },
  {
    id: 3,
    title: "Top 5 Flavored Waters to Try",
    date: "October 10, 2025",
    excerpt: "A guide to our best-selling flavored waters to keep you refreshed and healthy.",
    image: "/src/assets/images/flavored.jpeg",
  },
];

const Blog = () => {
  return (
    <div className="blog-page">
      <div className="container">
        <h1>Our Blog</h1>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={post.image} alt={post.title} />
              <div className="blog-content">
                <h3>{post.title}</h3>
                <small>{post.date}</small>
                <p>{post.excerpt}</p>
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
