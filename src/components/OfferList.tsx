import React, { useEffect, useState } from "react";
import { offer, restaurant } from "../services/RestaurantFunctions.tsx";
import "../styles/OffersPage.css";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store.tsx";
import { useNavigate } from "react-router-dom";

interface OfferListProps {
  restaurantId: string;
}

const OfferList: React.FC<OfferListProps> = ({ restaurantId }) => {
  const [offers, setOffers] = useState<offer[]>([]);
  const { handleFetchOffersForRestaurant, handleFetchRestaurant } = useRestaurantActions();
    const navigate = useNavigate();

  useEffect(() => {
    const offers = handleFetchOffersForRestaurant(restaurantId);
    offers.then((data) => {
      if (data !== undefined) setOffers(data);
    });
  }, [restaurantId]);

  const userId = useSelector((state: RootState) => state.userId);
  const [restaurantData, setRestaurantData] = useState<restaurant | undefined>(undefined);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const data = await handleFetchRestaurant(restaurantId);
      setRestaurantData(data);
    };

    fetchRestaurantData();
  }, [restaurantId, handleFetchRestaurant]);

  if (!restaurantData) {
    return <div>Loading...</div>; // Show loading until restaurant data is available
  }

  return (
    <div className="restaurant-details">
      <h1>Special Offers: </h1>
      <div className="offer-list">
        {offers.slice(0, offers.length >= 5 ? 5 : offers.length).map((offer) => (
          <div key={offer.id} className="offer-card">
            <>
              <h2>{offer.title}</h2>
              <p>{offer.description}</p>
              <p><b>From: </b> {offer.startDate} </p>
              <p><b>Until: </b> {offer.endDate}</p>
              <p></p>
            </>
          </div>
        ))}
        {userId === restaurantData.ownerId ? (
          <button
            className={"add-offer-button2"}
            style={{ width: "auto" }}
            onClick={() => navigate("/addOffer/" + restaurantId)}
          >
            +
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default OfferList;
