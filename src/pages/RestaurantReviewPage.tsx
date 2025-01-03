import React, {useEffect, useReducer, useState} from "react";
import "../styles/RestaurantReviewsPage.css";
import filterIcon from "../assets/filter-icon.png";
import {review, useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {useNavigate, useParams} from "react-router-dom";
import ReviewListFull from "../components/ReviewListFull.tsx";

type ReviewState = review[];
type ReviewAction =
    | { type: "SET_REVIEWS"; payload: review[] }
    | { type: "REMOVE_LIKES"; payload: reviewsWithLikes[] };


interface reviewsWithLikes {
    id: string
    restaurantId: string
    customerId: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
    likeCount: number
}


const RestaurantReviewsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
    /*  const [reviews, setReviews] = useState<review[]>([])*/
    const [reviewsWithLikes, setReviewsWithLikes] = useState<reviewsWithLikes[]>([]);
    const {restaurantId} = useParams<{ restaurantId: string }>();
    const {handleFetchRestaurantReviews, handleSendReview, handleFetchReviewInteractions} = useRestaurantActions();
    const [reviewButton, setReviewButton] = useState<boolean>(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number>(0);
    const [sent, setSent] = useState<any>(undefined);
    const [edited, setEdited] = useState(false);
    const [reviewFetched, setReviewFetched] = useState(false);
    const navigate = useNavigate();


    const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
        switch (action.type) {
            case "SET_REVIEWS":
                return action.payload;
            case "REMOVE_LIKES":
                return action.payload.map((reviewWithLikes) => ({
                    id: reviewWithLikes.id,
                    restaurantId: reviewWithLikes.restaurantId,
                    customerId: reviewWithLikes.customerId,
                    rating: reviewWithLikes.rating,
                    comment: reviewWithLikes.comment,
                    createdAt: reviewWithLikes.createdAt,
                    updatedAt: reviewWithLikes.updatedAt,
                }));
            default:
                return state;
        }
    };

// Usage
    const [reviews, dispatch] = useReducer(reviewReducer, []);



  const handleFilter = (type: string) => {
    if (type === "newest") {
        const sortedReviews = [...reviewsWithLikes]
            .map((reviewWithLikes) => ({
                id: reviewWithLikes.id,
                restaurantId: reviewWithLikes.restaurantId,
                customerId: reviewWithLikes.customerId,
                rating: reviewWithLikes.rating,
                comment: reviewWithLikes.comment,
                createdAt: reviewWithLikes.createdAt,
                updatedAt: reviewWithLikes.updatedAt,
            })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        dispatch({type: "SET_REVIEWS", payload: sortedReviews})
    } else if (type === "oldest") {
        const sortedReviews = [...reviewsWithLikes]
            .map((reviewWithLikes) => ({
                id: reviewWithLikes.id,
                restaurantId: reviewWithLikes.restaurantId,
                customerId: reviewWithLikes.customerId,
                rating: reviewWithLikes.rating,
                comment: reviewWithLikes.comment,
                createdAt: reviewWithLikes.createdAt,
                updatedAt: reviewWithLikes.updatedAt,
            }))
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        dispatch({type: "SET_REVIEWS", payload: sortedReviews})
    } else if (type === "highest_rating") {
        const sortedReviews = [...reviewsWithLikes]
            .map((reviewWithLikes) => ({
                id: reviewWithLikes.id,
                restaurantId: reviewWithLikes.restaurantId,
                customerId: reviewWithLikes.customerId,
                rating: reviewWithLikes.rating,
                comment: reviewWithLikes.comment,
                createdAt: reviewWithLikes.createdAt,
                updatedAt: reviewWithLikes.updatedAt,
            }))
            .sort((a, b) => b.rating - a.rating)
        dispatch({type: "SET_REVIEWS", payload: sortedReviews})
    } else if (type === "lowest_rating") {
        const sortedReviews = [...reviewsWithLikes]
            .map((reviewWithLikes) => ({
                id: reviewWithLikes.id,
                restaurantId: reviewWithLikes.restaurantId,
                customerId: reviewWithLikes.customerId,
                rating: reviewWithLikes.rating,
                comment: reviewWithLikes.comment,
                createdAt: reviewWithLikes.createdAt,
                updatedAt: reviewWithLikes.updatedAt,
            }))
            .sort((a, b) => a.rating - b.rating)
        dispatch({type: "SET_REVIEWS", payload: sortedReviews})
    } else if (type === "least_likes") {
        const sortedReviews = [...reviewsWithLikes]
            .map((reviewWithLikes) => ({
                id: reviewWithLikes.id,
                restaurantId: reviewWithLikes.restaurantId,
                customerId: reviewWithLikes.customerId,
                rating: reviewWithLikes.rating,
                comment: reviewWithLikes.comment,
                createdAt: reviewWithLikes.createdAt,
                updatedAt: reviewWithLikes.updatedAt,
                likeCount: reviewWithLikes.likeCount, // Temporary field for sorting
            }))
            .sort((a, b) => a.likeCount - b.likeCount)
            .map(({likeCount, ...rest}) => rest); // Remove likeCount to match `review` type

        dispatch({type: "SET_REVIEWS", payload: sortedReviews});
    } else if (type === "most_likes") {
        const sortedReviews = [...reviewsWithLikes]
            .map((reviewWithLikes) => ({
                id: reviewWithLikes.id,
                restaurantId: reviewWithLikes.restaurantId,
                customerId: reviewWithLikes.customerId,
                rating: reviewWithLikes.rating,
                comment: reviewWithLikes.comment,
                createdAt: reviewWithLikes.createdAt,
                updatedAt: reviewWithLikes.updatedAt,
                likeCount: reviewWithLikes.likeCount, // Temporary field for sorting
            }))
            .sort((a, b) => b.likeCount - a.likeCount)
            .map(({likeCount, ...rest}) => rest); // Remove likeCount to match `review` type

        dispatch({type: "SET_REVIEWS", payload: sortedReviews});
    }
    setFilterOpen(false);
  };

    useEffect(() => {
        setFilterOpen(false);
        setComment("")
        setRating(0)
        setSent(undefined)
        setEdited(false)
        dispatch({type: "SET_REVIEWS", payload: []})
        setReviewsWithLikes([])
        const fetchReviews = async () => {
            if (restaurantId !== undefined) {
                const reviewData = await handleFetchRestaurantReviews(restaurantId);
                if (reviewData === undefined)
                    navigate("/")
                else
                    dispatch({type: "SET_REVIEWS", payload: reviewData})
                setReviewFetched(!reviewFetched);
            }
        }
        fetchReviews();


    }, [sent, edited]);

    useEffect(() => {
        const fetchReviewsWithLikes = async () => {
            if (restaurantId !== undefined) {
                const tempReviewsWithLikes = await Promise.all(
                    reviews.map(async (review: review) => {
                        const aReviewWithLike: reviewsWithLikes = {
                            id: review.id,
                            restaurantId: review.restaurantId,
                            customerId: review.customerId,
                            rating: review.rating,
                            comment: review.comment,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                            likeCount: 0
                        };
                        try {
                            const interactionData = await handleFetchReviewInteractions(review.id)
                            if (interactionData !== undefined)
                                aReviewWithLike.likeCount = interactionData.likeCount
                        } catch (err) {
                            console.log(err)
                        }
                        return aReviewWithLike
                    })
                )
                setReviewsWithLikes(tempReviewsWithLikes)

            }
        }
        fetchReviewsWithLikes()
    }, [reviewFetched]);

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
                      <img src={filterIcon} alt="Filter"/>
                  </button>
                  {filterOpen && (
                      <div className="filter-popup">
                          <p onClick={() => handleFilter("newest")}>Date: Newest</p>
                          <p onClick={() => handleFilter("oldest")}>Date: Oldest</p>
                          <p onClick={() => handleFilter("highest_rating")}>Rating: Highest</p>
                          <p onClick={() => handleFilter("lowest_rating")}>Rating: Lowest</p>
                          <p onClick={() => handleFilter("most_likes")}>Likes: Most</p>
                          <p onClick={() => handleFilter("least_likes")}>Likes: Least</p>
                      </div>
                  )}
              </div>
          </div>

          <div className="review-list">
              <ReviewListFull reviews={reviews} setEdited={setEdited}/>
          </div>
          <button className="add-review-button" onClick={() => setReviewButton(true)}>Add Review</button>
          {reviewButton && (
              <div className="add-review-form-page">
                  <form onSubmit={() => {
                      setSent(handleSendReview(restaurantId === undefined ? "" : restaurantId, rating, comment));
                      setReviewButton(false);
                  }}>
                      <input
                          type="text"
                          value={comment}
                          minLength={8}
                          required
                          onChange={(e) => setComment(e.target.value)}
                          className="review-input"
                          placeholder="Write your comment here"
                      />
                      <input
                          type="number"
                          value={rating}
                          min={0}
                          max={5}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="review-input"
                          placeholder="Rating (1-5)"
                      />
                      <div className="review-actions">
                          <button
                              className="send-button"
                              type={"submit"}
                          >
                              Send
                          </button>
                          <button
                              className="cancel-button"
                              onClick={() => setReviewButton(false)}
                          >
                              Cancel
                          </button>
                      </div>
                  </form>
              </div>)}
      </div>
  )
}
export default RestaurantReviewsPage;
