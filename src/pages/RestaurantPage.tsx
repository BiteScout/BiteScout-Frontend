import "../styles/RestaurantPage.css";
import sushihouse from "../assets/sushihouse.png";
import image1 from "../assets/sushi1.png";
import image2 from "../assets/sushi2.png";
import image3 from "../assets/sushi3.png";

import RestaurantHeader from "../components/RestaurantHeader";
import ImageGallery from "../components/ImageGallery";
import RestaurantDetails from "../components/RestaurantDetails";
import ReviewList from "../components/ReviewList";
import {restaurant, review, useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {startTransition, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MapComponent from "../components/MapComponent.tsx";

const RestaurantPage = () => {
  const restaurantImages = [image1, image2, image3];
  const baseRestaurant: restaurant = {
    ownerId: "",
    name: "",
    description: "",
    menu: "",
    cuisineType: "",
    location: {
      longitude: 0,
      latitude: 0
    },
    priceRange: "",
    createdAt: "",
    updatedAt: ""
  }
  const {restaurantId} = useParams<{ restaurantId: string }>();
  const {handleFetchRestaurant, handleFetchRestaurantReviews, handleSendReview} = useRestaurantActions();
  const [restaurantData, setRestaurantData] = useState<restaurant>(baseRestaurant);
  const [reviewArray, setReviewArray] = useState<review[]>([]);
  const [reviewButton, setReviewButton] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [sent, setSent] = useState<any>(undefined);
  const [edited, setEdited] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setComment("")
    setRating(0)
    setSent(undefined)
    setEdited(false)
    if (restaurantId !== undefined) {
      startTransition(() => {
        // Perform the async task inside startTransition
        const restaurantData = handleFetchRestaurant(restaurantId);

        restaurantData.then((data: restaurant | undefined) => {
          if (data === undefined) {
            navigate("/")
          } else
            setRestaurantData(data);
        })
        const reviewData = handleFetchRestaurantReviews(restaurantId);
        reviewData.then((data: review[] | undefined) => {
          if (data === undefined) {
            setReviewArray([])
            navigate("/")
          } else {
            setReviewArray(data)
          }

        })
      })
    } else {
      navigate("/")
    }
  }, [reviewButton, sent, edited])



  return (
    <div className="restaurant-page">
      <RestaurantHeader
          name={restaurantData.name}
        logo={sushihouse}
          rating={0}
        rank={1}
      />
      <div className="main-content">
        <ImageGallery images={restaurantImages} />
        <RestaurantDetails
            address={restaurantData.description}
            cuisineType={restaurantData.cuisineType}
        />

        <MapComponent latitude={restaurantData.location.latitude} longitude={restaurantData.location.longitude}/>

        <div className="restaurant-menu">
          <h2>Menu</h2>
          <p>{restaurantData.menu}</p>
        </div>
        <ReviewList
            reviews={reviewArray}
            setEdited={setEdited}
            restaurantId={restaurantId !== undefined ? restaurantId : ""}
        />
<button className="add-review-button" onClick={() => setReviewButton(true)}>Add Review</button>
{reviewButton && (
  <div className="add-review-form-page">
    <input
      type="text"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="review-input"
      placeholder="Write your comment here"
    />
    <input
      type="number"
      value={rating}
      max={5}
      onChange={(e) => setRating(Number(e.target.value))}
      className="review-input"
      placeholder="Rating (1-5)"
    />
    <div className="review-actions">
      <button
        className="send-button"
        onClick={() => {
          setSent(handleSendReview(restaurantId === undefined ? "" : restaurantId, rating, comment));
          setReviewButton(false);
        }}
      >
        Send
      </button>
      <button
        className="cancel-button"
        onClick={() => setReviewButton(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default RestaurantPage;
