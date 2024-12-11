import NotificationItem from "./NotificationItem";
import "../styles/NotificationList.css";

const NotificationList = () => {
  const notifications = [
    {
      id: 1,
      type: "reservation",
      name: "John Doe",
      message: "has made a reservation request for December 15th at 7:00 PM",
      actions: ["Approve", "Reject"],
    },
    {
      id: 2,
      type: "review",
      name: "Jane Smith",
      message: 'left a new review: "Amazing service and food!"',
      actions: ["Mark as Read"],
    },
    {
      id: 3,
      type: "approval",
      name: "Restaurant Team",
      message:
        "has approved your reservation request for December 15th at 7:00 PM",
      actions: ["View Reservation"],
    },
    {
      id: 4,
      type: "new_restaurant",
      name: "Sushi House",
      message: "has been successfully added to the app",
      actions: ["View Restaurant"],
    },
  ];

  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </div>
  );
};

export default NotificationList;
