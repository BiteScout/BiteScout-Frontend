import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.tsx';
import {jwtDecode, JwtPayload} from "jwt-decode";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const {isAuthenticated, logout} = useAuth();

    let token = localStorage.getItem("token");
    if (token == null)
        token = "";
    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp ? decoded.exp < currentTime : true;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true;
        }
    };
    if (!isAuthenticated && isTokenExpired(token)) {
        logout();
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;