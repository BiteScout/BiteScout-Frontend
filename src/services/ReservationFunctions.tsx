import useAxios from "../interceptors/AxiosInstance.tsx";
import React, {createContext, ReactNode, useContext} from "react";


export interface Reservation {
    id: number;
    customerId: string;
    restaurantId: string;
    reservationTime: string;
    reservationStatus: string;
    createdAt: string;
}


interface ReservationActionsContextProps {
    handleFetchReservationsForUser: () => Promise<Reservation[] | undefined>;
    handleCancelReservation: (reservationId: string) => Promise<void>;
    handleFetchReservationsForRestaurant: (restaurantId: string) => Promise<Reservation[] | undefined>;
    handleApproveDenyReservation: (reservationId: number, reservationStatus: string) => Promise<Reservation | undefined>;
    handleDeleteReservation: (reservationId: number) => Promise<void>;
}

interface ReservationActionsProviderProps {
    children: ReactNode;
}

const ReservationActionsContext = createContext<ReservationActionsContextProps | null>(null);

export const useReservationActions = () => {
    const context = useContext(ReservationActionsContext);
    if (!context) {
        throw new Error("useReservationActions must be used within UserActionsProvider");
    }
    return context;
}

export const ReservationActionsProvider: React.FC<ReservationActionsProviderProps> = ({children}) => {


    const handleFetchReservationsForUser = async (): Promise<Reservation[] | undefined> => {
        try {
            const response = await useAxios().get("/reservations/users")
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleCancelReservation = async (reservationId: string): Promise<void> => {
        try {
            const response = await useAxios().get(`/reservations/user/${reservationId}`);
            if (response.status === 204) {
                return response.data
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFetchReservationsForRestaurant = async (restaurantId: string): Promise<Reservation[] | undefined> => {
        try {
            const response = await useAxios().get(`/reservations/restaurants/${restaurantId}`)
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleApproveDenyReservation = async (reservationId: number, reservationStatus: string): Promise<Reservation | undefined> => {
        try {
            const response = await useAxios().put(`/reservations/${reservationId}`, {
                reservationStatus: reservationStatus,
            })
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.error(err);
        }

    }

    const handleDeleteReservation = async (reservationId: number): Promise<void> => {
        try {
            const response = await useAxios().delete(`/reservations/${reservationId}`);
            if (response.status === 204) {
                return response.data;
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <ReservationActionsContext.Provider value={{
            handleFetchReservationsForUser,
            handleCancelReservation,
            handleFetchReservationsForRestaurant,
            handleApproveDenyReservation,
            handleDeleteReservation,
        }}>
            {children}
        </ReservationActionsContext.Provider>
    );
}


