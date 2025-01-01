import React, {useEffect, useState} from "react";
import {Reservation, useReservationActions} from "../services/ReservationFunctions.tsx";
import "../styles/ReservationApprovalPage.css";
import {user, useUserActions} from "../services/UserFunctions.tsx";

interface ReservationApprovalCardProps {
    reservation: Reservation;
    setReloadKey: React.Dispatch<React.SetStateAction<number>>;
}

const ReservationApprovalCard: React.FC<ReservationApprovalCardProps> = ({
                                                                             reservation,
                                                                             setReloadKey
                                                                         }) => {

    const [customerName, setCustomerName] = useState<string>("");
    const {handleFetchUser} = useUserActions();
    const {handleApproveDenyReservation, handleDeleteReservation} = useReservationActions();

    useEffect(() => {
        const fetchRestaurantName = async () => {
            try {
                const userData: user | undefined = await handleFetchUser(
                    reservation.customerId
                );
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

        fetchRestaurantName();
    }, [reservation.customerId]);


    return (
        <div key={reservation.id} className="reservation-card">
            <p className="reservation-info">
                <strong>{customerName}</strong> sent a reservation
                request for {new Date(
                reservation.reservationTime
            ).getDate()}/{
                new Date(reservation.reservationTime).getMonth() + 1
            }/{new Date(reservation.reservationTime).getFullYear()} at {new Date(
                reservation.reservationTime
            ).getHours()}:{new Date(reservation.reservationTime).getMinutes()}
            </p>
            <p
                className={`reservation-status ${reservation.reservationStatus.toString().toLowerCase()}`}
            >
                {reservation.reservationStatus}
            </p>
            <div className="reservation-actions">
                {reservation.reservationStatus === "ON_HOLD" && (
                    <>
                        <button
                            className="approve-button"
                            onClick={() => {
                                handleApproveDenyReservation(reservation.id, "ACCEPTED");
                                setReloadKey((prev) => prev + 1);
                            }}
                        >
                            Approve
                        </button>
                        <button
                            className="deny-button"
                            onClick={() => {
                                handleApproveDenyReservation(reservation.id, "REJECTED")
                                setReloadKey((prev) => prev + 1);
                            }}
                        >
                            Deny
                        </button>
                    </>
                )}
                {(reservation.reservationStatus === "REJECTED" || reservation.reservationStatus === "ACCEPTED") && (
                    <button
                        className="cancel-button"
                        onClick={() => {
                            handleDeleteReservation(reservation.id);
                            setReloadKey((prev) => prev + 1);
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReservationApprovalCard;
