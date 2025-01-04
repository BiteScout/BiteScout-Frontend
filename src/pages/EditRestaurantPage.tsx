import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditRestaurantPage.css";
import { addRestaurant, restaurant } from "../services/RestaurantFunctions.tsx";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store.tsx";
import LocationPicker from "../components/LocationPicker.tsx";
import Swal from 'sweetalert2'; // Import SweetAlert2

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

const EditRestaurantPage = () => {
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState<addRestaurant>(mockRestaurantData);
  const { handleUpdateRestaurant, handleFetchRestaurant } = useRestaurantActions();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const userId = useSelector((state: RootState) => state.userId);
  const [position, setPosition] = useState<{ lng: number; lat: number;  }>({
    lng: 28.97953,
    lat: 41.015137,
  });

  const handleInputChange = (field: string, value: string) => {
    setRestaurantData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    // Check if any required fields are empty
    if (
      !restaurantData.name ||
      !restaurantData.cuisineType ||
      !restaurantData.description ||
      !restaurantData.menu ||
      !restaurantData.priceRange ||
      !position.lat ||
      !position.lng
    ) {
      alert("Please fill out all fields before saving.");
      return;
    }
    console.log(restaurantData);
    const response = handleUpdateRestaurant(
      restaurantId === undefined ? "" : restaurantId,
        {...restaurantData, location: { type: "Point", coordinates: [position.lng, position.lat]}}
    );
    response.then((data) => {
      console.log(data);
    });

    navigate(`/myRestaurants`);
  };

  const handleCancel = () => {
    navigate(`/myRestaurants`);
  };

  const handleConfirmation = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the changes to this restaurant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save changes!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveChanges();
      }
    });
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      const data = await handleFetchRestaurant(restaurantId === undefined ? "" : restaurantId);

      if (data !== undefined) {
        let addRestaurant: addRestaurant = {
          ownerId: userId,
          name: data.name,
          cuisineType: data.cuisineType,
          description: data.description,
          menu: data.menu,
          location: {
            type: "Point",
            coordinates: [data.location.longitude, data.location.latitude],
          },
          priceRange: data.priceRange,
        };
        setRestaurantData(addRestaurant);
        setPosition({ lat: data.location.latitude, lng: data.location.longitude });
      }
    };
    fetchRestaurant();
  }, [restaurantId, userId]);

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
          <label htmlFor="cuisineType">Cuisine Type</label>
          <input
            type="text"
            id="cuisineType"
            value={restaurantData.cuisineType}
            onChange={(e) => handleInputChange("cuisineType", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={restaurantData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="menu">Menu Link</label>
          <input
            type="text"
            id="menu"
            value={restaurantData.menu}
            onChange={(e) => handleInputChange("menu", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="location">Restaurant Location</label>
          <LocationPicker position={position} setPosition={setPosition} />
        </div>
        <div className="input-group">
          <label htmlFor="priceRange">Price Range</label>
          <select onChange={(e) => handleInputChange("priceRange", e.target.value)}>
            <option value={"$"}>$</option>
            <option value={"$$"}>$$</option>
            <option value={"$$$"}>$$$</option>
          </select>
        </div>
        <div className="action-buttons">
          <div style={{ flex: "1" }}>
            <button className="save-button" onClick={handleConfirmation}>
              Confirm
            </button>
          </div>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRestaurantPage;
