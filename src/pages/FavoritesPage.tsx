// FavoritesPage.tsx
import "../styles/FavoritesPage.css";
import {useState} from "react";
import {restaurant} from "../services/RestaurantFunctions.tsx";


const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<restaurant[]>()
  return (
    <div className="favorites-page">
      <h1 className="favorites-title">My Favorite Restaurants</h1>
        <div className="favorites-list">{/*
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite-card">
            <img
              src={favorite.image}
              alt={favorite.name}
              className="favorite-image"
            />
            <div className="favorite-details">
              <h2 className="favorite-name">{favorite.name}</h2>
              <p className="favorite-location">{favorite.location}</p>
              <p className="favorite-rating">
                ⭐ {favorite.rating.toFixed(1)}/5
              </p>
              <button className="favorite-button">Make a Reservation</button>
            </div>
          </div>
        ))}*/}
      </div>
    </div>
  );
};

export default FavoritesPage;
