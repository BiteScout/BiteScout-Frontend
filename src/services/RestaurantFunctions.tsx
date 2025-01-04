import useAxios from "../interceptors/AxiosInstance.tsx";
import React, {createContext, ReactNode, useContext} from "react";
import {useAuth} from "../context/AuthContext.tsx";



export interface restaurant {
    id:string;
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

export interface addRestaurant{
    ownerId:string;
    name: string
    description: string
    menu: string
    cuisineType: string
    location: {
        type: string
        coordinates: number[]
    }
    priceRange: string
}

export interface offer{
    id:string;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    createdAt:string;
    updatedAt:string;
}

export interface offerRequest {
    title:string;
    description:string;
    startDate:string|undefined;
    endDate:string|undefined;
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
    interactingUserName?: string,
    interactionType: string,
    replyText: string,
    createdAt: string
}

export interface interactionReply {
    likeCount: number
    replies: reviewReply[]
}

export interface ranking{
    averageRating: number,
    tierRanking:string,
    popularityScore: number,
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
    handleFetchMyRestaurants: (ownerId: string) => Promise<restaurant[] | undefined>;
    handleFetchOffersForRestaurant: (restaurantId: string) => Promise<offer[] | undefined>;
    handleAddOfferForRestaurant: (restaurantId: string, offerRequest:offerRequest) => Promise<offer | undefined>;
    handleUpdateOfferForRestaurant: (restaurantId: string, offerId:string, offerRequest:offerRequest|null) => Promise<offer | undefined>;
    handleDeleteOfferForRestaurant: (restaurantId: string, offerId:string) => Promise<void>;
    handleAddRestaurant: (addRestaurant:addRestaurant) => Promise<restaurant | undefined>;
    handleUpdateRestaurant: (restaurantId:string, addRestaurant:addRestaurant) => Promise<restaurant | undefined>;
    handleSearchRestaurants: (restaurantNameQuery: string) => Promise<restaurant[] | undefined>;
    handleGetAllCuisineTypes: () => Promise<string[] | undefined>;
    handleSearchRestaurantsByCuisine: (cuisineType: string) => Promise<restaurant[] | undefined>;
    handleSearchRestaurantsByPriceRange: (priceRange: string) => Promise<restaurant[] | undefined>;
    handleDeleteRestaurant: (restaurantId: string) => Promise<void>;
    handleDeleteReply: (reviewId: string) => Promise<void>;
    handleFetchRanking: (restaurantId: string) => Promise<ranking | undefined>;
    handleCalculateRating: () => Promise<void | undefined>;
    handleFetchNearbyRestaurants: (latitude: number, longitude: number, radiusInKm: number) => Promise<restaurant[] | undefined>;

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
    const {logout} = useAuth()

    const handleSearchRestaurants = async (restaurantNameQuery:string) => {
        try{
            if (restaurantNameQuery === "all"){
                const response = await useAxios().get("/restaurants");
                if (response.status === 200) {
                    return response.data;
                }else if (response.status === 401) {
                    logout()
                }
            }
            else {
                const response = await useAxios().get("/restaurants/search", {
                    params: {
                        restaurantName: restaurantNameQuery
                    }
                })
                if (response.status === 200) {
                    return response.data;
                }
                else if (response.status === 401) {
                    logout()
                }
            }
        }
        catch(error){
            console.error(error);
        }
    }
    const handleDeleteRestaurant = async (restaurantId: string) => {
        try{
            const response = await useAxios().delete(`/restaurants/${restaurantId}`);
            if (response.status === 204) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch (error){
            console.error(error);
        }
    }

    const handleSearchRestaurantsByCuisine = async (cuisineType:string) => {
        try{
            const response = await useAxios().get("restaurants/cuisine", {
                params: {
                    cuisineType:cuisineType
                }
            })
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch(error){
            console.error(error);
        }
    }
    const handleSearchRestaurantsByPriceRange = async (priceRange:string) => {
        try{
            const response = await useAxios().get("restaurants/price", {
                params: {
                    priceRange:priceRange
                }
            })
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch(error){
            console.error(error);
        }
    }


    const handleGetAllCuisineTypes = async () => {
        try{
            const response = await useAxios().get("/restaurants/getAllCuisines");
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch(error){
            console.error(error);
        }
    }

    const handleFetchRestaurant = async (restaurantId: string) => {
        try {
            const response = await useAxios().get("/restaurants/" + restaurantId)
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleAddRestaurant = async (addRestaurant:addRestaurant) => {
        try{
            const response = await useAxios().post("/restaurants", addRestaurant);
            if (response.status === 201) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleUpdateRestaurant = async (restaurantId:string,addRestaurant:addRestaurant) => {
        try {
            const response = await useAxios().put("/restaurants/"+ restaurantId, addRestaurant);
            if (response.status === 201) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleFetchMyRestaurants = async (ownerId:string) => {
        try{
            const response = await useAxios().get(`/restaurants/owner/${ownerId}`);
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }

        }
        catch (err) {
            console.error(err);
        }
    }

    const handleFetchOffersForRestaurant = async (restaurantId:string) => {
        try{
            const response = await useAxios().get(`/restaurants/${restaurantId}/offers`);
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }

        }
        catch (err) {
            console.error(err);
        }
    }

    const handleAddOfferForRestaurant = async (restaurantId:string, offerRequest:offerRequest) => {
        try {
            const response = await useAxios().post(`/restaurants/${restaurantId}/offers`, offerRequest);
            if (response.status === 201) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleUpdateOfferForRestaurant = async (restaurantId:string, offerId:string, offerRequest:offerRequest|null) => {
        try{
            const response = await useAxios().put(`/restaurants/${restaurantId}/offers/${offerId}`, offerRequest);
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleDeleteOfferForRestaurant = async (restaurantId:string, offerId:string) => {
        try{
            const response = await useAxios().delete(`/restaurants/${restaurantId}/offers/${offerId}`);
            if (response.status === 203) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleFetchRestaurantReviews = async (restaurantId: string) => {
        try {
            const response = await useAxios().get(`/reviews/restaurants/${restaurantId}`);
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
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
            else if (response.status === 401) {
                logout()
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
            else if (response.status === 401) {
                logout()
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
            else if (response.status === 401) {
                logout()
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
            else if (response.status === 401) {
                logout()
            }
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
            else if (response.status === 401) {
                logout()
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
                replyText: "aaaaaaaaaaaaaa"
            });
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteReply = async (reviewId: string) => {
        try{
            const response = await useAxios().delete(`/reviews/interaction/${reviewId}`);
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleFetchRanking = async (restaurantId: string) => {
        try {
            const response = await useAxios().get(`/ranking/restaurant/${restaurantId}`);
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch (err){
            console.log(err);
        }
    }

    const handleCalculateRating = async () => {
        try{
            const response = await useAxios().post(`/ranking/submit`)
            if (response.status === 401) {
                    logout()
                }
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleFetchNearbyRestaurants = async (latitude: number, longitude: number, radius: number) => {
        try {
            const response = await useAxios().get("/restaurants/near-me", {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    radius: radius
                }
            });
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
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
            handleDeleteReview,
            handleFetchMyRestaurants,
            handleFetchOffersForRestaurant,
            handleAddOfferForRestaurant,
            handleUpdateOfferForRestaurant,
            handleDeleteOfferForRestaurant,
            handleAddRestaurant,
            handleUpdateRestaurant,
            handleSearchRestaurants,
            handleGetAllCuisineTypes,
            handleSearchRestaurantsByCuisine,
            handleSearchRestaurantsByPriceRange,
            handleDeleteRestaurant,
            handleDeleteReply,
            handleFetchRanking,
            handleCalculateRating,
            handleFetchNearbyRestaurants
        }}>
            {children}
        </RestaurantActionsContext.Provider>
    );
}


