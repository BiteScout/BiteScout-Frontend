import "../styles/ReviewList.css";
import {useUserActions} from "../services/UserFunctions.tsx";
import {useEffect, useState} from "react";
import {review, reviewReply, useRestaurantActions} from "../services/RestaurantFunctions.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";


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
    setEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewListFull: React.FC<ReviewListProps> = ({
                                                       reviews,
                                                       setEdited,
                                                   }) => {
    const {handleFetchUser} = useUserActions()
    const {
        handleFetchReviewInteractions,
        handleEditReview,
        handleSendingReply,
        handleSendingInteraction
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
                                                interactingUserId: replyUserData !== undefined ? replyUserData.username : "Unknown User",
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
            <h2>All Reviews</h2>
            {realReviews.map((review: realReview, index: number) => (
                <div key={index} className="review">
                    <p>
                        Rating: {review.rating}
                    </p>
                    <p>
                        <strong>{review.customerName}</strong>: {review.comment}
                    </p>
                    <p> {"creationDate: "} {review.createdAt} </p>
                    {review.updatedAt !== review.createdAt ? <p>{"updateDate: "}{review.updatedAt}</p> : null}
                    <p>Likes: {review.likeCount}</p>
                    <button onClick={() => {
                        handleSendingInteraction(review.id, "LIKE")
                    }}> Like
                    </button>
                    <button onClick={() => {
                        handleSendingInteraction(review.id, "DISLIKE")
                    }}> Dislike
                    </button>
                    <button onClick={() => {
                        setReplyCommentOn((prevArray) => prevArray.map(() => false))
                        setReplyCommentOn((prevArray) => {
                            const newArray = [...prevArray];
                            newArray[index] = true;
                            return newArray;
                        });
                        setEditOrReply(false)
                    }}>Reply
                    </button>
                    {review.customerName === userName ? <button onClick={() => {
                        setEditReviewOn((prevArray) => prevArray.map(() => false))
                        setEditReviewOn((prevArray) => {
                            const newArray = [...prevArray];
                            newArray[index] = true;
                            return newArray;
                        });
                        setEditOrReply(true)
                    }}>Edit</button> : null}


                    {replyCommentOn[index] ?
                        <div>
                            <label>
                                Comment:
                                <input type={"text"} value={replyComment}
                                       onChange={(e) => setReplyComment(e.target.value)}/>
                            </label>
                            <button onClick={() => {
                                setReplyResponse(handleSendingReply(review.id, replyComment));
                            }}>Send Reply
                            </button>


                        </div>
                        : null}


                    {editReviewOn[index] ? <div>
                        <input type={"text"} value={editComment} onChange={(e) => setEditComment(e.target.value)}/>
                        <input type={"number"} value={editRating}
                               onChange={(e) => setEditRating(Number(e.target.value))}/>
                        <button onClick={() => {
                            handleEditReview(review.id, editRating, editComment);
                            setEdited(true)
                        }}>Send
                        </button>
                    </div> : null}
                    {review.replies.map((reply: reviewReply, replyIndex: number) => (
                        <div key={replyIndex} className="review" style={{marginLeft: "50px"}}>
                            <p>
                                <strong>{reply.interactingUserId}</strong>: {reply.replyText}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ReviewListFull;
