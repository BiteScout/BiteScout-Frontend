import React, { useEffect, useState } from "react";
import { Reservation, useReservationActions } from "../services/ReservationFunctions.tsx";
import "../styles/ReservationApprovalPage.css";
import { user, useUserActions } from "../services/UserFunctions.tsx";
import Swal from "sweetalert2";

interface ReservationApprovalCardProps {
  reservation: Reservation;
  setReloadKey: React.Dispatch<React.SetStateAction<number>>;
}

const ReservationApprovalCard: React.FC<ReservationApprovalCardProps> = ({
  reservation,
  setReloadKey,
}) => {
  const [customerName, setCustomerName] = useState<string>("");
  const { handleFetchUser } = useUserActions();
  const { handleApproveDenyReservation, handleDeleteReservation } = useReservationActions();

  useEffect(() => {
    const fetchCustomerName = async () => {
      try {
        const userData: user | undefined = await handleFetchUser(reservation.customerId);
        if (userData) {
          setCustomerName(userData.username);
        } else {
          setCustomerName("Couldn't find user");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setCustomerName("Couldn't fetch user");
      }
    };

    fetchCustomerName();
  }, [reservation.customerId]);

  // Handle Approve with Confirmation
  const handleApprove = () => {
    Swal.fire({
      title: "Approve Reservation?",
      text: "Do you want to approve this reservation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleApproveDenyReservation(reservation.id, "ACCEPTED");
        setReloadKey((prev) => prev + 1);
        Swal.fire("Approved!", "The reservation has been approved.", "success");
      }
    });
  };

  // Handle Deny with Confirmation
  const handleDeny = () => {
    Swal.fire({
      title: "Deny Reservation?",
      text: "Do you want to deny this reservation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Deny",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleApproveDenyReservation(reservation.id, "REJECTED");
        setReloadKey((prev) => prev + 1);
        Swal.fire("Denied!", "The reservation has been denied.", "success");
      }
    });
  };

  // Handle Delete with Confirmation
  const handleDelete = () => {
    Swal.fire({
      title: "Delete Reservation?",
      text: "Do you want to delete this reservation permanently?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteReservation(reservation.id);
        setReloadKey((prev) => prev + 1);
        Swal.fire("Deleted!", "The reservation has been deleted.", "success");
      }
    });
  };

  return (
    <div key={reservation.id} className="reservation-card">
      <p className="reservation-info">
        <strong>{customerName}</strong> sent a reservation request for{" "}
        {new Date(reservation.reservationTime).getDate()}/
        {new Date(reservation.reservationTime).getMonth() + 1}/
        {new Date(reservation.reservationTime).getFullYear()} at{" "}
        {new Date(reservation.reservationTime).getHours()}:
        {new Date(reservation.reservationTime).getMinutes()}
      </p>
      <p className={`reservation-status ${reservation.reservationStatus.toString().toLowerCase()}`}>
        {reservation.reservationStatus}
      </p>
      <div className="reservation-actions">
        {reservation.reservationStatus === "ON_HOLD" && (
          <>
            <button className="approve-button" onClick={handleApprove}>
              Approve
            </button>
            <button className="deny-button" onClick={handleDeny}>
              Deny
            </button>
          </>
        )}
        {(reservation.reservationStatus === "REJECTED" || reservation.reservationStatus === "ACCEPTED") && (
          <button className="cancel-button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationApprovalCard;
