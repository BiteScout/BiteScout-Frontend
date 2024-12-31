import "../styles/Header.css";
import React, {useEffect, useRef, useState} from "react";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";
import notification from "../assets/ios-notification.png";
import {Button} from "./ButtonWithImageAndText";
import profile from "../assets/Untitled-1.png";
import {ImgButton} from "./ButtonWithImage";
import globe from "../assets/globe.png";
import "../styles/Button.css";
import NotificationList from "./NotificationList";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {useAuth} from "../context/AuthContext.tsx";

const Header = () => {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
    const {isAuthenticated, logout} = useAuth();
  const notify = (msg: string) => alert(msg);
  const userName = useSelector((state: RootState) => state.name);
  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen((prevState) => !prevState);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node)
      ) {
        setIsNotificationMenuOpen(false);
      }
    };

    if (isNotificationMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationMenuOpen]);

  return (
    <header className="header">
      <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
      <nav className="header__nav">
        <Button
          class="button__"
          src={profile}
          text={userName === undefined || userName === "" ? "Username" : userName}
          func={() => {
              isAuthenticated ? navigate("/userProfile") : navigate("/login")
          }}
          msg="profile"
        />
          {isAuthenticated && (
              <button className="button__" onClick={() => {
                  navigate("/");
                  logout()
              }}>Logout</button>
          )}
        <ImgButton
          class="button__onlyimg"
          src={notification}
          func={toggleNotificationMenu}
          msg=""
        />
        <ImgButton
          class="button__onlyimg"
          src={globe}
          func={notify}
          msg="language"
        />
      </nav>
      {/* Notification Menu */}
      <div
        ref={notificationMenuRef}
        className={`notification-menu ${
          isNotificationMenuOpen ? "open" : ""
        }`}
      >
        <NotificationList />
      </div>
    </header>
  );
};

export default Header;
