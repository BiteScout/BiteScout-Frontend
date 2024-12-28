import "../styles/ProfilePage.css";
import profile from "../assets/Untitled-1.png";
import { Button } from "../components/ButtonWithImageAndText";
import {useEffect, useState} from "react";
import {useUserActions} from "../services/UserFunctions.tsx";
import {useSelector} from "react-redux";
import {useTransition} from "react";
import store from "../store.tsx";
import * as axios from "axios";
import useAxios from "../interceptors/AxiosInstance.tsx";
import {RootState} from "../store.tsx";

const MyProfilePage = () => {
  const[userName, setUserName] = useState("");
  const[name, setName] = useState("");
  const[surname, setSurname] = useState("");
  const[profilePhoto, setProfilePhoto] = useState(null);
  const {handleFetchUser} = useUserActions();
  const userId = useSelector((state:RootState) => state.userId);
  console.log(userId);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      // Perform the async task inside startTransition
      const data = handleFetchUser(userId);
      data.then((dataValue:any) => {
        setName(dataValue.firstName);
        setSurname(dataValue.lastName);
        setUserName(dataValue.username);
      })// assuming `username` is used for userId
      // Handle the result or redirect after login
    });

  },[])

  function notify(msg: string) {
    alert(msg);
  }

  return (
    <>
      <div className="profile__page">
        <div className="header__section">
          <img src={profile} alt="Profile" />
          <div className="header__text">
            <h1>{name === undefined ? "Name": name}{" "}{surname === undefined? "Surname": surname}</h1>
            <p className="header__username">{userName}</p>
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
export default MyProfilePage;
