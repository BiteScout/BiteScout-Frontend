// FavoritesPage.tsx
import "../styles/FavoritesPage.css";
import sushihouse from "../assets/sushihouse.png";
import pastaparadise from "../assets/pastaparadise.png";
import grillmaster from "../assets/grillmaster.png";

const favorites = [
  {
    id: 1,
    name: "Sushi House",
    location: "Istanbul, Kadıköy",
    rating: 4.8,
    image: sushihouse,
  },
  {
    id: 2,
    name: "Pasta Paradise",
    location: "Istanbul, Beşiktaş",
    rating: 4.7,
    image: pastaparadise,
  },
  {
    id: 3,
    name: "Grill Master",
    location: "Ankara, Çankaya",
    rating: 4.6,
    image: grillmaster,
  },
];

const FavoritesPage = () => {
  return (
    <div className="favorites-page">
      <h1 className="favorites-title">My Favorite Restaurants</h1>
      <div className="favorites-list">
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
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
