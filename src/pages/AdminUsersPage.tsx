import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { user, useUserActions } from "../services/UserFunctions.tsx";
import { RootState } from "../store.tsx";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "../styles/MyRestaurantsPage.css";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<user[]>([]);
  const navigate = useNavigate();
  const { handleFetchAllUsers, handleRemoveUser } = useUserActions();
  const userId = useSelector((state: RootState) => state.userId);
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchUsers = async () => {
      await delay(100);
      const users = await handleFetchAllUsers();
      if (users !== undefined) {
        setUsers(users);
      }
    };
    fetchUsers();
  }, [userId, handleFetchAllUsers]);

  const handleDeleteUser = async (userId: string) => {
    try {
      await handleRemoveUser(userId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleDeleteClick = (userId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(userId);
        Swal.fire(
          'Deleted!',
          'The user has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="my-restaurants-page">
      <h1 className="page-title">User Manager</h1>

      <div key={users.length} className="restaurant-list">
        {users.map((user, index) => (
          <div key={index} className="restaurant-card">
            <div className="restaurant-info" onClick={() => navigate(`/editUser/${user.id}`)}>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
            <button
              className="edit-button2"
              onClick={() => navigate(`/editUser/${user.id}`)} // Navigate to the edit page
            >
              <span className="edit-icon"></span>
            </button>
            <button 
              className="delete-button2"
              onClick={() => handleDeleteClick(user.id)} // Trigger the SweetAlert2 for delete
            >
              <span className="delete-icon"></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
