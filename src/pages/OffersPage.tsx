import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/OffersPage.css";
import {offer} from "../services/RestaurantFunctions.tsx";
import {useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import restaurantPage from "./RestaurantPage.tsx";

const OffersPage = () => {


  const [offers, setOffers] = useState<offer[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedOffer, setEditedOffer] = useState<offer | null>( null);
  const navigate = useNavigate();
  const {restaurantId} = useParams<{ restaurantId: string }>();
  const [reloadKey, setReloadKey] = useState<number>(0);
  const {handleFetchOffersForRestaurant,handleUpdateOfferForRestaurant, handleDeleteOfferForRestaurant} = useRestaurantActions();
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDeleteOffer = (id: string) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      handleDeleteOfferForRestaurant(restaurantId === undefined? "" : restaurantId, id)
      setReloadKey((prev) => prev + 1);
    }
  };

  const handleEditOffer = (id: string) => {
    const offerToEdit = offers.find((offer) => offer.id === id);
    if (offerToEdit) {
      setIsEditing(id);
      setEditedOffer(offerToEdit)
    }
  };

  const handleSaveOffer = () => {
    if (editedOffer) {
      handleUpdateOfferForRestaurant(restaurantId === undefined? "" : restaurantId, isEditing === null? "": isEditing, editedOffer)
      setIsEditing(null);
      setEditedOffer(null);
      setReloadKey((prev) => prev + 1);
    }
  };

  const handleAddOffer = () => {
    navigate(`/add-offer`);
  };

  useEffect(() => {
    const fetchOffers = async () => {
      await delay(300);
      const response = await handleFetchOffersForRestaurant(restaurantId === undefined? "" : restaurantId);
      if (response !== undefined){
        setOffers(response);
      }
    }
    fetchOffers()
  }, [reloadKey]);

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
                              prev ? {...prev, title: e.target.value} : null
                          )
                      }
                  />
                  <textarea
                      className="editable-description"
                      value={editedOffer?.description || ""}
                      onChange={(e) =>
                          setEditedOffer((prev) =>
                              prev ? {...prev, description: e.target.value} : null
                          )
                      }
                  />
                  <input
                      className="editable-description"
                      type="date"
                      value={editedOffer?.startDate}
                      onChange={(e) => {
                        setEditedOffer((prev) =>
                            prev ? {...prev, startDate: e.target.value} : null)
                      }}/>
                  <input
                      className="editable-description"
                      type="date"
                      value={editedOffer?.endDate}
                      onChange={(e) => {
                        setEditedOffer((prev) =>
                            prev ? {...prev, endDate: e.target.value} : null)
                      }}/>
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
