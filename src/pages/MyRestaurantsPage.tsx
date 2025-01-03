import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { restaurant, useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import { RootState } from "../store.tsx";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "../styles/MyRestaurantsPage.css";

const MyRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState<restaurant[]>([]);
  const navigate = useNavigate();
  const { handleFetchMyRestaurants, handleDeleteRestaurant } = useRestaurantActions();
  const userId = useSelector((state: RootState) => state.userId);
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchRestaurants = async () => {
      await delay(10);
      const restaurants = await handleFetchMyRestaurants(userId);
      if (restaurants !== undefined) {
        setRestaurants(restaurants);
      }
    };
    fetchRestaurants();
  }, [userId]);

  const handleRemoveRestaurant = async (restaurantId: string) => {
    try {
      await handleDeleteRestaurant(restaurantId);
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== restaurantId)
      );
    } catch (error) {
      console.error("Failed to delete restaurant:", error);
    }
  };

  const handleDeleteClick = (restaurantId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this restaurant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveRestaurant(restaurantId);
        Swal.fire(
          'Deleted!',
          'Your restaurant has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="my-restaurants-page">
      <h1 className="page-title">My Restaurants</h1>

      <div key={restaurants.length} className="restaurant-list">
        {restaurants.map((restaurant, index: number) => (
          <div key={index} className="restaurant-card">
            <div
              className="restaurant-info"
              onClick={() => navigate(`/restaurantPage/${restaurant.id}`)}
            >
              <h2>{restaurant.name}</h2>
            </div>
            <button
              className="edit-button"
              onClick={() => navigate(`/offers/${restaurant.id}`)}
            >
              Offers
            </button>
            <button
              className="edit-button"
              onClick={() => navigate(`/reservationApproval/${restaurant.id}`)}
            >
              Reservation Requests
            </button>
            <button
              className="edit-button2"
              onClick={() => navigate(`/editRestaurant/${restaurant.id}`)}
            >
              <span className="edit-icon"></span>
            </button>
            <button 
              className="delete-button2"
              onClick={() => handleDeleteClick(restaurant.id)} // Trigger the SweetAlert2
            >
              <span className="delete-icon"></span>
            </button>
          </div>
        ))}
      </div>
      <button
        className={"edit-button"}
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/addRestaurant")}
      >
        Add Restaurant
      </button>
    </div>
  );
};

export default MyRestaurantsPage;
