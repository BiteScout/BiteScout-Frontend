import React, { useState } from "react";
import "../styles/SettingsPage.css";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    id: "2e5144e0-9ff6-46df-b254-bb98c8a2a8a6",
    username: "newUsername",
    password: "",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    country: "USA",
    city: "New York",
    postalCode: "10001",
    address: "123 Main Street",
    profilePicture: "profilePic.jpg",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated data:", userData);
    alert("Your information has been updated successfully!");
  };

  return (
    <div className="settings-page">
      <div className="form-container">
        <h1 className="title">Account Settings</h1>
        <form onSubmit={handleUpdate} className="settings-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={userData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={userData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={userData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="update-button">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
