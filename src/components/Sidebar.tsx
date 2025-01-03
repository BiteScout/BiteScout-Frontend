import "../styles/Sidebar.css";
import { Button } from "./ButtonWithImageAndText";
import contact from "../assets/contact.png";
import fire from "../assets/fire.png";
import pin from "../assets/pin.png";
import recent from "../assets/recent.png";
import offer from "../assets/offer.png";
import star from "../assets/star.png";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";

const Sidebar = () => {
  const userRole = useSelector((state:RootState) => state.role);
  const navigate = useNavigate();
  function notify(){
    console.log("Notif");
  }
  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <Button
          class="sidebar__menu__Button"
          src={star}
          text="Favourites"
          func={() => navigate("/favorites")}
          msg="Favourites"
        />
        <Button
          class="sidebar__menu__Button"
          src={recent}
          text="Reservations"
          func={() => navigate("/reservations")}
          msg="Recents"
        />
        {/*<Button
          class="sidebar__menu__Button"
          src={fire}
          text="Trending"
          func={notify}
          msg="Trending"
        />*/}
        <Button
          class="sidebar__menu__Button"
          src={pin}
          text="Near Me"
          func={notify}
          msg="Near Me"
        />
        {userRole === "ROLE_RESTAURANT_OWNER" ?
        <Button
          class="sidebar__menu__Button"
          src={offer}
          text="Restaurant Management"
          func={() => navigate("/myRestaurants")}
          msg="Offers"
        />
        : null}
        <Button
          class="sidebar__menu__Button"
          src={contact}
          text="Contact"
          func={() => navigate("/contact")}
          msg="Contact"
        />
      </div>
    </div>
  );
};

export default Sidebar;
