import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OffersPage.css";

type Offer = {
  id: number;
  title: string;
  description: string;
};

const mockOffers: Offer[] = [
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
];

const OffersPage = () => {
  const [offers, setOffers] = useState(mockOffers);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedOffer, setEditedOffer] = useState<Offer | null>(null);
  const navigate = useNavigate();

  const handleDeleteOffer = (id: number) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      setOffers((prev) => prev.filter((offer) => offer.id !== id));
    }
  };

  const handleEditOffer = (id: number) => {
    const offerToEdit = offers.find((offer) => offer.id === id);
    if (offerToEdit) {
      setIsEditing(id);
      setEditedOffer({ ...offerToEdit });
    }
  };

  const handleSaveOffer = () => {
    if (editedOffer) {
      setOffers((prev) =>
        prev.map((offer) => (offer.id === editedOffer.id ? editedOffer : offer))
      );
      setIsEditing(null);
      setEditedOffer(null);
    }
  };

  const handleAddOffer = () => {
    navigate(`/add-offer`);
  };

  return (
    <div className="offers-page">
      <h1 className="page-title">Special Offers</h1>
      <button className="add-offer-button" onClick={handleAddOffer}>
        Add New Offer
      </button>
      <div className="offer-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            {isEditing === offer.id ? (
              <>
                <input
                  className="editable-title"
                  type="text"
                  value={editedOffer?.title || ""}
                  onChange={(e) =>
                    setEditedOffer((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
                <textarea
                  className="editable-description"
                  value={editedOffer?.description || ""}
                  onChange={(e) =>
                    setEditedOffer((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                />
                <button className="save-button" onClick={handleSaveOffer}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <div className="offer-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditOffer(offer.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteOffer(offer.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
