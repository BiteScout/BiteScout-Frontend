import NotificationItem from "./NotificationItem";
import "../styles/NotificationList.css";
import React from "react";
import {Notification} from "../services/NotificationFunctions.tsx";

interface NotificationListProps {
  notifications: Notification[];
  setNotificationIsRead: React.Dispatch<React.SetStateAction<number>>
}

const NotificationList:React.FC<NotificationListProps> = ({notifications, setNotificationIsRead}) => {

  return (
    <div className="notification-list">
      {notifications &&
        notifications
          .filter((notification) => notification === undefined ? notification :!notification.isRead)
          .map((notification) => (
        <NotificationItem notification={notification} setNotificationIsRead={setNotificationIsRead} />
      ))}
    </div>
  );
};

export default NotificationList;
