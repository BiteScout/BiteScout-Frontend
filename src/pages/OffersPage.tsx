import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OffersPage.css";
import { offer } from "../services/RestaurantFunctions.tsx";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import Swal from "sweetalert2"; // Import SweetAlert2

const OffersPage = () => {
  const [offers, setOffers] = useState<offer[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedOffer, setEditedOffer] = useState<offer | null>(null);
  const navigate = useNavigate();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [reloadKey, setReloadKey] = useState<number>(0);
  const { handleFetchOffersForRestaurant, handleUpdateOfferForRestaurant, handleDeleteOfferForRestaurant } =
    useRestaurantActions();
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDeleteOffer = (id: string) => {
    handleDeleteOfferForRestaurant(restaurantId === undefined ? "" : restaurantId, id);
    setReloadKey((prev) => prev + 1);
  };

  const handleEditOffer = (id: string) => {
    const offerToEdit = offers.find((offer) => offer.id === id);
    if (offerToEdit) {
      setIsEditing(id);
      setEditedOffer(offerToEdit);
    }
  };

  const handleSaveOffer = () => {
    if (editedOffer) {
      // Ensure end date is not before start date
      if (editedOffer.startDate && editedOffer.endDate && new Date(editedOffer.endDate) < new Date(editedOffer.startDate)) {
        Swal.fire("Invalid Date", "End date cannot be before start date.", "warning");
        return; // Prevent saving if the end date is before the start date
      }

      // SweetAlert2 confirmation for saving the offer
      Swal.fire({
        title: "Confirm to Save",
        text: "Are you sure you want to save the changes to this offer?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, save it!",
        cancelButtonText: "No, cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          handleUpdateOfferForRestaurant(
            restaurantId === undefined ? "" : restaurantId,
            isEditing === null ? "" : isEditing,
            editedOffer
          );
          setIsEditing(null);
          setEditedOffer(null);
          setReloadKey((prev) => prev + 1);
          Swal.fire("Saved!", "Your offer has been updated.", "success");
        }
      });
    }
  };

  const handleAddOffer = () => {
    navigate(`/addOffer/${restaurantId}`);
  };

  const showDeleteConfirmation = (id: string) => {
    // SweetAlert2 confirmation for deleting the offer
    Swal.fire({
      title: "Confirm to Delete",
      text: "Are you sure you want to delete this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteOffer(id);
        Swal.fire("Deleted!", "The offer has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const fetchOffers = async () => {
      await delay(100);
      const response = await handleFetchOffersForRestaurant(restaurantId === undefined ? "" : restaurantId);
      if (response !== undefined) {
        setOffers(response);
      }
    };
    fetchOffers();
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
                    setEditedOffer((prev) => (prev ? { ...prev, title: e.target.value } : null))
                  }
                />
                <textarea
                  className="editable-description"
                  value={editedOffer?.description || ""}
                  onChange={(e) =>
                    setEditedOffer((prev) => (prev ? { ...prev, description: e.target.value } : null))
                  }
                />
                <input
                  className="editable-description"
                  type="date"
                  value={editedOffer?.startDate}
                  onChange={(e) => {
                    setEditedOffer((prev) =>
                      prev ? { ...prev, startDate: e.target.value } : null
                    );
                  }}
                />
                <input
                  className="editable-description"
                  type="date"
                  value={editedOffer?.endDate}
                  onChange={(e) => {
                    setEditedOffer((prev) =>
                      prev ? { ...prev, endDate: e.target.value } : null
                    );
                  }}
                />
                <button className="save-button" onClick={handleSaveOffer}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <p><b>From: </b> {offer.startDate} </p>
                <p><b>Until: </b> {offer.endDate}</p>
                <div className="offer-actions">
                  <button className="edit-button-offers" onClick={() => handleEditOffer(offer.id)}>
                    <span className="edit-icon-offers"></span>
                  </button>
                  <button
                    className="delete-button2"
                    onClick={() => showDeleteConfirmation(offer.id)}
                  >
                    <span className="delete-icon"></span>
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
