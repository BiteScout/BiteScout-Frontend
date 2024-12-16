import "../styles/RestaurantPage.css";
import sushihouse from "../assets/sushihouse.png";
import image1 from "../assets/sushi1.png";
import image2 from "../assets/sushi2.png";
import image3 from "../assets/sushi3.png";

import RestaurantHeader from "../components/RestaurantHeader";
import ImageGallery from "../components/ImageGallery";
import RestaurantDetails from "../components/RestaurantDetails";
import ReviewList from "../components/ReviewList";

const RestaurantPage = () => {
  const restaurantImages = [image1, image2, image3];

  const menuItems = [
    {
      id: 1,
      name: "Sushi Platter",
      price: "$25",
      description: "A variety of sushi rolls.",
    },
    {
      id: 2,
      name: "Tempura",
      price: "$15",
      description: "Lightly battered and fried shrimp and vegetables.",
    },
    {
      id: 3,
      name: "Miso Soup",
      price: "$5",
      description: "Traditional Japanese soup with tofu and seaweed.",
    },
    {
      id: 4,
      name: "California Roll",
      price: "$12",
      description: "Crab, avocado, and cucumber rolled in rice.",
    },
    {
      id: 5,
      name: "Spicy Tuna Roll",
      price: "$14",
      description: "Fresh tuna with a kick of spice.",
    },
    {
      id: 6,
      name: "Edamame",
      price: "$8",
      description: "Steamed and salted green soybeans.",
    },
  ];

  const reviews = [
    {
      id: 1,
      username: "Alex",
      comment: "Best sushi in town!",
      likes: 85,
      date: "2024-12-15",
    },
    {
      id: 2,
      username: "Jane",
      comment: "Beautiful ambiance, loved it!",
      likes: 98,
      date: "2024-12-14",
    },
    {
      id: 3,
      username: "John",
      comment: "Amazing food and service!",
      likes: 120,
      date: "2024-12-13",
    },
  ];

  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="restaurant-page">
      <RestaurantHeader
        name="Sushi House"
        logo={sushihouse}
        rating={4.8}
        rank={1}
      />
      <div className="main-content">
        <ImageGallery images={restaurantImages} />
        <RestaurantDetails
          address="123 Sushi St, Tokyo, Japan"
          phone="+81 123 456 7890"
        />
        <div className="restaurant-menu">
          <h2>Menu</h2>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.price}
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <ReviewList
          reviews={sortedReviews}
          showAllReviewsLink="/reviews/sushi-house"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
