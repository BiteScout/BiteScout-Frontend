import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyRestaurantsPage.css";

const mockRestaurants = [
  {
    id: 1,
    name: "Sushi House",
    address: "123 Sushi St, Tokyo, Japan",
  },
  {
    id: 2,
    name: "Pasta Paradise",
    address: "45 Spaghetti Ave, Rome, Italy",
  },
  {
    id: 3,
    name: "Burger Bistro",
    address: "789 Burger Blvd, New York, USA",
  },
];

const MyRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/restaurant/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-restaurant/${id}`);
  };

  return (
    <div className="my-restaurants-page">
      <h1 className="page-title">My Restaurants</h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <div
              className="restaurant-info"
              onClick={() => handleViewDetails(restaurant.id)}
            >
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address}</p>
            </div>
            <button
              className="edit-button"
              onClick={() => handleEdit(restaurant.id)}
            >
              Edit Restaurant
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRestaurantsPage;
