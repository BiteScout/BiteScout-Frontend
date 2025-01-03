import "../styles/SettingsPage.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store.tsx";
import { useUserActions, userUpdate } from "../services/UserFunctions.tsx";
import { useState, useEffect } from "react";
import { addElement, updateUsername } from "../elementSlice.tsx";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "../styles/react-confirm-alert.css"; // Import default styles

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { handleUpdateUser, handleFetchUserInfo } = useUserActions();
  const userId = useSelector((state: RootState) => state.userId);

  const [userData, setUserData] = useState<userUpdate>({
    id: userId,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await handleFetchUserInfo(userId);
      if (user) {
        setUserData({
          id: user.id,
          username: user.username,
          firstName: user.userDetails.firstName,
          lastName: user.userDetails.lastName,
          phoneNumber: user.userDetails.phoneNumber,
          country: user.userDetails.country,
          city: user.userDetails.city,
          postalCode: user.userDetails.postalCode,
          address: user.userDetails.address,
        });
      }
    };
    fetchUserDetails();
  }, [userId, handleFetchUserInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Show a stylish confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to update your information?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateUser(userData)
          .then(() => {
            dispatch(updateUsername(userData.username));
            Swal.fire('Updated!', 'Your information has been updated.', 'success');
          })
          .catch(() => {
            Swal.fire('Failed!', 'Failed to update user information.', 'error');
          });
      }
    });
  };

  return (
    <div className="settings-page">
      <div className="form-container-settings">
        <h1 className="title-settings">Account Settings</h1>
        <form onSubmit={handleUpdate} className="settings-form">
          <div className="input-group-settings">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              onChange={handleChange}
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={userData.country}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={userData.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={userData.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-settings">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-button-settings">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
