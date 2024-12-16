import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
//import { MenuButton } from "./components/MenuButton";
//import NotificationPage from "./pages/NotificationPage";
//import MyReservations from "./pages/MyReservations";
//import FavoritesPage from "./pages/FavoritesPage";
//import ReservationApprovalPage from "./pages/ReservationApprovalPage";
//import RestaurantPage from "./pages/RestaurantPage";
import UserReviewsPage from "./pages/UserReviewsPage";
//import RestaurantReviewsPage from "./pages/RestaurantReviewPage";
function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="mainbody">
        <Sidebar />
        <UserReviewsPage />
      </div>
    </div>
  );
}

export default App;
