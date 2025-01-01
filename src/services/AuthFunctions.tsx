import React, {createContext, ReactNode, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {jwtDecode} from "jwt-decode";
import useAxios from "../interceptors/AxiosInstance";
import useAxios2 from "../interceptors/AxiosInstance2.tsx";
import {useAuth} from "../context/AuthContext";
import {addElement} from "../elementSlice";
import store, {AppDispatch} from "../store";

interface AuthActionsContextProps {
    handleRegister: (registerData: any) => Promise<void>;
    handleLogin: (loginData: any) => Promise<void>;
}

interface AuthActionsProviderProps {
    children: ReactNode;
}

const AuthActionsContext = createContext<AuthActionsContextProps | null>(null);

export const useAuthActions = () => {
    const context = useContext(AuthActionsContext);
    if (!context) {
        throw new Error("useAuthActions must be used within an AuthActionsProvider");
    }
    return context;
};

export const AuthActionsProvider: React.FC<AuthActionsProviderProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const emptyAxiosInstance = useAxios2();
    const {login, restaurantOwnerRole, adminRole, customerRole} = useAuth();

    const handleRegister = async (registerData: any) => {
        try {
            const response = await axiosInstance.post("auth/register", {
                email: registerData.email,
                password: registerData.password,
                username: registerData.userName,
                role: registerData.userType === "RestaurantOwner" ? "RESTAURANT_OWNER" : "CUSTOMER",
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                try {
                    const decoded = jwtDecode<{ sub: string; roles: { authority: string }[] }>(
                        response.data.token
                    );
                    const responseId = await emptyAxiosInstance.get("/users/getUserByUsername/" + decoded.sub);
                    dispatch(
                        addElement({
                            id: Date.now(),
                            name: decoded.sub?.toString() || "Unknown",
                            role: decoded.roles.map((role) => role.authority)[0],
                            userId: responseId.data.id,
                            isAuthenticated: true,
                        })
                    );
                    console.log(store.getState());
                    login();
                    if (decoded.roles.map((role) => role.authority)[0] === "CUSTOMER")
                        customerRole()
                    else if (decoded.roles.map((role) => role.authority)[0] === "RESTAURANT_OWNER")
                        restaurantOwnerRole()
                    else if (decoded.roles.map((role) => role.authority)[0] === "ADMIN")
                        adminRole()
                    navigate("../");
                } catch (error) {
                    console.error("Error decoding token or fetching user:", error);
                }
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const handleLogin = async (loginData: any) => {
        try {
            const response = await axiosInstance.post("auth/login", {
                username: loginData.username,
                password: loginData.password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                try {
                    const decoded = jwtDecode<{ sub: string; roles: { authority: string }[] }>(
                        response.data.token
                    );
                    const responseId = await emptyAxiosInstance.get("/users/getUserByUsername/" + decoded.sub);
                    dispatch(
                        addElement({
                            id: Date.now(),
                            name: decoded.sub?.toString() || "Unknown",
                            role: decoded.roles.map((role) => role.authority)[0],
                            userId: responseId.data.id,
                            isAuthenticated: true,
                        })
                    );
                    console.log(store.getState());
                    login();
                    if (decoded.roles.map((role) => role.authority)[0] === "ROLE_CUSTOMER")
                        customerRole()
                    else if (decoded.roles.map((role) => role.authority)[0] === "ROLE_RESTAURANT_OWNER")
                        restaurantOwnerRole()
                    else if (decoded.roles.map((role) => role.authority)[0] === "ROLE_ADMIN")
                        adminRole()
                    navigate("../");
                } catch (error) {
                    console.error("Error decoding token or fetching user:", error);
                }
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <AuthActionsContext.Provider value={{ handleRegister, handleLogin }}>
            {children}
        </AuthActionsContext.Provider>
    );
};
