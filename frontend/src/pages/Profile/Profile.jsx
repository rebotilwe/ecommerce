// src/components/Profile/Profile.jsx
import React, { useContext, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(
    user?.profile_image ? `http://localhost:8085/uploads/${user.profile_image}` : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Temporarily update Navbar/profile preview
    updateUser({ profile_image: previewUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("address", formData.address);
    if (selectedFile) form.append("profileImage", selectedFile);

    try {
      const res = await fetch(`http://localhost:8085/api/users/update/${user.id}`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        // Update user state with server-provided image URL
        const updatedUser = {
          ...data.user,
          profile_image: data.user.profile_image
            ? `http://localhost:8085/uploads/${data.user.profile_image}`
            : null,
        };
        updateUser(updatedUser);
        setPreview(updatedUser.profile_image);
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while updating profile");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-img-section">
          <img
            src={preview || "/default-avatar.png"}
            alt="Profile Preview"
            className="profile-preview"
          />
          <label className="upload-btn">
            Change Photo
            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          </label>
        </div>

        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Phone
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Address
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
