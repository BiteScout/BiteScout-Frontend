import "../styles/HomePage.css";
import { useEffect, useState } from "react";
import { restaurant } from "../services/RestaurantFunctions.tsx";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import {useNavigate} from "react-router-dom";
import defaultImage from "../assets/restaurant-icon.png";

interface restaurantWithRating extends restaurant {
  popularityScore: number;
  image?: string; // Add image property to store the picture URL
}

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<restaurant[]>([]);
  const [restaurantsWithRating, setRestaurantsWithRating] = useState<restaurantWithRating[]>([]);
  const { handleSearchRestaurants, handleFetchRanking, handleCalculateRating, handleGetRestaurantPictures } = useRestaurantActions();
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();

  // Fetch Restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await handleSearchRestaurants("all");
      if (response) setRestaurants(response);
    };
    fetchRestaurants();
  }, []);

  // Fetch Ratings and Pictures
  useEffect(() => {
    const fetchRatingsAndPictures = async () => {
      await delay(150);

      const updatedRestaurants = await Promise.all(
        restaurants.map(async (restaurant) => {
          const restaurantWithRating: restaurantWithRating = {
            ...restaurant,
            popularityScore: 0,
          };

          try {
            // Fetch Ranking
            const ratingData = await handleFetchRanking(restaurant.id);
            if (ratingData) restaurantWithRating.popularityScore = ratingData.popularityScore;

            // Fetch Pictures
            const pictures = await handleGetRestaurantPictures(restaurant.id);
            if (pictures && pictures.length > 0) {
              restaurantWithRating.image = pictures[0]; // Use the first picture URL
            }
          } catch (err) {
            console.error(err);
          }

          return restaurantWithRating;
        })
      );

      setRestaurantsWithRating(updatedRestaurants);

      // Sort by popularityScore
      setRestaurantsWithRating((prev) => prev.sort((a, b) => b.popularityScore - a.popularityScore));
    };

    fetchRatingsAndPictures();
  }, [restaurants]);

  return (
    <div className="home-page">
      <main className="main-content">
        <div className="content-section">
          <section className="trending-restaurants">
            <h2>Trending Restaurants</h2>
            <div className="restaurant-list">
              {restaurantsWithRating
                .slice(0, restaurantsWithRating.length >= 5 ? 5 : restaurantsWithRating.length)
                .map((restaurant, index) => (
                  <a onClick={() => navigate(`/restaurantPage/${restaurant.id}`)}>
                    <div className="restaurant-card" key={index}>
                    <img
                      src={restaurant.image || defaultImage} // Use default image if no picture is available
                      alt={restaurant.name}
                      className="restaurant-image"
                    />
                    <div className="restaurant-name">{restaurant.name}</div>
                  </div>
                  </a>

                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
