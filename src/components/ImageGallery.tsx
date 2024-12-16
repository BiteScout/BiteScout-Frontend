import "../styles/ImageGallery.css";

// Props türünü tanımlıyoruz
interface ImageGalleryProps {
  images: string[]; // images bir string dizisi
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="image-gallery">
      {images.map((image: string, index: number) => (
        <img
          key={index}
          src={image}
          alt={`Restaurant image ${index + 1}`}
          className="gallery-image"
        />
      ))}
    </div>
  );
};

export default ImageGallery;
