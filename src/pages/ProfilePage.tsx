import "../styles/ProfilePage.css";
import profile from "../assets/Untitled-1.png";
import { Button } from "../components/ButtonWithImageAndText";

export const ProfilePage = () => {
  function notify(msg: string) {
    alert(msg);
  }
  return (
    <>
      <div className="profile__page">
        <div className="header__section">
          <img src={profile} alt="Profile" />
          <div className="header__text">
            <h1>Name Surname</h1>
            <p className="header__username">Username</p>
          </div>
        </div>
        <br></br>
        <div className="buttons__section">
          <Button
            class="buttons__section__button"
            src=""
            text="My Restaurants"
            func={notify}
            msg="My Restaurants"
          />
          <Button
            class="buttons__section__button"
            src=""
            text="Recent Reviews"
            func={notify}
            msg="Recent Reviews"
          />
          <Button
            class="buttons__section__button"
            src=""
            text="All Reviews"
            func={notify}
            msg="All Reviews"
          />
          <Button
            class="buttons__section__button"
            src=""
            text="My Settings"
            func={notify}
            msg="My Settings"
          />
        </div>
      </div>
    </>
  );
};
