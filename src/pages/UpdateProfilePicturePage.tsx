import { useState } from "react";
import { useUserActions } from "../services/UserFunctions.tsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store.tsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useAuth } from "../context/AuthContext.tsx"; // Import useAuth for authentication handling
import { updateProfilePicture } from "../elementSlice"; // Import the action to update profile picture
import "../styles/UpdatePP.css";

const UpdateProfilePicturePage = () => {
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const userId = useSelector((state: RootState) => state.userId); // Access userId from Redux state
  const dispatch = useDispatch();
  const { handleUpdateUserPicture } = useUserActions();
  const navigate = useNavigate();
  const { logout } = useAuth();  // Use logout function if needed for session invalidation

  const handleUpdateProfilePicture = async () => {
    try {
      if (newProfilePicture) {
        setIsUploading(true);
        const imageUrl = await handleUpdateUserPicture(userId, newProfilePicture);
        setIsUploading(false);
        if (imageUrl) {
          // Dispatch the action to update the profile picture in Redux state
          dispatch(updateProfilePicture(imageUrl));
          navigate("/myProfile");
        }
      }
    } catch (err) {
      console.error("Error updating profile picture:", err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewProfilePicture(event.target.files[0]);
    }
  };

  return (
    <div className="profile-page">
      <h1>Update Profile Picture</h1>
      <input className="file-input" type="file" onChange={handleFileChange} />
      <button className="update-pic-button" onClick={handleUpdateProfilePicture}>Update Picture</button>
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default UpdateProfilePicturePage;
