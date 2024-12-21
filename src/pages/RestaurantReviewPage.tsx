import { useState } from "react";
import "../styles/RestaurantReviewsPage.css";
import filterIcon from "../assets/filter-icon.png";

const RestaurantReviewsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "John Doe",
      rating: 5,
      comment: "Fantastic experience! Highly recommend this place.",
      likes: 15,
      dislikes: 2,
    },
    {
      id: 2,
      username: "Jane Smith",
      rating: 4,
      comment: "Great food, but service could be faster.",
      likes: 10,
      dislikes: 1,
    },
    {
      id: 3,
      username: "Alex Brown",
      rating: 3,
      comment: "Average food, but nice ambiance.",
      likes: 5,
      dislikes: 3,
    },
  ]);

  const handleFilter = (type: string) => {
    if (type === "newest") {
      setReviews((prev) => [...prev].sort((a, b) => b.id - a.id));
    } else if (type === "oldest") {
      setReviews((prev) => [...prev].sort((a, b) => a.id - b.id));
    } else if (type === "highest") {
      setReviews((prev) => [...prev].sort((a, b) => b.rating - a.rating));
    } else if (type === "lowest") {
      setReviews((prev) => [...prev].sort((a, b) => a.rating - b.rating));
    }
    setFilterOpen(false);
  };

  return (
    <div className="restaurant-reviews-page">
      <div className="sub-header">
        <h1 className="title">Restaurant Reviews</h1>
        <div className="filter-container">
          {" "}
          {/* Buton ve pop-up için parent */}
          <button
            className="filter-button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <img src={filterIcon} alt="Filter" />
          </button>
          {filterOpen && (
            <div className="filter-popup">
              <p onClick={() => handleFilter("newest")}>Date: Newest</p>
              <p onClick={() => handleFilter("oldest")}>Date: Oldest</p>
              <p onClick={() => handleFilter("highest")}>Rating: Highest</p>
              <p onClick={() => handleFilter("lowest")}>Rating: Lowest</p>
            </div>
          )}
        </div>
      </div>

      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-content">
              <h3>{review.username}</h3>
              <p>⭐ {review.rating}/5</p>
              <p>{review.comment}</p>
              <div className="review-actions">
                <button className="like-button">👍 {review.likes}</button>
                <button className="dislike-button">👎 {review.dislikes}</button>
                <button className="reply-button">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantReviewsPage;
