import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditRestaurantPage.css";

type MenuItem = {
  id: number;
  name: string;
  price: string;
  description: string;
};

const mockRestaurantData = {
  id: 1,
  name: "Sushi House",
  address: "123 Sushi St, Tokyo, Japan",
  phone: "+81 123 456 7890",
  menuItems: [
    {
      id: 1,
      name: "Sushi Platter",
      price: "$25",
      description: "A variety of sushi rolls.",
    },
    {
      id: 2,
      name: "Tempura",
      price: "$15",
      description: "Lightly battered and fried shrimp and vegetables.",
    },
  ],
};

const EditRestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurantData, setRestaurantData] = useState(mockRestaurantData);

  const handleInputChange = (field: string, value: string) => {
    setRestaurantData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Updated Restaurant Data:", restaurantData);
    navigate(`/my-restaurants`);
  };

  const handleCancel = () => {
    navigate(`/my-restaurants`);
  };

  const handleDeleteRestaurant = () => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      console.log("Restaurant deleted:", restaurantData);
      navigate(`/my-restaurants`);
    }
  };

  return (
    <div className="edit-restaurant-page">
      <h1 className="page-title">Edit Restaurant</h1>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="name">Restaurant Name</label>
          <input
            type="text"
            id="name"
            value={restaurantData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={restaurantData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={restaurantData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div className="action-buttons">
          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="delete-button" onClick={handleDeleteRestaurant}>
            Delete Restaurant
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRestaurantPage;