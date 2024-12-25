import {HashRouter, Routes, Route} from "react-router-dom";
import {lazy} from "react"
import {Layout} from "./Layout.tsx";
import {LayoutLogin} from "./LayoutLogin.tsx"
import "./App.css";


const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const MyReservations = lazy(() => import("./pages/MyReservations"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ReservationApprovalPage = lazy(() => import("./pages/ReservationApprovalPage"));
const RestaurantPage = lazy(() => import("./pages/RestaurantPage"));
const UserReviewsPage = lazy(() => import("./pages/UserReviewsPage"));
const RestaurantReviewsPage = lazy(() => import("./pages/RestaurantReviewPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"))
const StartPage = lazy(() => import("./pages/StartPage"))
const SignInPage = lazy(() => import("./pages/SignInPage"))
const PasswordChangeApprovalPage = lazy(()=>import("./pages/PasswordChangeApprovalPage"))
const PasswordChangePage = lazy(()=>import("./pages/PasswordChangePage"))
const HomePage = lazy(()=>import("./pages/HomePage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage.tsx"))



function App() {
  return (
    <HashRouter>
        <Routes>
            <Route element={<LayoutLogin />}>
                <Route
                    path="/login"
                    element={<LoginPage />} />
                <Route
                    path="/signin"
                    element={<SignInPage />} />
                <Route
                    path="/changePassword"
                    element={<PasswordChangePage />} />
                <Route
                    path="/approvePassword"
                    element = {<PasswordChangeApprovalPage />} />
            </Route>
            <Route element = {<Layout />}>
                <Route
                    path="/"
                    element={<HomePage />} />
                <Route
                    path = "/start"
                    element = {<StartPage />} />

                <Route
                    path = "/userProfile/:userId"
                    element = {<ProfilePage />} />
                <Route path = "/userReviews/:userId"
                       element = {<UserReviewsPage />} />
                <Route
                    path="/notifications"
                    element={<NotificationPage />} />
                <Route
                    path="/reservations"
                    element={<MyReservations />} />
                <Route
                    path="/reservationApproval"
                    element={<ReservationApprovalPage />} />

                <Route
                    path="/favorites"
                    element={<FavoritesPage />} />
                <Route
                    path="/restaurantPage/:restaurantId"
                    element={<RestaurantPage />} />
                <Route
                    path="/restaurantReviews/:restaurantId"
                    element={<RestaurantReviewsPage />}/>
            </Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
