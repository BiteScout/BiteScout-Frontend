import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditRestaurantPage.css";
import { addRestaurant } from "../services/RestaurantFunctions.tsx";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store.tsx";
import LocationPicker from "../components/LocationPicker.tsx";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "../styles/react-confirm-alert.css"; // Import default styles

const mockRestaurantData: addRestaurant = {
  ownerId: "",
  name: "",
  cuisineType: "",
  description: "",
  menu: "",
  location: {
    type: "Point",
    coordinates: [41.015137, 28.97953],
  },
  priceRange: "",
};

const AddRestaurantPage = () => {
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState<addRestaurant>(mockRestaurantData);
  const { handleAddRestaurant } = useRestaurantActions();
  const userId = useSelector((state: RootState) => state.userId);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 41.015137,
    lng: 28.97953,
  });

  // State to track errors
  const [errors, setErrors] = useState({
    name: "",
    cuisineType: "",
    description: "",
    menu: "",
    priceRange: "",
  });

  // Update restaurant data and validate inputs
  const handleInputChange = (field: string, value: string) => {
    setRestaurantData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: value.trim() === "" ? "Cannot be empty" : "",
    }));
  };

  // Validate all fields before saving
  const handleSaveChanges = () => {
    const newErrors = {
      name: restaurantData.name.trim() === "" ? "Cannot be empty" : "",
      cuisineType: restaurantData.cuisineType.trim() === "" ? "Cannot be empty" : "",
      description: restaurantData.description.trim() === "" ? "Cannot be empty" : "",
      menu: restaurantData.menu.trim() === "" ? "Cannot be empty" : "",
      priceRange: restaurantData.priceRange === "" ? "Cannot be empty" : "",
    };

    setErrors(newErrors);

    // If no errors, show confirmation dialog
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      confirmAlert({
        title: "Confirm to Submit",
        message: "Are you sure you want to create this restaurant?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              handleAddRestaurant({ ...restaurantData, ownerId: userId }).then(() => {
                navigate(`/myRestaurants`);
              });
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  // Set ownerId on component mount
  useEffect(() => {
    setRestaurantData((prev) => ({ ...prev, ownerId: userId }));
  }, [userId]);

  // Cancel adding restaurant
  const handleCancel = () => {
    navigate(`/myRestaurants`);
  };

  return (
    <div className="edit-restaurant-page">
      <h1 className="page-title">Add Restaurant</h1>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="name">Restaurant Name</label>
          <input
            type="text"
            id="name"
            value={restaurantData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="cuisineType">Cuisine Type</label>
          <input
            type="text"
            id="cuisineType"
            value={restaurantData.cuisineType}
            onChange={(e) => handleInputChange("cuisineType", e.target.value)}
          />
          {errors.cuisineType && <span className="error-message">{errors.cuisineType}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={restaurantData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="menu">Menu Link</label>
          <input
            type="text"
            id="menu"
            value={restaurantData.menu}
            onChange={(e) => handleInputChange("menu", e.target.value)}
          />
          {errors.menu && <span className="error-message">{errors.menu}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="location">Restaurant Location</label>
          <LocationPicker position={position} setPosition={setPosition} />
        </div>
        <div className="input-group">
          <label htmlFor="priceRange">Price Range</label>
          <select
            value={restaurantData.priceRange}
            onChange={(e) => handleInputChange("priceRange", e.target.value)}
          >
            <option value="">Select Price Range</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
          {errors.priceRange && <span className="error-message">{errors.priceRange}</span>}
        </div>
        <div className="action-buttons">
          <button className="save-button" onClick={handleSaveChanges}>
            Confirm
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantPage;