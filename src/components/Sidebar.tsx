import "../styles/Sidebar.css";
import { Button } from "./ButtonWithImageAndText";
import contact from "../assets/contact.png";
import fire from "../assets/fire.png";
import pin from "../assets/pin.png";
import recent from "../assets/recent.png";

const Sidebar = () => {
  function notify(msg: string) {
    alert(msg);
  }
  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <Button
          class="sidebar__menu__Button"
          src={fire}
          text="Favourites"
          func={notify}
          msg="Favourites"
        />
        <Button
          class="sidebar__menu__Button"
          src={recent}
          text="Recents"
          func={notify}
          msg="Recents"
        />
        <Button
          class="sidebar__menu__Button"
          src={fire}
          text="Trending"
          func={notify}
          msg="Trending"
        />
        <Button
          class="sidebar__menu__Button"
          src={pin}
          text="Near Me"
          func={notify}
          msg="Near Me"
        />
        <Button
          class="sidebar__menu__Button"
          src={fire}
          text="Offers"
          func={notify}
          msg="Offers"
        />
        <Button
          class="sidebar__menu__Button"
          src={contact}
          text="Contacts"
          func={notify}
          msg="Contacts"
        />
      </div>
    </div>
  );
};

export default Sidebar;
