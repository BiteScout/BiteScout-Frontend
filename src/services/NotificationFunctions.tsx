import useAxios from "../interceptors/AxiosInstance.tsx";
import React, {createContext, ReactNode, useContext} from "react";
import {useAuth} from "../context/AuthContext.tsx";


export interface Notification {
    id:number;
    userId:string;
    message:string;
    notificationType:string;
    isRead:boolean;
    createdAt:Date;
}


interface NotificationActionsContextProps {
    handleFetchNotifications: () => Promise<Notification[] | undefined>;
    handleMarkNotificationAsSeen: (notificationId:number) => Promise<void>;
    handleDeleteNotification: (notificationId:number) => Promise<void>;
}

interface NotificationActionsProviderProps {
    children: ReactNode;
}

const NotificationActionsContext = createContext<NotificationActionsContextProps | null>(null);


export const useNotificationActions = () => {
    const context = useContext(NotificationActionsContext);
    if (!context) {
        throw new Error("useNotificationActions must be used within NotificationActionsProvider");
    }
    return context;
}

export const NotificationActionsProvider: React.FC<NotificationActionsProviderProps> = ({children}) => {
    const {logout} = useAuth()
    const handleFetchNotifications = async ():Promise<Notification[] | undefined> => {
        try{
            const response = await useAxios().get("/notifications");
            if (response && response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch(err){
            console.error(err);
        }
    }
    const handleMarkNotificationAsSeen = async (notificationId:number):Promise<void> => {
        try{
            const response = await useAxios().put(`/notifications/${notificationId}`);
            if (response && response.status === 200) {
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
    const handleDeleteNotification = async (notificationId:number):Promise<void> => {
        try{
            const response = await useAxios().delete(`/notifications/${notificationId}`);
            if (response && response.status === 200) {
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



    return (
        <NotificationActionsContext.Provider value={{
            handleFetchNotifications,
            handleMarkNotificationAsSeen,
            handleDeleteNotification
        }}>
            {children}
        </NotificationActionsContext.Provider>
    );
}


