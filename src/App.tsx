import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
//import { MenuButton } from "./components/MenuButton";
//import NotificationPage from "./pages/NotificationPage";
//import MyReservations from "./pages/MyReservations";
//import FavoritesPage from "./pages/FavoritesPage";
import ReservationApprovalPage from "./pages/ReservationApprovalPage";
//import RestaurantPage from "./pages/RestaurantPage";
//import UserReviewsPage from "./pages/UserReviewsPage";
//import RestaurantReviewsPage from "./pages/RestaurantReviewPage";
//import LoginPage from "./pages/LoginPage";
//import StartPage from "./pages/StartPage";
//import SignInPage from "./pages/SignInPage";
//import PasswordChangeApprovalPage from "./pages/PasswordChangeApprovalPage";
//import PasswordChangePage from "./pages/PasswordChangePage";
//import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="mainbody">
        <Sidebar />
        <ReservationApprovalPage />
      </div>
    </div>
  );
}

export default App;
