import "../styles/HomePage.css";
import sushihouse from "../assets/sushihouse.png";
import pastaparadise from "../assets/pastaparadise.png";
import grillmaster from "../assets/grillmaster.png";
import {useEffect, useState} from "react";
import {restaurant} from "../services/RestaurantFunctions.tsx";
import {useRestaurantActions} from "../services/RestaurantFunctions.tsx";

interface restaurantWithRating extends restaurant{
  popularityScore: number;
}

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<restaurant[]>([]);
  const [restaurantsWithRating, setRestaurantsWithRating] = useState<restaurantWithRating[]>([]);
  const {handleSearchRestaurants, handleFetchRanking, handleCalculateRating} = useRestaurantActions();
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await handleSearchRestaurants("all");
      if (response !== undefined)
        setRestaurants(response);
    }
    fetchRestaurants()



  },[])

  useEffect(() => {
    const fetchRatings = async() => {
      await delay(150)
      const updatedRestaurant = await Promise.all(
          restaurants.map(async (restaurant) => {
            const restaurantWithRating:restaurantWithRating = {
              ...restaurant,
              popularityScore: 0
            }

            try{
              const ratingData = await handleFetchRanking(restaurant.id)
              if( ratingData !== undefined){
                restaurantWithRating.popularityScore = ratingData.popularityScore
              }
            }
            catch (err){
              console.log(err)
            }
            return restaurantWithRating
          })
      )
      setRestaurantsWithRating(updatedRestaurant);

      setRestaurantsWithRating((prev) => prev.sort((a, b) => b.popularityScore - a.popularityScore));
    }
    fetchRatings();
  }, [restaurants]);

  return (
    <div className="home-page">
      {/* Main Content */}
      <main className="main-content">

        <div className="content-section">
          <section className="trending-restaurants">
            <h2>Trending Restaurants</h2>
            <div className="restaurant-list">
              {restaurantsWithRating.slice(0, restaurantsWithRating.length >= 5 ? 5 : restaurantsWithRating.length).map((restaurant, index) => (
                <div className="restaurant-card" key={index}>
                  <img
                    src={"restaurant.image"}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <div className="restaurant-name">{restaurant.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/*<section className="recently-visited">
            <h2>Recently Visited</h2>
            <div className="restaurant-list">
              {recentlyVisited.map((restaurant, index) => (
                <div className="restaurant-card" key={index}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <div className="restaurant-name">{restaurant.name}</div>
                </div>
              ))}
            </div>
          </section>*/}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
