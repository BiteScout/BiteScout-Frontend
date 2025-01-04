import React, { useEffect, useState } from "react";
import { offer, restaurant } from "../services/RestaurantFunctions.tsx";
import "../styles/OffersPage.css";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store.tsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2 for confirmation alerts

interface OfferListProps {
  restaurantId: string;
}

const OfferList: React.FC<OfferListProps> = ({ restaurantId }) => {
  const [offers, setOffers] = useState<offer[]>([]); 
  const { handleFetchOffersForRestaurant, handleFetchRestaurant, handleDeleteOfferForRestaurant, handleUpdateOfferForRestaurant } = useRestaurantActions();
  const navigate = useNavigate();

  const [editedOffer, setEditedOffer] = useState<offer | null>(null); // State for the edited offer
  const [isEditing, setIsEditing] = useState<string | null>(null); // Track which offer is being edited
  
  useEffect(() => {
    const fetchOffers = async () => {
      const data = await handleFetchOffersForRestaurant(restaurantId);
      if (data !== undefined) setOffers(data);
    };
    fetchOffers();
  }, [restaurantId]);

  const userId = useSelector((state: RootState) => state.userId);
  const [restaurantData, setRestaurantData] = useState<restaurant | undefined>(undefined);
  const userRole = useSelector((state: RootState) => state.role);
  useEffect(() => {
    const fetchRestaurantData = async () => {
      const data = await handleFetchRestaurant(restaurantId);
      setRestaurantData(data);
    };

    fetchRestaurantData();
  }, [restaurantId, handleFetchRestaurant]);

  const showDeleteConfirmation = (id: string) => {
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
        handleDeleteOfferForRestaurant(restaurantId, id)
          .then(() => {
            // Immediately update local state to remove the deleted offer
            setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== id));
            Swal.fire("Deleted!", "The offer has been deleted.", "success");
          })
          .catch((error) => {
            // Handle error if the deletion fails
            Swal.fire("Error!", "There was an issue deleting the offer.", "error");
          });
      }
    });
  };

  const handleEditOffer = (offerId: string) => {
    const offerToEdit = offers.find((offer) => offer.id === offerId);
    if (offerToEdit) {
      setIsEditing(offerId); // Start editing the selected offer
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
            restaurantId,
            editedOffer.id,
            editedOffer // Pass the updated offer
          )
            .then(() => {
              // Directly update the local offers state after successful update
              setOffers((prevOffers) =>
                prevOffers.map((offer) =>
                  offer.id === editedOffer.id ? editedOffer : offer
                )
              );
              setIsEditing(null);
              setEditedOffer(null);
              Swal.fire("Saved!", "Your offer has been updated.", "success");
            })
            .catch((error) => {
              // Handle error if the update fails
              Swal.fire("Error!", "There was an issue updating the offer.", "error");
            });
        }
      });
    }
  };

  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="restaurant-details">
      <h1>Special Offers: </h1>
      <div className="offer-list">
        {offers.slice(0, offers.length >= 5 ? 5 : offers.length).map((offer) => (
          <div key={offer.id} className="offer-card">
            {isEditing === offer.id ? (
              // Edit Mode: Show editable fields
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
                  value={editedOffer?.startDate || ""}
                  onChange={(e) =>
                    setEditedOffer((prev) => (prev ? { ...prev, startDate: e.target.value } : null))
                  }
                />
                <input
                  className="editable-description"
                  type="date"
                  value={editedOffer?.endDate || ""}
                  onChange={(e) =>
                    setEditedOffer((prev) => (prev ? { ...prev, endDate: e.target.value } : null))
                  }
                />
                <button className="save-button" onClick={handleSaveOffer}>
                  Save
                </button>
              </>
            ) : (
              // Normal View Mode: Show offer details
              <>
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <p><b>From: </b> {offer.startDate}</p>
                <p><b>Until: </b> {offer.endDate}</p>

                {/* Edit and Delete buttons */}
                {(userId === restaurantData.ownerId || userRole === "ROLE_ADMIN") && (
                  <div className="offer-actions">
                    <button
                      className="edit-button-offers"
                      onClick={() => handleEditOffer(offer.id)}
                    >
                      <span className="edit-icon-offers"></span>
                    </button>
                    <button
                      className="delete-button2"
                      onClick={() => showDeleteConfirmation(offer.id)}
                    >
                      <span className="delete-icon" ></span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {(userId === restaurantData.ownerId || userRole === "ROLE_ADMIN") && (
          <button
            className="add-offer-button2"
            style={{ width: "auto" }}
            onClick={() => navigate("/addOffer/" + restaurantId)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default OfferList;
