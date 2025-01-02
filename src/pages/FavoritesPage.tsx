import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUserActions } from '../services/UserFunctions'; // The API call to remove favorite
import { useRestaurantActions, restaurant } from '../services/RestaurantFunctions.tsx'; // The type from your context
import { RootState } from '../store'; // The Redux store
import { useSelector } from 'react-redux';
import '../styles/FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<restaurant[]>([]); // Stores restaurant details
  const { handleFetchFavorites, handleRemoveFavorite } = useUserActions();
  const { handleFetchRestaurant } = useRestaurantActions();
  const userId = useSelector((state: RootState) => state.userId);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch the favorite restaurants
  useEffect(() => {
    if (userId) {
      // Step 1: Fetch the favorite IDs for the user
      handleFetchFavorites(userId).then((favs) => {
        if (favs) {
          // Step 2: For each favorite, fetch the corresponding restaurant details
          const fetchRestaurantDetails = async () => {
            const restaurantDetails = await Promise.all(
              favs.map(async (fav) => {
                const restaurantData = await handleFetchRestaurant(fav.restaurantId);
                return restaurantData;
              })
            );
            setFavorites(restaurantDetails.filter((restaurant) => restaurant !== null) as restaurant[]);
          };
          fetchRestaurantDetails();
        }
      });
    }
  }, [userId, handleFetchFavorites, handleFetchRestaurant]);

  // Remove a favorite restaurant
  const handleUnfavorite = (restaurantId: string) => {
    handleRemoveFavorite(userId, restaurantId).then(() => {
      setFavorites(favorites.filter((restaurant) => restaurant.id !== restaurantId));
    });
  };

  // Navigate to restaurant page
  const goToRestaurantPage = (restaurantId: string) => {
    navigate(`/restaurantPage/${restaurantId}`);
  };

  return (
    <div className="favorites-page">
      <h1 className="title">Your Favorite Restaurants</h1>
      <div className="grid">
        {favorites.map((restaurant) => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            onClick={() => goToRestaurantPage(restaurant.id)} // Navigate on click
          >
            <div className="restaurant-info">
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
              <button
                className="unfavorite-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering navigation
                  handleUnfavorite(restaurant.id);
                }}
                aria-label="Remove from favorites"
              >
                <span className="unfavorite-icon"></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
