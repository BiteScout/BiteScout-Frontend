import "../styles/RestaurantPage.css";
import defaultLogo from "../assets/no-image-available.png";
import image1 from "../assets/no-image-available.png";
import image2 from "../assets/no-image-available.png";
import image3 from "../assets/no-image-available.png";


import RestaurantHeader from "../components/RestaurantHeader";
import ImageGallery from "../components/ImageGallery";
import RestaurantDetails from "../components/RestaurantDetails";
import ReviewList from "../components/ReviewList";
import { restaurant, review, useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import React, { startTransition, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MapComponent from "../components/MapComponent.tsx";
import QrCodeComponent from "../components/QRCodeComponent.tsx";
import OfferList from "../components/OfferList.tsx";

import { useSelector } from "react-redux";
import { RootState } from "../store.tsx";
import { useUserActions } from "../services/UserFunctions.tsx";
import { useReservationActions } from "../services/ReservationFunctions.tsx";
import Swal from "sweetalert2";

const RestaurantPage = () => {
  const baseRestaurant: restaurant = {
    id: "",
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
  };
  
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { handleFetchRestaurant, handleFetchRestaurantReviews, handleSendReview, handleFetchRanking,handleCalculateRating, handleGetRestaurantPictures } = useRestaurantActions();
  const { handleMakeReservation } = useReservationActions();
  const [restaurantData, setRestaurantData] = useState<restaurant>(baseRestaurant);
  const [reviewArray, setReviewArray] = useState<review[]>([]);
  const [reviewButton, setReviewButton] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [sent, setSent] = useState<any>(undefined);
  const [edited, setEdited] = useState<number>(0);
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.userId);
  const userRole = useSelector((state: RootState) => state.role);
  const [dateTime, setDateTime] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toggleReservation, setToggleReservation] = useState<boolean>(false);
  const { handleFetchFavorites, handleAddFavorite, handleRemoveFavorite } = useUserActions();
  const [rank, setRank] = useState<number>(0);
  const [tierRanking, setTierRanking] = useState<string>("");
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const [restaurantImages, setRestaurantImages] = useState<string[]>([]);
  

  useEffect(() => {
    if (userId) {
      handleFetchFavorites(userId).then((favs) => {
        if (favs) setFavorites(favs.map((fav) => fav.restaurantId));
      });
    }
  }, [userId, restaurantId]);

  useEffect(() => {
    setComment("");
    setRating(0);
    setSent(undefined);
    if (restaurantId !== undefined) {
      startTransition(() => {


        const restaurantData = handleFetchRestaurant(restaurantId);
        restaurantData.then((data: restaurant | undefined) => {
          if (data === undefined) {
            navigate("/");
          } else {
            setRestaurantData(data);
          }
        });

        const fetchReviewData = async () => {
          await delay(100)
          const reviewData = await handleFetchRestaurantReviews(restaurantId);
            if (reviewData === undefined) {
              setReviewArray([]);
            } else {
              setReviewArray(reviewData);
            }
        }
        fetchReviewData()

        const rankData = handleFetchRanking(restaurantId);
        rankData.then((data) => {
          if (data !== undefined){

            setRating(data.averageRating)
            setTierRanking(data.tierRanking)
          }
        })
      });
    } else {
      navigate("/");
    }
  }, [reviewButton, sent, edited]);


  // Second useEffect for fetching images
useEffect(() => {
  if (restaurantId) {
    handleGetRestaurantPictures(restaurantId).then((fetchedImages) => {
      if (fetchedImages) {
        setRestaurantImages(fetchedImages);  // Update state with fetched images
      } else {
        setRestaurantImages([image1, image2, image3]);  // Fallback to mock images
      }
    });
  }
}, [restaurantId]);

  const isFavorite = favorites.includes(restaurantId || "");

  const toggleFavorite = async () => {
    if (!userId || !restaurantId) return;
    if (isFavorite) {
      await handleRemoveFavorite(userId, restaurantId);
      setFavorites(favorites.filter((fav) => fav !== restaurantId));
    } else {
      await handleAddFavorite(userId, restaurantId);
      setFavorites([...favorites, restaurantId]);
    }
  };

  const handleSubmitReservation = () => {
    // Check if dateTime is selected
    if (!dateTime) {
      Swal.fire({
        title: "Error",
        text: "Please select a date and time for the reservation.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Prevent form submission
    }
  
    // Get the current date and time
    const currentDateTime = new Date();
    const selectedDateTime = new Date(dateTime);
  
    // Check if the selected date is in the past
    if (selectedDateTime < currentDateTime) {
      Swal.fire({
        title: "Invalid Date",
        text: "You cannot make a reservation for a past date and time.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Prevent form submission
    }
  
    // Display SweetAlert2 confirmation dialog if date is valid
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit your reservation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with reservation if confirmed
        handleMakeReservation(restaurantId === undefined ? "" : restaurantId, dateTime);
        setToggleReservation(!toggleReservation);
        Swal.fire("Submitted!", "Your reservation has been submitted.", "success");
      } else {
        Swal.fire("Cancelled", "Your reservation was not submitted.", "error");
      }
    });
  };
  
  

  return (
    <div className="restaurant-page">
      <RestaurantHeader name={restaurantData.name} logo={restaurantImages[0] || defaultLogo} rating={rating} rank={tierRanking} />

      <button
        className={`favorite-button ${isFavorite ? "favorited" : ""}`}
        onClick={toggleFavorite}
        aria-pressed={isFavorite}
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.35l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
      </button>

      <div className="main-content">
        <ImageGallery images={restaurantImages.slice(1)} />
        <RestaurantDetails address={restaurantData.description} cuisineType={restaurantData.cuisineType} />

        {userId === restaurantData.ownerId && (
          <button
            className="add-offer-button2"
            style={{ width: "auto" }}
            onClick={() => navigate("/updateRestaurantPictures/" + restaurantId)}
          >
          Update Restaurant Pictures
          </button>
        )}

          <button className={"edit-button"} onClick={() => { setToggleReservation(!toggleReservation); }}>
            Make Reservation
          </button>

        {toggleReservation ? (
            <div className={"input-group"}>
              <input  type={"datetime-local"} value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
              <button className="submit-reservation-btn" style={{width:"30vh", alignSelf:"flex-end"}} onClick={handleSubmitReservation}>Submit</button>
            </div>): null}
        <OfferList restaurantId={restaurantId === undefined? "": restaurantId} />

        <div className="map-component">
          <MapComponent latitude={restaurantData.location.latitude} longitude={restaurantData.location.longitude} />
        </div>

        <div className="restaurant-menu">
          <h2>Menu</h2>
          <a href={restaurantData.menu} target="_blank" rel="noreferrer">
          <QrCodeComponent link={restaurantData.menu} />
          </a>
        </div>

        <ReviewList
            reviews={reviewArray}
            setEdited={setEdited}
            restaurantId={restaurantId !== undefined ? restaurantId : ""}
        />
<button className="add-review-button" onClick={() => setReviewButton(true)}>Add Review</button>
{reviewButton && (
  <div className="add-review-form-page">
    <form onSubmit={() => {setSent(handleSendReview(restaurantId === undefined ? "" : restaurantId, rating, comment));
      setReviewButton(false); const calculateRating = handleCalculateRating();}}>
    <input
      type="text"
      value={comment}
      minLength={8}
      required
      onChange={(e) => setComment(e.target.value)}
      className="review-input"
      placeholder="Write your comment here"
    />
    <input
      type="number"
      value={rating}
      min={0}
      max={5}
      onChange={(e) => setRating(Number(e.target.value))}
      className="review-input"
      placeholder="Rating (1-5)"
    />
    <div className="review-actions">
      <button
        className="send-button"
        type={"submit"}
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
    </form>
  </div>
)}

      </div>
    </div>
  );
};

export default RestaurantPage;
