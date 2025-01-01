// MyReservationsPage.tsx
import "../styles/MyReservations.css";
import ReservationCard from "../components/ReservationCard";
import {Reservation, useReservationActions} from "../services/ReservationFunctions.tsx";
import {useEffect, useState} from "react";

const MyReservationsPage = () => {
    const {handleFetchReservationsForUser} = useReservationActions();
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        const reservations = handleFetchReservationsForUser();
        reservations.then((data) => {
            if (data !== undefined) {
                setReservations(data);
            }
        })
    }, []);

  return (
    <div className="my-reservations-page">
      <div className="reservation-content">
        <h1 className="reservation-title">My Reservations</h1>
        <div className="reservations-list">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                showCancelButton={reservation.reservationStatus !== "Cancelled"}
              />
            ))
          ) : (
            <div className="no-reservations">
              <p>You have no reservations yet.</p>
              <button className="reserve-button">Find Restaurants</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservationsPage;
