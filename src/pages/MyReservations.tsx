// MyReservationsPage.tsx
import "../styles/MyReservations.css";
import ReservationCard from "../components/ReservationCard";
import {Reservation, useReservationActions} from "../services/ReservationFunctions.tsx";
import {useEffect, useState} from "react";

const MyReservationsPage = () => {
    const {handleFetchReservationsForUser} = useReservationActions();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [reloadKey, setReloadKey] = useState<number>(0);
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchReservations = async () => {
            await delay(300);
            const reservations = await handleFetchReservationsForUser();
            if (reservations !== undefined)
                setReservations(reservations);
        }
        fetchReservations();
    }, [reloadKey]);

  return (
    <div className="my-reservations-page">
      <div className="reservation-content">
        <h1 className="reservation-title">My Reservations</h1>
        <div className="reservations-list">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard
                reservation={reservation}
                setReloadKey ={setReloadKey}
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
