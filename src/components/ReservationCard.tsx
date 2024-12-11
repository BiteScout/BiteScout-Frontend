import React from "react";
import "../styles/ReservationCard.css";

interface ReservationCardProps {
  reservation: {
    restaurant: string;
    date: string;
    time: string;
    status: string;
  };
  showCancelButton?: boolean; // Yeni prop eklendi
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  showCancelButton = true,
}) => {
  const handleCancel = () => {
    alert(`Reservation at ${reservation.restaurant} has been cancelled.`);
  };

  return (
    <div className="reservation-card">
      <div className="reservation-info">
        <span className="reservation-text">{`You made a reservation for ${reservation.date} at ${reservation.time}`}</span>
        <span className="restaurant">{reservation.restaurant}</span>
        <span className={`status ${reservation.status.toLowerCase()}`}>
          {reservation.status}
        </span>
      </div>
      {showCancelButton && (
        <button className="cancel-button" onClick={handleCancel}>
          Cancel Reservation
        </button>
      )}
    </div>
  );
};

export default ReservationCard;
