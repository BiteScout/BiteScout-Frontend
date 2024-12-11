import "../styles/MyReservations.css";
import ReservationCard from "../components/ReservationCard";

const MyReservationsPage = () => {
  const reservations = [
    {
      id: 2,
      restaurant: "Pizza Place",
      date: "2024-12-15",
      time: "20:00",
      status: "Confirmed",
    },
    {
      id: 1,
      restaurant: "Pasta Palace",
      date: "2024-12-12",
      time: "19:00",
      status: "Pending",
    },
    {
      id: 3,
      restaurant: "Burger Bistro",
      date: "2024-12-18",
      time: "18:30",
      status: "Cancelled",
    },
  ];

  return (
    <div className="my-reservations-page">
      <div className="reservation-content">
        <h1 className="reservation-title">My Reservations</h1>
        <div className="reservations-list">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          ) : (
            <p>No reservations made yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservationsPage;
