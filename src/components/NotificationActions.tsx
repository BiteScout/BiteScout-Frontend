import "../styles/NotificationActions.css";

const NotificationActions = ({ actions }: { actions: string[] }) => {
  return (
    <div className="notification-actions">
      {actions.map((action, index) => (
        <button
          key={index}
          className={`notification-button notification-${action.toLowerCase()}`}
        >
          {action}
        </button>
      ))}
    </div>
  );
};

export default NotificationActions;
