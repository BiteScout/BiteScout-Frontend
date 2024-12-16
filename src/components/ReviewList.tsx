import Button from "../components/Button";
import "../styles/ReviewList.css";

interface Review {
  id: number;
  username: string;
  comment: string;
  likes: number;
}

interface ReviewListProps {
  reviews: Review[]; // Review tipinde bir dizi
  showAllReviewsLink: string; // Tüm yorumları görebileceğimiz bağlantı
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  showAllReviewsLink,
}) => {
  return (
    <div className="review-list">
      <h2>Top Reviews</h2>
      {reviews.map((review: Review) => (
        <div key={review.id} className="review">
          <p>
            <strong>{review.username}</strong>: {review.comment}
          </p>
          <p>Likes: {review.likes}</p>
        </div>
      ))}
      <Button text="See All Reviews" link={showAllReviewsLink} />
    </div>
  );
};

export default ReviewList;
