import "../styles/Header.css";
import React, { useState, useEffect, useRef } from "react";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";
import notification from "../assets/ios-notification.png";
import { Button } from "./ButtonWithImageAndText";
import profile from "../assets/Untitled-1.png";
import { ImgButton } from "./ButtonWithImage";
import globe from "../assets/globe.png";
import "../styles/Button.css";
import NotificationList from "./NotificationList";

const Header = () => {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  const notify = (msg: string) => alert(msg);

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
          text="Username"
          func={notify}
          msg="profile"
        />
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
