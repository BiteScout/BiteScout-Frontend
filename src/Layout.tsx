import Header from "./components/Header";
import {Outlet} from "react-router-dom"
import "./App.css"
import Sidebar from "./components/Sidebar.tsx";
import {NotificationActionsProvider} from "./services/NotificationFunctions.tsx";

export const Layout = () => {
    return (
        <>
            <div className="app-container">
                <NotificationActionsProvider>
                <Header />
                <Sidebar />
                <div className="mainbody">
                    <Outlet />
                </div>
                </NotificationActionsProvider>
            </div>
        </>
    )
}