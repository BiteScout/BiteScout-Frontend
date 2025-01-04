import "../styles/Header.css";
import React, {useEffect, useRef, useState} from "react";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";
import notification from "../assets/ios-notification.png";
import {Button} from "./ButtonWithImageAndText";
import profile from "../assets/Untitled-1.png";
import {ImgButton} from "./ButtonWithImage";
import globe from "../assets/globe.png";
import "../styles/Button.css";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import NotificationsInHeader from "./NotificationsInHeader.tsx";
import notificationWithRedDot from "../assets/notification-redDot.png"

const Header = () => {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {isAuthenticated, logout} = useAuth();
  const notify = (msg: string) => alert(msg);
  const userName = useSelector((state: RootState) => state.name);
  const [searchQuery, setSearchQuery] = useState("");
  const [thereIsNotifications, setThereIsNotifications] = useState<boolean>(false);
  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen((prevState) => !prevState);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/searchRestaurant/" + (searchQuery === "" ? "all" : searchQuery));
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
    <header className="header" style={{zIndex: 1000000000}}>
      <a onClick={() => navigate("/")}><img className="header__logo" src={bitescoutLogo11} alt="Logo" /></a>
      <nav className="header__nav">

      <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants..."
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>


        <Button
          class="button__"
          src={profile}
          text={userName === undefined || userName === "" ? "Username" : userName}
          func={() => {
            isAuthenticated ? navigate("/myProfile") : navigate("/login")
          }}
          msg="profile"
        />
          {isAuthenticated && (
              <button className="button__" onClick={() => {
                  navigate("/");
                  logout()
              }}>Logout</button>
          )}
        {thereIsNotifications ?
            <ImgButton
                class="button__onlyimg"
                src={notificationWithRedDot}
                func={toggleNotificationMenu}
                msg=""
            />
            :
            <ImgButton
                class="button__onlyimg"
                src={notification}
                func={toggleNotificationMenu}
                msg=""
            />}

      </nav>
      {/* Notification Menu */}
      <div
        ref={notificationMenuRef}
        className={`notification-menu ${
          isNotificationMenuOpen ? "open" : ""
        }`}
      >
        <NotificationsInHeader menuOpen={isNotificationMenuOpen} setThereIsNotifications={setThereIsNotifications}/>
      </div>
    </header>
  );
};

export default Header;
