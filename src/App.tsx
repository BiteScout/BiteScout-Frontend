import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Layout } from "./Layout.tsx";
import { LayoutLogin } from "./LayoutLogin.tsx";
import "./App.css";

const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const MyReservations = lazy(() => import("./pages/MyReservations"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ReservationApprovalPage = lazy(
  () => import("./pages/ReservationApprovalPage")
);
const RestaurantPage = lazy(() => import("./pages/RestaurantPage"));
const UserReviewsPage = lazy(() => import("./pages/UserReviewsPage"));
const RestaurantReviewsPage = lazy(
  () => import("./pages/RestaurantReviewPage")
);
/*const LoginPage = lazy(() => import("./pages/LoginPage"))*/
import LoginPage from "./pages/LoginPage";
const StartPage = lazy(() => import("./pages/StartPage"));
/*const SignInPage = lazy(() => import("./pages/SignInPage"))*/
import SignInPage from "./pages/SignInPage.tsx";
import { AuthActionsProvider } from "./services/AuthFunctions.tsx";
import { UserActionsProvider } from "./services/UserFunctions.tsx";
const PasswordChangeApprovalPage = lazy(
  () => import("./pages/PasswordChangeApprovalPage")
);
const PasswordChangePage = lazy(() => import("./pages/PasswordChangePage"));
/*const HomePage = lazy(()=>import("./pages/HomePage"))*/
import HomePage from "./pages/HomePage.tsx";
/*const MyProfilePage = lazy(() => import("./pages/MyProfilePage.tsx"))*/
import MyProfilePage from "./pages/MyProfilePage.tsx";
//import SettingsPage from "./pages/SettingsPage.tsx";
import MyRestaurantsPage from "./pages/MyRestaurantsPage.tsx";
import EditRestaurantPage from "./pages/EditRestaurantPage.tsx";
import OffersPage from "./pages/OffersPage.tsx";
import AddOfferPage from "./pages/AddOfferPage.tsx";
import CustomerOffersPage from "./pages/CustomerOffersPage.tsx";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<LayoutLogin />}>
          <Route
            path="/login"
            element={
              <AuthActionsProvider>
                <LoginPage />
              </AuthActionsProvider>
            }
          />
          <Route
            path="/signin/:userType"
            element={
              <AuthActionsProvider>
                <SignInPage />
              </AuthActionsProvider>
            }
          />
          <Route path="/changePassword" element={<PasswordChangePage />} />
          <Route
            path="/approvePassword"
            element={<PasswordChangeApprovalPage />}
          />
          <Route path="/start" element={<StartPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/userProfile"
            element={
              <UserActionsProvider>
                <MyProfilePage />
              </UserActionsProvider>
            }
          />
          <Route path="/userReviews/:userId" element={<UserReviewsPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route
            path="/reservationApproval"
            element={<ReservationApprovalPage />}
          />

          <Route path="/favorites" element={<EditRestaurantPage />} />
          <Route
            path="/restaurantPage/:restaurantId"
            element={<RestaurantPage />}
          />
          <Route
            path="/restaurantReviews/:restaurantId"
            element={<RestaurantReviewsPage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
