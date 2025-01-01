import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.tsx';

const ProtectedRouteADMIN = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated, role} = useAuth();

    if (isAuthenticated && role === "ROLE_ADMIN") {
        return <>{children}</>;
    }
    return <Navigate to="/" replace/>;
};

export default ProtectedRouteADMIN;