import Header from "./components/Header";
import {Outlet} from "react-router-dom"
import "./App.css"

export const LayoutLogin = () => {
    return (
        <>
            <div className="app-container">
                <Outlet />
            </div>
        </>
    )
}