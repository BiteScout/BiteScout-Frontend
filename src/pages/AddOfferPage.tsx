import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/AddOfferPage.css";
import {offerRequest, useRestaurantActions} from "../services/RestaurantFunctions.tsx";

const AddOfferPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const {handleAddOfferForRestaurant} = useRestaurantActions();
  const {restaurantId} = useParams<{ restaurantId: string }>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const offerRequest:offerRequest = {
      title:title,
      description:description,
      startDate:startDate,
      endDate:endDate
    }
    if (restaurantId !== undefined) {
      const response = handleAddOfferForRestaurant(restaurantId, offerRequest);
      response.then((data) => {
        navigate(-1)
      })
    }
    else {
      navigate("/offers/" + restaurantId);
    }
  };

  const handleCancel = () => {
    navigate("/offers/"+restaurantId);
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
            <input type={"date"} value={startDate} onChange={(e) => setStartDate(e.target.value)}  />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Start Date</label>
            <input type={"date"} value={endDate} onChange={(e) => setEndDate(e.target.value)}  />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Offer
            </button>
            <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
      </form>
    </div>
);
};

export default AddOfferPage;
