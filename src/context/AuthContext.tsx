import React, {createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store.tsx'; // Update with your actual Redux store setup
import {removeElement} from '../elementSlice.tsx';

interface AuthAttributes {
    isAuthenticated: boolean;
    role: string;
    login: () => void;
    logout: () => void;
    customerRole: () => void;
    restaurantOwnerRole: () => void;
    adminRole: () => void;
}

const AuthContext = createContext<AuthAttributes | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Get Redux state values
    const isAuthenticatedFromRedux = useSelector((state: RootState) => state.isAuthenticated);
    const roleFromRedux = (useSelector((state: RootState) => state.role));

    // Local state for AuthContext
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedFromRedux || false);
    const [role, setRole] = useState<string>(roleFromRedux || '');

    // Role setters
    const customerRole = () => setRole('CUSTOMER');
    const restaurantOwnerRole = () => setRole('RESTAURANT_OWNER');
    const adminRole = () => setRole('ADMIN');

    // Login and logout
    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.setItem('token', '');
        dispatch(removeElement());
    };

    // Sync with Redux on load
    useEffect(() => {
        setIsAuthenticated(isAuthenticatedFromRedux);
        setRole(roleFromRedux);
    }, [isAuthenticatedFromRedux, roleFromRedux]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                role,
                login,
                logout,
                customerRole,
                restaurantOwnerRole,
                adminRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
