import Header from "./components/Header";
import {Outlet} from "react-router-dom"
import "./App.css"
import Sidebar from "./components/Sidebar.tsx";

export const Layout = () => {
    return (
        <>
            <div className="app-container">
                <Header />
                <div className="mainbody">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}