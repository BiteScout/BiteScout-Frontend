import useAxios from "../interceptors/AxiosInstance.tsx";
import React, {createContext, ReactNode, useContext} from "react";

export interface user {
    id: string,
    username: string,
    email: string,
    enabled: boolean
}

export interface favorite {
    id: string,
    userId: string,
    restaurantId: string,
    favoritedAt: Date
}


interface UserActionsContextProps {
    handleFetchUser: (userId: string) => Promise<user | undefined>;
    handleFetchFavorites: (userId: string) => Promise<favorite[] | undefined>;
    handleAddFavorite: (userId: string, restaurantId: string) => Promise<void>;
    handleRemoveFavorite: (userId: string, restaurantId: string) => Promise<void>;
}

interface UserActionsProviderProps {
    children: ReactNode;
}

const UserActionsContext = createContext<UserActionsContextProps |null>(null);

export const useUserActions = () => {
    const context = useContext(UserActionsContext);
    if (!context) {
        throw new Error("useUserActions must be used within UserActionsProvider");
    }
    return context;
}

export const UserActionsProvider: React.FC<UserActionsProviderProps> = ({ children })=> {

    const handleFetchUser = async (userId: string): Promise<user | undefined> => {
        try{
            const response =await useAxios().get("/users/"+ userId )
            if (response.status === 200) {
                return response.data;
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const handleFetchFavorites = async (userId: string): Promise<favorite[] | undefined> => {
        try {
            const response = await useAxios().get(`users/${userId}/favorites`)
            if (response.status === 200) {
                return response.data;
            }

        } catch (err) {
            console.error(err);
        }
    }
    const handleAddFavorite = async (userId: string, restaurantId: string): Promise<void> => {
        try {
            const response = await useAxios().post(`/users/${userId}/favorites/${restaurantId}`);
            if (response.status === 201) {
                console.log("Restaurant added to favorites");
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleRemoveFavorite = async (userId: string, restaurantId: string): Promise<void> => {
        try {
            const response = await useAxios().delete(`/users/${userId}/favorites/${restaurantId}`);
            if (response.status === 204) {
                console.log("Restaurant removed from favorites");
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <UserActionsContext.Provider value={{handleFetchUser, handleFetchFavorites, handleAddFavorite, handleRemoveFavorite}}>
            {children}
        </UserActionsContext.Provider>
    );
}


