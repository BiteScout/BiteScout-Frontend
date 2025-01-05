import { useState } from "react";
import { useUserActions } from "../services/UserFunctions.tsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store.tsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useAuth } from "../context/AuthContext.tsx";
import { updateProfilePicture } from "../elementSlice";
import "../styles/UpdatePP.css";

const UpdateProfilePicturePage = () => {
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const userId = useSelector((state: RootState) => state.userId);
  const dispatch = useDispatch();
  const { handleUpdateUserPicture } = useUserActions();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Function to handle profile picture update
  const handleUpdateProfilePicture = async () => {
    try {
      if (newProfilePicture) {
        // Show SweetAlert2 confirmation dialog
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to update your profile picture?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        });

        if (result.isConfirmed) {
          setIsUploading(true);

          // Upload the profile picture
          const imageUrl = await handleUpdateUserPicture(userId, newProfilePicture);

          setIsUploading(false);

          if (imageUrl) {
            // Update Redux state
            dispatch(updateProfilePicture(imageUrl));

            // Show success alert
            await Swal.fire({
              title: "Success!",
              text: "Your profile picture has been updated.",
              icon: "success",
            });

            navigate("/myProfile");
          }
        }
      }
    } catch (err) {
      setIsUploading(false);

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating your profile picture.",
        icon: "error",
      });

      console.error("Error updating profile picture:", err);
    }
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewProfilePicture(event.target.files[0]);
    }
  };

  return (
    <div className="profile-page">
      <h1>Update Profile Picture</h1>
      <input className="file-input" type="file" onChange={handleFileChange} />
      <button className="update-pic-button" onClick={handleUpdateProfilePicture}>
        Update Picture
      </button>
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default UpdateProfilePicturePage;
