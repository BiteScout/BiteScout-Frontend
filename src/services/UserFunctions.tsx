import useAxios from "../interceptors/AxiosInstance.tsx";
import React, {createContext, ReactNode, useContext} from "react";

interface user {
    id: string,
    username: string,
    email: string,
    enabled: boolean
}


interface UserActionsContextProps {
    handleFetchUser: (userId: string) => Promise<user | undefined>;
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
                return response.data;
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


