import "../styles/ProfilePage.css";
import profile from "../assets/Untitled-1.png";
import {useEffect, useState, useTransition} from "react";
import {useUserActions} from "../services/UserFunctions.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {useNavigate} from "react-router-dom";

const MyProfilePage = () => {
  const[userName, setUserName] = useState("");
  const[name, setName] = useState("");
  const[surname, setSurname] = useState("");
  const[profilePhoto, setProfilePhoto] = useState(null);
  const {handleFetchUser} = useUserActions();
  const userId = useSelector((state:RootState) => state.userId);
  const [isPending, startTransition] = useTransition();
    const userRole = useSelector((state: RootState) => state.role)
const navigate = useNavigate();
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

  return (
      <>
          <div className="profile__page">
              <div className="header__section">
                  <img src={profile} alt="Profile"/>
                  <div className="header__text">
                      <h1>{name === undefined ? "Name" : name}{" "}{surname === undefined ? "Surname" : surname}</h1>
                      <p className="header__username">{userName}</p>
                  </div>
              </div>
              <br></br>
              <div className="buttons__section">
                  {userRole === "ROLE_RESTAURANT_OWNER" &&
                      <button className={"buttons__section__button"} onClick={() => { navigate("/myRestaurants", { state: { refresh: true } })
                      }}><p className="button__text">My Restaurants</p></button>
                  }
                  <button className={"buttons__section__button"} onClick={() => {
                  }}><p className="button__text">Update Profile</p></button>
              </div>
          </div>
      </>
  );
};
export default MyProfilePage;
