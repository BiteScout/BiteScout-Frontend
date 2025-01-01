import NotificationList from "../components/NotificationList";
import "../styles/NotificationPage.css";
import {Notification} from "../services/NotificationFunctions.tsx";
import {useEffect, useState} from "react";
import {useNotificationActions} from "../services/NotificationFunctions.tsx";



const NotificationsInHeader = () => {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const {handleFetchNotifications} = useNotificationActions();
    const [notificationIsRead, setNotificationIsRead] = useState<number>(0);

    useEffect(() => {
        const notifications = handleFetchNotifications();
        notifications.then((data) => {
            if (data !== undefined){
                setNotifications(data);
            }
        })

    },[notificationIsRead])
    return (
        <NotificationList notifications={notifications} setNotificationIsRead={setNotificationIsRead} />
    );
};

export default NotificationsInHeader;
