import "../styles/Header.css"; // Optional: Add your styles here
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";
import notification from "../assets/ios-notification.png";
import { Button } from "./ButtonWithImageAndText";
import profile from "../assets/Untitled-1.png";
import { ImgButton } from "./ButtonWithImage";
import globe from "../assets/globe.png";
import "../styles/Button.css";

const Header = () => {
  function notify(msg: string) {
    alert(msg);
  }
  return (
    <header className="header">
      <img className="header__logo" src={bitescoutLogo11}></img>
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
          func={notify}
          msg="notif"
        />
        <ImgButton
          class="button__onlyimg"
          src={globe}
          func={notify}
          msg="language"
        />
      </nav>
    </header>
  );
};

export default Header;
