import "../styles/RestaurantHeader.css";
import {useState} from "react";

// Props türünü tanımlıyoruz
interface RestaurantHeaderProps {
  name: string; // Restoran adı
  logo: string; // Logo URL'si
  rating: number; // Restoran puanı
  rank: string; // Restoran sıralaması
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  name,
  logo,
  rating,
  rank,
}) => {
  const [imageSelected, setImageSelected] = useState<boolean>(false);

  return (
    <div className="restaurant-header">
      <img src={logo} alt={`${name} logo`} className="restaurant-logo" onClick={() => setImageSelected(true)}/>

      <div className="restaurant-info">
        <h1 className="restaurant-name">{name}</h1>
        <p className="restaurant-rating">Rating: ⭐ {rating.toFixed(1)}/5</p>
        <p className="restaurant-rank">Rank: {rank}</p>
      </div>
      {imageSelected && (
          <div className="modal" onClick={() => setImageSelected(false)}>
            <img src={logo} alt="Selected" className="modal-image" />
          </div>
      )}
    </div>
  );
};

export default RestaurantHeader;
