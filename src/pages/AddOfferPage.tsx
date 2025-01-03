import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddOfferPage.css";
import { offerRequest, useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddOfferPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const { handleAddOfferForRestaurant } = useRestaurantActions();
  const { restaurantId } = useParams<{ restaurantId: string }>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const offerRequest: offerRequest = {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };

    // SweetAlert2 confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        if (restaurantId !== undefined) {
          const response = handleAddOfferForRestaurant(restaurantId, offerRequest);
          response.then(() => {
            Swal.fire("Added!", "Your offer has been added.", "success");
            navigate(-1); // Go back to the offers page after successful addition
          });
        } else {
          navigate("/offers/" + restaurantId);
        }
      }
    });
  };

  const handleCancel = () => {
    navigate("/offers/" + restaurantId);
  };

  return (
    <div className="add-offer-page">
      <h1 className="page-title">Add New Offer</h1>
      <form className="offer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Offer Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Add Offer
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOfferPage;
