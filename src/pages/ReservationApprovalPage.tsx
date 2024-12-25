// RestaurantOwnerReservationApprovalPage.tsx
import "../styles/ReservationApprovalPage.css";
import { useState } from "react";

const mockReservations = [
  {
    id: 1,
    customerName: "John Doe",
    date: "December 15th",
    time: "19:00",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    date: "December 15th",
    time: "20:00",
    status: "Pending",
  },
  {
    id: 3,
    customerName: "Robert Brown",
    date: "December 15th",
    time: "18:30",
    status: "Approved",
  },
  {
    id: 4,
    customerName: "Emily White",
    date: "December 15th",
    time: "21:00",
    status: "Cancelled",
  },
];

const ReservationApprovalPage = () => {
  const [reservations, setReservations] = useState(mockReservations);

  const handleApprove = (id: number) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: "Approved" } : res))
    );
  };

  const handleDeny = (id: number) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: "Denied" } : res))
    );
  };

  const handleCancel = (id: number) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  return (
    <div className="reservation-approval-page">
      <h1 className="reservation-title">Reservation Requests</h1>
      <div className="reservation-list">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <p className="reservation-info">
              <strong>{reservation.customerName}</strong> sent a reservation
              request for {reservation.date} at {reservation.time}.
            </p>
            <p
              className={`reservation-status ${reservation.status.toLowerCase()}`}
            >
              {reservation.status}
            </p>
            <div className="reservation-actions">
              {reservation.status === "Pending" && (
                <>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(reservation.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="deny-button"
                    onClick={() => handleDeny(reservation.id)}
                  >
                    Deny
                  </button>
                </>
              )}
              {reservation.status !== "Cancelled" && (
                <button
                  className="cancel-button"
                  onClick={() => handleCancel(reservation.id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationApprovalPage;
