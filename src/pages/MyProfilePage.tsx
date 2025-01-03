import "../styles/ProfilePage.css";
import profile from "../assets/Untitled-1.png";
import { useEffect, useState, useTransition } from "react";
import { useUserActions } from "../services/UserFunctions.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";  // Import useAuth for logout functionality
import Swal from "sweetalert2";  // Import SweetAlert2

const MyProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState(""); // State for city
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { handleFetchUserInfo, handleRemoveUser } = useUserActions();
  const userId = useSelector((state: RootState) => state.userId);
  const [isPending, startTransition] = useTransition();
  const userRole = useSelector((state: RootState) => state.role);
  const navigate = useNavigate();
  const { logout } = useAuth();  // Access logout function

  useEffect(() => {
    startTransition(() => {
      // Perform the async task inside startTransition
      const data = handleFetchUserInfo(userId);
      data.then((dataValue: any) => {
        setName(dataValue.userDetails.firstName);
        setSurname(dataValue.userDetails.lastName);
        setUserName(dataValue.username);
        setCity(dataValue.userDetails.city); // Set the city from userInfo
      });
    });
  }, [userId, handleFetchUserInfo]); // Add userId as dependency to refetch on change

  const handleDeleteAccount = async () => {
    try {
      await handleRemoveUser(userId);  // Delete user account
      logout();  // Call logout to clear authentication state
      navigate("/login");  // Redirect user to login page after deletion
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const showDeleteConfirmation = () => {
    // SweetAlert2 confirmation for account deletion
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, your account cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAccount();
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <div className="profile__page">
        <div className="header__section">
          <img src={profile} alt="Profile" />
          <div className="header__text">
            <h1>{name === undefined ? "Name" : name}{" "}{surname === undefined ? "Surname" : surname}</h1>
            <p className="header__username">{userName}</p>
            <p className="header__city">{city === undefined ? "City" : city}</p> {/* Display the city */}
          </div>
        </div>
        <br />
        <div className="buttons__section">
          {userRole === "ROLE_RESTAURANT_OWNER" && (
            <button
              className={"buttons__section__button"}
              onClick={() => {
                navigate("/myRestaurants", { state: { refresh: true } });
              }}
            >
              <p className="button__text">My Restaurants</p>
            </button>
          )}
          <button
            className={"buttons__section__button"}
            onClick={() => {
              navigate("/myProfile/settings");
            }}
          >
            <p className="button__text">Account Settings</p>
          </button>
          <button
            className={"buttons__section__button"}
            onClick={showDeleteConfirmation}  // Trigger SweetAlert2 confirmation for deletion
          >
            <p className="button__text">Delete Account</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
