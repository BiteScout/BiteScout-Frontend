import { ImgButton } from "./ButtonWithImage";
import menu from "../assets/menu.png";
import "../styles/MenuButton.css";

export function MenuButton() {
  function notify(msg: string) {
    alert(msg);
  }
  return <ImgButton class="menubutton" src={menu} func={notify} msg="Menu" />;
}
