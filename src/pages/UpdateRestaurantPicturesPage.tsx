import { useState } from "react";
import { useRestaurantActions } from "../services/RestaurantFunctions.tsx";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../styles/UpdatePP.css";

const UpdateRestaurantPicturesPage = () => {
  const [newPicture, setNewPicture] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { handleUpdateRestaurantPicture, handleDeleteAllPictures } = useRestaurantActions();
  const navigate = useNavigate();
  const { restaurantId } = useParams<{ restaurantId: string }>();

  // Handle File Change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewPicture(event.target.files[0]);
    }
  };

  // Handle Picture Update with Confirmation
  const handleUpdatePicture = async () => {
    if (!newPicture) {
      Swal.fire("Error", "Please select a picture to upload.", "error");
      return;
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upload the restaurant picture?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, upload it!",
    });

    if (confirmation.isConfirmed) {
      try {
        setIsUploading(true);

        if (restaurantId) {
          const response = await handleUpdateRestaurantPicture(restaurantId, newPicture);

          if (response) {
            Swal.fire("Success!", "Picture uploaded successfully.", "success");
          } else {
            Swal.fire("Error", "Failed to upload the picture.", "error");
          }
        }
      } catch (err) {
        Swal.fire("Error", "An error occurred during the upload.", "error");
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle Delete Pictures with Confirmation
  const handleDeletePictures = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete all pictures, including the restaurant logo. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    });

    if (confirmation.isConfirmed) {
      try {
        if (restaurantId) {
          await handleDeleteAllPictures(restaurantId);
          Swal.fire("Success!", "All pictures deleted successfully.", "success");
        }
      } catch (err) {
        Swal.fire("Error", "An error occurred during the deletion.", "error");
        console.error(err);
      }
    }
  };

  return (
    <div className="profile-page">
      <h1>Update Restaurant Pictures</h1>
      <input className="file-input" type="file" onChange={handleFileChange} />
      <button className="update-pic-button" onClick={handleUpdatePicture}>
        Upload Restaurant Pictures
      </button>
      {isUploading && <p>Uploading...</p>}

      <p>
        <strong>Warning!</strong> The <strong>first picture</strong> upload will be your restaurant's logo. If you want to change your restaurant's logo, delete all pictures from the system and upload the first one as your restaurant logo.
      </p>
      <button className="delete-pic-button" onClick={handleDeletePictures}>
        Delete All Pictures
      </button>
    </div>
  );
};

export default UpdateRestaurantPicturesPage;
