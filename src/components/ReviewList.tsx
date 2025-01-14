import "../styles/ReviewList.css";
import {useUserActions} from "../services/UserFunctions.tsx";
import {useEffect, useState} from "react";
import {review, reviewReply, useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {useNavigate} from "react-router-dom";
import {Root} from "react-dom/client";


interface realReview {
    id: string
    restaurantId: string
    customerName: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
    likeCount: number
    replies: reviewReply[]
}


interface ReviewListProps {
    reviews: review[] | undefined; // Review tipinde bir dizi
    setEdited: React.Dispatch<React.SetStateAction<number>>;
    restaurantId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
                                                   setEdited,
                                                   restaurantId
}) => {
    const userId = useSelector((state:RootState) => state.userId)
    const {handleFetchUser} = useUserActions()
    const {
        handleFetchReviewInteractions,
        handleEditReview,
        handleSendingReply,
        handleSendingInteraction,
        handleDeleteReview,
        handleDeleteReply
    } = useRestaurantActions()
    const [realReviews, setRealReviews] = useState<realReview[]>([])
    const [editReviewOn, setEditReviewOn] = useState<boolean[]>([]);
    const MAX_EDITREVIEWONLENGTH = reviews !== undefined ? reviews.length : 0;
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(0);
    const [editOrReply, setEditOrReply] = useState<boolean>(false);

    const [replyCommentOn, setReplyCommentOn] = useState<boolean[]>([]);
    const MAX_REPLYCOMMENTONLENGTH = reviews !== undefined ? reviews.length : 0;
    const [replyComment, setReplyComment] = useState("");
    const [replyRating, setReplyRating] = useState(0);
    const [replyResponse, setReplyResponse] = useState<any>(undefined)
    const navigate = useNavigate();
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const userName = useSelector((state: RootState) => state.name)
    /*const [replies, setReplies] = useState<reviewReply[]>([])*/

    const addNewReplyCommentOn = () => {
        setReplyCommentOn((prevArray) => {
            if (prevArray.length >= MAX_REPLYCOMMENTONLENGTH) {
                return prevArray;
            }
            return [...prevArray, false];
        })
    }

    const addNewEditReviewOn = () => {
        setEditReviewOn((prevArray) => {
            if (prevArray.length >= MAX_EDITREVIEWONLENGTH) {
                return prevArray;
            }
            return [...prevArray, false];
        })
    }

    const resetComments = () => {
        setEditComment("")
        setEditRating(0)
        setReplyComment("")
    }


    useEffect(() => {
        resetComments()

        const fetchRealReviews = async () => {
            if (reviews !== undefined) {
                await delay(300);
                const updatedReviews = await Promise.all(
                    reviews.map(async (review: review) => {
                        const realReview: realReview = {
                            id: review.id,
                            restaurantId: review.restaurantId,
                            customerName: "",
                            rating: review.rating,
                            comment: review.comment,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                            likeCount: 0,
                            replies: [],
                        };

                        // Fetch customer username
                        try {
                            const userData = await handleFetchUser(review.customerId);
                            if (userData !== undefined)
                                realReview.customerName = userData.username || "Unknown User";
                        } catch (error) {
                            console.error(`Error fetching username for customer ${review.customerId}:`, error);
                        }

                        // Fetch review interactions (likes and replies)
                        try {
                            const reviewReplyData = await handleFetchReviewInteractions(review.id);
                            if (reviewReplyData !== undefined) {
                                realReview.likeCount = reviewReplyData.likeCount;
                                realReview.replies = await Promise.all(
                                    reviewReplyData.replies.map(async (reply: reviewReply) => {
                                        try {
                                            const replyUserData = await handleFetchUser(reply.interactingUserId);
                                            return {
                                                ...reply,
                                                interactingUserName: replyUserData !== undefined ? replyUserData.username : "Unknown User",
                                            };
                                        } catch (error) {
                                            console.error(`Error fetching username for reply ${reply.id}:`, error);
                                            return reply; // Fallback to original reply if fetching username fails
                                        }
                                    })
                                );
                            }
                        } catch (error) {
                            console.error(`Error fetching review interactions for review ${review.id}:`, error);
                        }
                        setReplyCommentOn((prevArray) => prevArray.map(() => false))
                        setEditReviewOn((prevArray) => prevArray.map(() => false))
                        addNewEditReviewOn()
                        addNewReplyCommentOn()

                        return realReview;
                    })
                );
                setReplyResponse(undefined)
                setRealReviews(updatedReviews);
            }
        };

        fetchRealReviews().catch((error) =>
            console.error("Error fetching reviews:", error)
        );
    }, [reviews, replyResponse]);

    useEffect(() => {
        resetComments()
        if (!editOrReply) {
            setEditReviewOn((prevArray) => prevArray.map(() => false))
        } else {
            setReplyCommentOn((prevArray) => prevArray.map(() => false))
        }
    }, [editOrReply]);


  return (
    <div className="review-list">
      <h2>Top Reviews</h2>
        <button onClick={() => {
            navigate("/restaurantReviews/" + restaurantId)
        }}>See All Reviews
        </button>
        {realReviews.slice(0, realReviews.length < 5 ? realReviews.length : 5).map((review: realReview, index: number) => (
            <div key={index} className="review">
                <p>
                    Rating: {review.rating}
                </p>
          <p>
              <strong>{review.customerName === ""? "Unknown User": review.customerName}</strong>: {review.comment}
          </p>
                <p> {"creationDate: "} {` ${new Date(review.createdAt).getDate()}/${
                    new Date(review.createdAt).getMonth() + 1
                }/${new Date(review.createdAt).getFullYear()} at ${new Date(
                    review.createdAt
                ).getHours()}:${new Date(review.createdAt).getMinutes()}`} </p>
                {review.updatedAt !== review.createdAt ? <p>{"updateDate: "}{` ${new Date(review.updatedAt).getDate()}/${
                    new Date(review.updatedAt).getMonth() + 1
                }/${new Date(review.updatedAt).getFullYear()} at ${new Date(
                    review.updatedAt
                ).getHours()}:${new Date(review.updatedAt).getMinutes()}`}</p> : null}
                <p>Upvotes: {review.likeCount}</p>
                <button className="like-button" onClick={() => {
                    handleSendingInteraction(review.id, "LIKE")
                    setEdited((prev) => prev + 1)
                }}> Like
                </button>
                <button className="dislike-button" onClick={() => {
                    handleSendingInteraction(review.id, "DISLIKE")
                    setEdited((prev) => prev + 1)
                }}> Dislike
                </button>
                <button className="reply-button" onClick={() => {
                    setReplyCommentOn((prevArray) => prevArray.map(() => false))
                    setReplyCommentOn((prevArray) => {
                        const newArray = [...prevArray];
                        newArray[index] = true;
                        return newArray;
                    });
                    setEditOrReply(false)
                }}>Reply
                </button>
                {review.customerName === userName ? <button className="edit-button" onClick={() => {
                    setEditReviewOn((prevArray) => prevArray.map(() => false))
                    setEditReviewOn((prevArray) => {
                        const newArray = [...prevArray];
                        newArray[index] = true;
                        return newArray;
                    });
                    setEditOrReply(true)
                }}>Edit</button> : null}
                {review.customerName === userName ? <button className="delete-button" onClick={() => {
                    handleDeleteReview(review.id)
                    setEdited((prev) => prev + 1)
                }}>Delete</button> : null}


                {replyCommentOn[index] ?
                    <div>
                        <form onSubmit={() => {setReplyResponse(handleSendingReply(review.id, replyComment));}}>
                            <label>
                                Comment:
                                <input type={"text"} minLength={8} value={replyComment} required
                                       onChange={(e) => setReplyComment(e.target.value)}/>
                            </label>
                            <button type={"submit"}>Send Reply
                            </button>
                        </form>


                    </div>
                    : null}


                {editReviewOn[index] ? <div>
                    <form onSubmit={() => {
                        handleEditReview(review.id, editRating, editComment);
                        setEdited((prev) => prev + 1)
                    }}>
                        <input type={"text"} minLength={8} required value={editComment}
                               onChange={(e) => setEditComment(e.target.value)}/>
                        <input type={"number"} min={0} max={5} required value={editRating}
                               onChange={(e) => setEditRating(Number(e.target.value))}/>
                        <button type={"submit"}>
                            Send
                        </button>
                    </form>
                </div> : null}
                {review.replies.slice(0, review.replies.length < 5 ? review.replies.length : 5).map((reply: reviewReply, replyIndex: number) => (
                    <div key={replyIndex} className="review" style={{marginLeft: "50px"}}>
                        <p>
                            <strong>{reply.interactingUserName === ""? "Unknown User": reply.interactingUserName}</strong>: {reply.replyText}
                        </p>
                        {userId === reply.interactingUserId ? (<button onClick={() => {handleDeleteReply(reply.id); setEdited((prev) => prev + 1)}}>Delete</button>) : null}
                        {/*{reply.interactingUserId === userName ? <button>Edit</button> : null}*/}
                    </div>
                ))}
            </div>
        ))}
    </div>
  );
};

export default ReviewList;
