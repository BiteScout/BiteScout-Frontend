import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyRestaurantsPage.css";
import {restaurant, useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {RootState} from "../store.tsx";
import {useSelector} from "react-redux";



const MyRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState<restaurant[]>([]);
  const navigate = useNavigate();
  const {handleFetchMyRestaurants} = useRestaurantActions();
  const userId = useSelector( (state:RootState) => state.userId)

  useEffect(() => {
    const restaurants = handleFetchMyRestaurants(userId)
    restaurants.then((data) => {
      if (data !== undefined){
        setRestaurants(data);
      }

    })
  }, []);

  return (
    <div className="my-restaurants-page">
      <h1 className="page-title">My Restaurants</h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant, index:number) => (
          <div key={index} className="restaurant-card">
            <div
              className="restaurant-info"
              onClick={() => navigate(`/restaurantPage/${restaurant.id}}`)}
            >
              <h2>{restaurant.name}</h2>
            </div>
            <button
              className="edit-button"
              onClick={() => navigate(`/editRestaurant/${restaurant.id}`)}
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
