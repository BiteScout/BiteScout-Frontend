import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CustomerOffersPage.css";

type Offer = {
  id: number;
  title: string;
  description: string;
};

type Restaurant = {
  id: number;
  name: string;
  offers: Offer[];
};

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Sushi House",
    offers: [
      {
        id: 1,
        title: "Discount on Sushi",
        description: "Get 20% off on all sushi orders!",
      },
      {
        id: 2,
        title: "Happy Hour",
        description: "Buy one drink, get one free from 5-7 PM!",
      },
    ],
  },
  {
    id: 2,
    name: "Pasta Paradise",
    offers: [
      {
        id: 3,
        title: "Free Appetizer",
        description: "Get a free appetizer with your main course!",
      },
    ],
  },
];

const CustomerOffersPage = () => {
  const navigate = useNavigate();

  // Sabit restoran seçimi
  const restaurant = mockRestaurants[0]; // İlk restoran (örnek)

  return (
    <div className="customer-offers-page">
      <h1 className="page-title">Offers for {restaurant.name}</h1>
      <div className="offer-list">
        {restaurant.offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <h2>{offer.title}</h2>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate("/restaurants")}>
        Back
      </button>
    </div>
  );
};

export default CustomerOffersPage;
