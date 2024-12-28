import useAxios from "../interceptors/AxiosInstance.tsx";

import {useSelector, useDispatch} from "react-redux";
import React, {createContext, ReactNode, useContext} from "react";

interface UserActionsContextProps {
    handleFetchUser: (userId:string) => Promise<{} | undefined>;
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

    const handleFetchUser = async (userId:string) => {

        let data = {}
        try{
            const response =await useAxios().get("/users/"+ userId )
            if (response.status === 200) {
                data = {
                    id: response.data.id,
                    username: response.data.username,
                    password: response.data.password,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phoneNumber: response.data.phoneNumber,
                    country: response.data.country,
                    city: response.data.city,
                    postalCode: response.data.postalCode,
                    address: response.data.address,
                    profilePicture: response.data.profilePicture
                }

                return data;
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <UserActionsContext.Provider value={{ handleFetchUser }}>
            {children}
        </UserActionsContext.Provider>
    );
}


