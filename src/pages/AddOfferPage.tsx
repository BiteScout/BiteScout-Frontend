import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddOfferPage.css";

const AddOfferPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newOffer = {
      id: Date.now(), // Unique ID for the new offer
      title,
      description,
    };
    console.log("New Offer Added:", newOffer);
    // Here, you would send newOffer to the backend or update the state in the parent component
    navigate("/offers");
  };

  const handleCancel = () => {
    navigate("/offers");
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
