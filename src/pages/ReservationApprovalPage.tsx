// RestaurantOwnerReservationApprovalPage.tsx
import "../styles/ReservationApprovalPage.css";
import {useEffect, useState} from "react";
import {Reservation, useReservationActions} from "../services/ReservationFunctions.tsx";
import ReservationApprovalCard from "../components/ReservationApprovalCard.tsx";
import {useParams} from "react-router-dom";

const ReservationApprovalPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const {handleFetchReservationsForRestaurant} = useReservationActions();
  const {restaurantId} = useParams<{ restaurantId: string }>();
  const [reloadKey, setReloadKey] = useState<number>(0); // Key to trigger data fetching

  useEffect(() => {
    const reservations = handleFetchReservationsForRestaurant(restaurantId === undefined ? "" : restaurantId);
    reservations.then((data) => {
      if (data !== undefined) {
        setReservations(data);
        console.log(data)
      }
    })

  }, [reloadKey]);


  return (
    <div className="reservation-approval-page">
      <h1 className="reservation-title">Reservation Requests</h1>
      <div className="reservation-list">
        {reservations.map((reservation) => (
            <ReservationApprovalCard reservation={reservation} setReloadKey={setReloadKey}/>
        ))}
      </div>
    </div>
  );
};

export default ReservationApprovalPage;
