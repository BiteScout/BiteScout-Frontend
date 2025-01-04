import "../styles/NotificationItem.css";
import "../styles/NotificationActions.css"
import {Notification, useNotificationActions} from "../services/NotificationFunctions.tsx";
import React from "react";

interface NotificationItemProps {
    notification: Notification;
    setNotificationIsRead: React.Dispatch<React.SetStateAction<number>>
    deletable: boolean
}

const NotificationItem:React.FC<NotificationItemProps>= ({notification, setNotificationIsRead, deletable}) => {
    const {handleMarkNotificationAsSeen, handleDeleteNotification} = useNotificationActions();
  return (
      <div key={notification.id} className={`notification-item notification-${notification.notificationType}`}>
          { notification.isRead ?
          <p className="notification-message-read">
              {notification.message}
          </p>
          :
          <p className="notification-message">
              {notification.message}
          </p>
          }
          <div className="notification-actions">
              {!notification.isRead ?
                  <button
                  className={`notification-button notification-${"mark"}`}
                  onClick={() => {
                      handleMarkNotificationAsSeen(notification.id);
                      setNotificationIsRead((prev) => prev + 1);
                      }}
                  >
                      Dismiss
                  </button> : null}

              {deletable ?
                  <button
                      className={`notification-button notification-${"reject"}`}
                      onClick={() => {
                          handleDeleteNotification(notification.id);
                          setNotificationIsRead((prev) => prev + 1);
                      }}>
                    Delete
                  </button> : null}

          </div>
      </div>
  );
};

export default NotificationItem;
