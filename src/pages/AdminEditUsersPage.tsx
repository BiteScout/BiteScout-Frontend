import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserActions, userUpdate } from "../services/UserFunctions.tsx";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "../styles/SettingsPage.css"; // Assuming styles are similar

const AdminEditUsersPage = () => {
  const { userId } = useParams<{userId:string}>(); // Get the userId from URL
  const { handleFetchUserInfo, handleUpdateUser } = useUserActions();
  const navigate = useNavigate();

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
      if (userId) {
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
      text: "Do you really want to update this user's information?",
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
            Swal.fire('Updated!', 'The user information has been updated.', 'success');
            navigate('/adminUsers'); // Redirect to the user list after updating
          })
          .catch(() => {
            Swal.fire('Failed!', 'Failed to update user information.', 'error');
          });
      }
    });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="settings-page">
      <div className="form-container-settings">
        <h1 className="title-settings">Edit User</h1>
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
          <button
            type="button"
            className="cancel-button-settings"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUsersPage;
