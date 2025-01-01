import {HashRouter, Route, Routes} from "react-router-dom";
import {lazy} from "react"
import {Layout} from "./Layout.tsx";
import {LayoutLogin} from "./LayoutLogin.tsx"
import "./App.css";
/*import RestaurantReviewsPage from "./pages/RestaurantReviewPage.tsx";*/
/*const LoginPage = lazy(() => import("./pages/LoginPage"))*/
import LoginPage from "./pages/LoginPage"
/*const SignInPage = lazy(() => import("./pages/SignInPage"))*/
import SignInPage from "./pages/SignInPage.tsx";
import {AuthActionsProvider} from "./services/AuthFunctions.tsx";
import {UserActionsProvider} from "./services/UserFunctions.tsx";
import {RestaurantActionsProvider} from "./services/RestaurantFunctions.tsx";
/*const HomePage = lazy(()=>import("./pages/HomePage"))*/
import HomePage from "./pages/HomePage.tsx";
/*import MyProfilePage from "./pages/MyProfilePage.tsx";*/
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import ProtectedRouteRestaurantOwner from "./routes/ProtectedRouteRestaurantOwner.tsx";
/*import MyReservations from "./pages/MyReservations.tsx";*/
import {ReservationActionsProvider} from "./services/ReservationFunctions.tsx";

const RestaurantPage = lazy(() => import("./pages/RestaurantPage"));
/*import RestaurantPage from "./pages/RestaurantPage.tsx";*/
const RestaurantReviewsPage = lazy(() => import("./pages/RestaurantReviewPage"));

const MyProfilePage = lazy(() => import("./pages/MyProfilePage.tsx"))
/*const NotificationPage = lazy(() => import("./pages/NotificationPage"));*/
import NotificationPage from "./pages/NotificationPage.tsx";
const MyReservations = lazy(() => import("./pages/MyReservations"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ReservationApprovalPage = lazy(() => import("./pages/ReservationApprovalPage"));
/*import ReservationApprovalPage from "./pages/ReservationApprovalPage.tsx";*/
const UserReviewsPage = lazy(() => import("./pages/UserReviewsPage"));
const StartPage = lazy(() => import("./pages/StartPage"))
const PasswordChangeApprovalPage = lazy(()=>import("./pages/PasswordChangeApprovalPage"))
const PasswordChangePage = lazy(()=>import("./pages/PasswordChangePage"))


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
                        </AuthActionsProvider>} />
                <Route
                    path="/signin/:userType"
                    element={
                        <AuthActionsProvider>
                            <SignInPage />
                        </AuthActionsProvider>} />
                <Route
                    path="/changePassword"
                    element={<PasswordChangePage />} />
                <Route
                    path="/approvePassword"
                    element = {<PasswordChangeApprovalPage />} />
                <Route
                    path = "/start"
                    element = {<StartPage />} />
            </Route>
            <Route element = {<Layout />}>
                <Route
                    path="/"
                    element={<HomePage />} />

                <Route
                    path = "/userProfile"
                    element = {
                        <UserActionsProvider>
                            <ProtectedRoute>
                                <MyProfilePage/>
                            </ProtectedRoute>
                        </UserActionsProvider>} />
                <Route path = "/userReviews/:userId"
                       element = {<UserReviewsPage />} />
                <Route
                    path="/notifications"
                    element={<NotificationPage />} />
                <Route
                    path="/reservations"
                    element={
                        <ProtectedRoute>
                            <RestaurantActionsProvider>
                                <ReservationActionsProvider>
                                    <MyReservations/>
                                </ReservationActionsProvider>
                            </RestaurantActionsProvider>
                        </ProtectedRoute>}/>
                <Route
                    path="/reservationApproval/:restaurantId"
                    element={
                        <ProtectedRouteRestaurantOwner>
                            <ReservationActionsProvider>
                                <UserActionsProvider>
                                    <ReservationApprovalPage/>
                                </UserActionsProvider>
                            </ReservationActionsProvider>
                        </ProtectedRouteRestaurantOwner>}/>

                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <FavoritesPage/>
                        </ProtectedRoute>}/>
                <Route
                    path="/restaurantPage/:restaurantId"
                    element={
                        <UserActionsProvider>
                            <RestaurantActionsProvider>

                                <RestaurantPage/>

                            </RestaurantActionsProvider>
                        </UserActionsProvider>}/>
                <Route
                    path="/restaurantReviews/:restaurantId"
                    element={
                        <UserActionsProvider>
                            <RestaurantActionsProvider>
                                <RestaurantReviewsPage/>
                            </RestaurantActionsProvider>
                        </UserActionsProvider>}/>
            </Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
