import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";
import "../App.css";
import { Button } from "../components/Button";

export const RestaurantSignup = () => {
  function notify(msg: string) {
    alert(msg);
  }

  return (
    <div className="restaurant-signup">
      <div className="div">
        <img className="bitescout" alt="Bitescout" src={bitescoutLogo11} />
        <Button text="HELLO" color="blue" func={notify} msg="A"></Button>
      </div>
    </div>
  );
};
