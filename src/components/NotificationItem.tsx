import "../styles/NotificationItem.css";
import "../styles/NotificationActions.css"
import {Notification, useNotificationActions} from "../services/NotificationFunctions.tsx";
import React from "react";

interface NotificationItemProps {
    notification: Notification;
    setNotificationIsRead: React.Dispatch<React.SetStateAction<number>>
}

const NotificationItem:React.FC<NotificationItemProps>= ({notification, setNotificationIsRead}) => {
    const {handleMarkNotificationAsSeen} = useNotificationActions();
  return (
      <div key={notification.id} className={`notification-item notification-${notification.notificationType}`}>
      <p className="notification-message">
        {notification.message}
      </p>
        <div className="notification-actions">
                <button
                    className={`notification-button notification-${"mark"}`}
                    onClick={() => {
                        handleMarkNotificationAsSeen(notification.id);
                        setNotificationIsRead((prev) => prev + 1);
                    }}
                >
                    Dismiss
                </button>

        </div>
    </div>
  );
};

export default NotificationItem;
