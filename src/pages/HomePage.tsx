import "../styles/HomePage.css";
import sushihouse from "../assets/sushihouse.png";
import pastaparadise from "../assets/pastaparadise.png";
import grillmaster from "../assets/grillmaster.png";

const restaurants = [
  {
    name: "Sushi House",
    image: sushihouse,
  },
  {
    name: "Pasta Paradise",
    image: pastaparadise,
  },
  {
    name: "Grill Master",
    image: grillmaster,
  },
];

const recentlyVisited = [
  {
    name: "Burger Town",
    image: sushihouse, // Örnek bir görsel; kendi görselinizi koyabilirsiniz
  },
  {
    name: "Pizza Palace",
    image: pastaparadise,
  },
  {
    name: "Steak Haven",
    image: grillmaster,
  },
];

const HomePage = () => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search initiated.");
  };

  return (
    <div className="home-page">
      {/* Main Content */}
      <main className="main-content">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search for restaurants..."
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>

        <div className="content-section">
          <section className="trending-restaurants">
            <h2>Trending Restaurants</h2>
            <div className="restaurant-list">
              {restaurants.map((restaurant, index) => (
                <div className="restaurant-card" key={index}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <p>{restaurant.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="recently-visited">
            <h2>Recently Visited</h2>
            <div className="restaurant-list">
              {recentlyVisited.map((restaurant, index) => (
                <div className="restaurant-card" key={index}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <p>{restaurant.name}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
