import NotificationList from "../components/NotificationList";
import "../styles/NotificationPage.css";
import {Notification} from "../services/NotificationFunctions.tsx";
import {useEffect, useState} from "react";
import {useNotificationActions} from "../services/NotificationFunctions.tsx";


interface NotificationsInHeaderProps{
    menuOpen: boolean;
    setThereIsNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}


const NotificationsInHeader:React.FC<NotificationsInHeaderProps> = ({menuOpen, setThereIsNotifications}) => {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const {handleFetchNotifications} = useNotificationActions();
    const [notificationIsRead, setNotificationIsRead] = useState<number>(0);
    let check = false

    useEffect(() => {
        check = false
        const notifications = handleFetchNotifications();
        notifications.then((data) => {
            if (data !== undefined){
                setNotifications(data);
                data.map( (notification)  => {
                    if(!notification.isRead){
                        setThereIsNotifications(true)
                        check = true
                    }
                })
                if (check === false){
                    setThereIsNotifications(false)
                }

            }
        })

    },[notificationIsRead, menuOpen])
    return (
        <NotificationList notifications={notifications} setNotificationIsRead={setNotificationIsRead} showAll={false} deletable={false} />
    );
};

export default NotificationsInHeader;
