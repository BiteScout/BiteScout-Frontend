import React, {useEffect, useState} from "react";
import "../styles/ReservationCard.css";
import {Reservation} from "../services/ReservationFunctions.tsx";
import {restaurant, useRestaurantActions} from "../services/RestaurantFunctions.tsx";

interface ReservationCardProps {
    reservation: Reservation;
    showCancelButton?: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
                                                             reservation,
                                                             showCancelButton = true,
                                                         }) => {
    const {handleFetchRestaurant} = useRestaurantActions();

    // Local state to store the restaurant name
    const [restaurantName, setRestaurantName] = useState<string>("");

  const handleCancel = () => {
      alert(`Reservation at ${restaurantName} has been cancelled.`);
  };

    useEffect(() => {
        const fetchRestaurantName = async () => {
            try {
                const restaurantData: restaurant | undefined = await handleFetchRestaurant(
                    reservation.restaurantId
                );
                if (restaurantData) {
                    setRestaurantName(restaurantData.name);
                } else {
                    setRestaurantName("Couldn't find restaurant");
                }
            } catch (err) {
                console.error("Error fetching restaurant:", err);
                setRestaurantName("Couldn't fetch restaurant");
            }
        };

        fetchRestaurantName();
    }, [reservation.restaurantId]);

  return (
      <div className="reservation-card">
          <div className="reservation-info">
        <span className="reservation-text">{`You made a reservation for ${new Date(
            reservation.reservationTime
        ).getDate()}/${
            new Date(reservation.reservationTime).getMonth() + 1
        }/${new Date(reservation.reservationTime).getFullYear()} at ${new Date(
            reservation.reservationTime
        ).getHours()}:${new Date(reservation.reservationTime).getMinutes()}`}</span>
              <a
                  className="restaurant"
                  href={`/#/restaurantPage/${reservation.restaurantId}`}
              >
                  {restaurantName || "Loading..."}
              </a>
              <span
                  className={`status ${reservation.reservationStatus.toLowerCase()}`}
              >
          {reservation.reservationStatus}
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
