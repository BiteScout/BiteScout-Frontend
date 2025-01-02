import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditRestaurantPage.css";
import {addRestaurant, restaurant} from "../services/RestaurantFunctions.tsx";
import {useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import LocationPicker from "../components/LocationPicker.tsx";

const mockRestaurantData:addRestaurant = {
  ownerId: "",
  name: "",
  cuisineType:"",
  description:"",
  menu: "",
  location: {
    type: "Point",
    coordinates: [41.015137, 28.979530]
  },
  priceRange: "",
};

const EditRestaurantPage = () => {
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState<addRestaurant>(mockRestaurantData);
  const {handleUpdateRestaurant, handleFetchRestaurant} = useRestaurantActions();
  const {restaurantId} = useParams<{restaurantId:string}>();
  const userId = useSelector((state: RootState) => state.userId);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({lat: 41.015137, lng: 28.979530});

  const handleInputChange = (field: string, value: string) => {
    setRestaurantData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    setRestaurantData((prev) => ({...prev, ["ownerId"]: userId }));
    setRestaurantData((prev) => ({...prev, ["location"]: {type: "Point", coordinates: [position.lat, position.lng]} }));
    const response = handleUpdateRestaurant(restaurantId === undefined? "": restaurantId ,restaurantData);
    response.then((data) => {
      console.log(data);
    })
    navigate(`/myRestaurants`);
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      const data = await handleFetchRestaurant(restaurantId === undefined ? "": restaurantId);

        if (data !== undefined){
          let addRestaurant: addRestaurant = {
            ownerId: userId,
            name: data.name,
            cuisineType: data.cuisineType,
            description:data.description,
            menu: data.menu,
            location: {
              type:"Point",
              coordinates: [data.location.latitude, data.location.longitude]
            },
            priceRange: data.priceRange,
          }
          setRestaurantData(addRestaurant);
          setPosition({lat:data.location.latitude, lng:data.location.longitude})
        }

    }
    fetchRestaurant();
  }, [])



  const handleCancel = () => {
    navigate(`/myRestaurants`);
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

export default EditRestaurantPage;
