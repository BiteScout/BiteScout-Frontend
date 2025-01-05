import "../styles/ImageGallery.css";
import {useState} from "react";

// Props türünü tanımlıyoruz
interface ImageGalleryProps {
  images: string[]; // images bir string dizisi
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to handle image click
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
      <div>
        <div className="image-gallery">
          {images.map((image: string, index: number) => (
              <img
                  key={index}
                  src={image}
                  alt={`Restaurant image ${index + 1}`}
                  className="gallery-image"
                  onClick={() => handleImageClick(image)} // Image click handler
              />
          ))}
        </div>

        {/* Modal for the selected image */}
        {selectedImage && (
            <div className="modal" onClick={closeModal}>
              <img src={selectedImage} alt="Selected" className="modal-image" />
            </div>
        )}
      </div>
  );
};

export default ImageGallery;
