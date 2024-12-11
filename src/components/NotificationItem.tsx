import NotificationActions from "./NotificationActions";
import "../styles/NotificationItem.css";

const NotificationItem = ({
  type,
  name,
  message,
  actions,
}: {
  type: string;
  name: string;
  message: string;
  actions: string[];
}) => {
  return (
    <div className={`notification-item notification-${type}`}>
      <p className="notification-message">
        <strong>{name}</strong> {message}
      </p>
      <NotificationActions actions={actions} />
    </div>
  );
};

export default NotificationItem;
