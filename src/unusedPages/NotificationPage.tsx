import NotificationList from "../components/NotificationList.tsx";
import "../styles/NotificationPage.css";
import {Notification} from "../services/NotificationFunctions.tsx";
import {useEffect, useState} from "react";
import {useNotificationActions} from "../services/NotificationFunctions.tsx";



const NotificationPage = () => {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const {handleFetchNotifications} = useNotificationActions();
    const [notificationIsRead, setNotificationIsRead] = useState<number>(0);

    useEffect(() => {
        const notifications = handleFetchNotifications();
        notifications.then((data) => {
            if (data !== undefined){
                /*setNotifications(data);*/
            }
        })

    })
  return (
    <div className="notification-page">
      <main className="notification-content">
        <h1 className="notification-title">Notifications</h1>{" "}
        <NotificationList notifications={notifications} setNotificationIsRead={setNotificationIsRead} />
      </main>
    </div>
  );
};

export default NotificationPage;
