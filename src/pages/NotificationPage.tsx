import NotificationList from "../components/NotificationList";
import "../styles/NotificationPage.css";
const NotificationPage = () => {
  return (
    <div className="notification-page">
      <main className="notification-content">
        <h1 className="notification-title">Notifications</h1>{" "}
        <NotificationList />
      </main>
    </div>
  );
};

export default NotificationPage;
