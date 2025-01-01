import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.tsx';
import {jwtDecode, JwtPayload} from "jwt-decode";

const ProtectedRouteADMIN = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated, role, logout} = useAuth();

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


    if (isAuthenticated && role === "ROLE_ADMIN" && !isTokenExpired(token)) {
        return <>{children}</>;
    }
    logout();
    return <Navigate to="/login" replace/>;
};

export default ProtectedRouteADMIN;