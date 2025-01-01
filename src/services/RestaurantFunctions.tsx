import useAxios from "../interceptors/AxiosInstance.tsx";
import React, {createContext, ReactNode, useContext} from "react";


export interface restaurant {
    ownerId: string
    name: string
    description: string
    menu: string
    cuisineType: string
    location: {
        longitude: number
        latitude: number
    }
    priceRange: string
    createdAt: string
    updatedAt: string
}

export interface review {
    id: string
    restaurantId: string
    customerId: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
}

export interface reviewReply {
    id: string,
    reviewId: string,
    interactingUserId: string,
    interactionType: string,
    replyText: string,
    createdAt: string
}

export interface interactionReply {
    likeCount: number
    replies: reviewReply[]
}


interface RestaurantActionsContextProps {
    handleFetchRestaurant: (restaurantId: string) => Promise<restaurant | undefined>;
    handleFetchRestaurantReviews: (restaurantId: string) => Promise<review[] | undefined>;
    handleFetchReviewInteractions: (restaurantId: string) => Promise<interactionReply | undefined>;
    handleSendReview: (restaurantId: string, rating: number, comment: string) => Promise<review | undefined>;
    handleEditReview: (reviewId: string, rating: number, comment: string) => Promise<review | undefined>;
    handleSendingReply: (reviewId: string, replyText: string) => Promise<reviewReply | undefined>;
    handleSendingInteraction: (reviewId: string, interactionType: string) => Promise<reviewReply | undefined>;
    handleDeleteReview: (reviewId: string) => Promise<void>;
}

interface RestaurantActionsProviderProps {
    children: ReactNode;
}

const RestaurantActionsContext = createContext<RestaurantActionsContextProps | null>(null);

export const useRestaurantActions = () => {
    const context = useContext(RestaurantActionsContext);
    if (!context) {
        throw new Error("useRestaurantActions must be used within RestaurantActionsProvider");
    }
    return context;
}

export const RestaurantActionsProvider: React.FC<RestaurantActionsProviderProps> = ({children}) => {

    const handleFetchRestaurant = async (restaurantId: string) => {

        /*        let data = {}*/
        try {
            const response = await useAxios().get("/restaurants/" + restaurantId)
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleFetchRestaurantReviews = async (restaurantId: string) => {
        try {
            const response = await useAxios().get(`/reviews/restaurants/${restaurantId}`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSendReview = async (restaurantId: string, rating: number, comment: string) => {
        try {
            const response = await useAxios().post(`/reviews`, {
                restaurantId: restaurantId,
                rating: rating,
                comment: comment,
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }

    }

    const handleEditReview = async (reviewId: string, rating: number, comment: string) => {
        try {
            const response = await useAxios().put(`/reviews/${reviewId}`, {
                rating: rating,
                comment: comment
            })
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteReview = async (reviewId: string) => {
        try{
            const response = await useAxios().delete(`/reviews/${reviewId}`);
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    const handleFetchReviewInteractions = async (reviewId: string) => {
        try {
            const response = await useAxios().get(`/reviews/interaction/${reviewId}`);
            if (response.status === 200)
                return response.data;
        } catch (err) {
            console.log(err);
        }
    }


    const handleSendingReply = async (reviewId: string, replyText: string) => {
        try {
            const response = await useAxios().post(`/reviews/interaction`, {
                reviewId: reviewId,
                interactionType: "REPLY",
                replyText: replyText
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    }


    const handleSendingInteraction = async (reviewId: string, interactionType: string) => {
        try {
            const response = await useAxios().post(`/reviews/interaction`, {
                reviewId: reviewId,
                interactionType: interactionType,
                replyText: ""
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <RestaurantActionsContext.Provider value={{
            handleFetchRestaurant,
            handleFetchRestaurantReviews,
            handleFetchReviewInteractions,
            handleSendReview,
            handleSendingReply,
            handleSendingInteraction,
            handleEditReview,
            handleDeleteReview
        }}>
            {children}
        </RestaurantActionsContext.Provider>
    );
}


