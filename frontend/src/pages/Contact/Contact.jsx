// src/pages/Contact/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8085/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Message sent! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert("Error sending message. Try again later.");
  }
};

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <p>If you have any questions or inquiries, please fill out the form below.</p>

        {/* Form + Info side by side */}
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <h3>Our Contact Info</h3>
            <p><strong>Phone:</strong> +27 12 345 6789</p>
            <p><strong>Email:</strong> info@thirsti.co.za</p>
            <p><strong>Address:</strong> 123 Water Street, Pretoria, South Africa</p>
          </div>
        </div>

     {/* Map below everything */}
<div className="map-container">
  <a
    href="https://www.google.com/maps/place/123+Water+Street,+Pretoria,+South+Africa"
    target="_blank"
    rel="noopener noreferrer"
  >
    <iframe
      title="Thirsti Location"
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28652.572372643557!2d28.0526848!3d-26.1455094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v1761898247982!5m2!1sen!2sza"
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: "15px" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </a>
</div>

      </div>
    </div>
  );
};

export default Contact;
