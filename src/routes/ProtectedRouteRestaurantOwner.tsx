import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.tsx';

const ProtectedRouteRestaurantOwner = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated, role} = useAuth();

    if (isAuthenticated && (role === "RESTAURANT_OWNER" || role === "ADMIN")) {
        return <>{children}</>;
    }
    return <Navigate to="/" replace/>;
};

export default ProtectedRouteRestaurantOwner;