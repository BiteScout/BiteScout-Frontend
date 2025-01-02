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
/*const NotificationPage = lazy(() => import("./pages/NotificationPage"));*/
import NotificationPage from "./unusedPages/NotificationPage.tsx";
import OffersPage from "./pages/OffersPage.tsx";
import MyRestaurantsPage from "./pages/MyRestaurantsPage.tsx";
import EditRestaurantPage from "./pages/EditRestaurantPage.tsx";
import AddOfferPage from "./pages/AddOfferPage.tsx";
import AddRestaurantPage from "./pages/AddRestaurantPage.tsx";

const RestaurantPage = lazy(() => import("./pages/RestaurantPage"));
/*import RestaurantPage from "./pages/RestaurantPage.tsx";*/
const RestaurantReviewsPage = lazy(() => import("./pages/RestaurantReviewPage"));

const MyProfilePage = lazy(() => import("./pages/MyProfilePage.tsx"))
const MyReservations = lazy(() => import("./pages/MyReservations"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ReservationApprovalPage = lazy(() => import("./pages/ReservationApprovalPage"));
/*import ReservationApprovalPage from "./pages/ReservationApprovalPage.tsx";*/
const UserReviewsPage = lazy(() => import("./unusedPages/UserReviewsPage.tsx"));
const StartPage = lazy(() => import("./pages/StartPage"))
const PasswordChangeApprovalPage = lazy(()=>import("./unusedPages/PasswordChangeApprovalPage.tsx"))
const PasswordChangePage = lazy(()=>import("./unusedPages/PasswordChangePage.tsx"))
const SettingsPage = lazy(() => import("./pages/SettingsPage"));


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
                {/*<Route
                    path="/changePassword"
                    element={<PasswordChangePage />} />
                <Route
                    path="/approvePassword"
                    element = {<PasswordChangeApprovalPage />} />*/}
                <Route
                    path = "/start"
                    element = {<StartPage />} />
            </Route>
            <Route element = {<Layout />}>
                <Route
                    path="/"
                    element={<HomePage />} />

                <Route
                    path = "/myProfile"
                    element = {
                        <ProtectedRoute>
                            <UserActionsProvider>
                                    <MyProfilePage/>
                            </UserActionsProvider>
                        </ProtectedRoute>} />
                <Route path = "/userReviews/:userId"
                       element = {<UserReviewsPage />} />
                <Route
                    path="/myProfile/settings"
                    element={
                        <ProtectedRoute>
                            <UserActionsProvider>
                                <SettingsPage/>
                            </UserActionsProvider>
                        </ProtectedRoute>
                    }/>

                {/*<Route
                    path="/notifications"
                    element={<NotificationPage />} />*/}
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
                            <UserActionsProvider>
                                <RestaurantActionsProvider>
                                    <FavoritesPage/>
                                </RestaurantActionsProvider>
                            </UserActionsProvider>

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
                    path="/addRestaurant"
                     element={
                        <ProtectedRouteRestaurantOwner>
                            <RestaurantActionsProvider>
                                <AddRestaurantPage/>
                            </RestaurantActionsProvider>
                        </ProtectedRouteRestaurantOwner>}/>
                <Route
                    path="/editRestaurant/:restaurantId"
                    element={
                        <ProtectedRouteRestaurantOwner>
                            <RestaurantActionsProvider>
                                <EditRestaurantPage/>
                            </RestaurantActionsProvider>
                        </ProtectedRouteRestaurantOwner>
                    }/>
                <Route
                    path={"/myRestaurants"}
                    element={
                    <ProtectedRouteRestaurantOwner>
                        <RestaurantActionsProvider>
                            <MyRestaurantsPage/>
                        </RestaurantActionsProvider>
                    </ProtectedRouteRestaurantOwner>
                    }
                />
                <Route
                    path="/offers/:restaurantId"
                    element={
                        <ProtectedRouteRestaurantOwner>
                            <RestaurantActionsProvider>
                                <OffersPage/>
                            </RestaurantActionsProvider>
                        </ProtectedRouteRestaurantOwner>
                    }
                />
                <Route
                path="/addOffer/:restaurantId"
                element={
                    <ProtectedRouteRestaurantOwner>
                        <RestaurantActionsProvider>
                            <AddOfferPage/>
                        </RestaurantActionsProvider>
                    </ProtectedRouteRestaurantOwner>
                }/>
                <Route
                    path="/restaurantReviews/:restaurantId"
                    element={
                    <ProtectedRoute>
                        <UserActionsProvider>
                            <RestaurantActionsProvider>
                                <RestaurantReviewsPage/>
                            </RestaurantActionsProvider>
                        </UserActionsProvider>
                    </ProtectedRoute>}/>
            </Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
