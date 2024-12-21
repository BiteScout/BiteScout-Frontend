import "../styles/RestaurantDetails.css";

// Props türünü tanımlıyoruz
interface RestaurantDetailsProps {
  address: string; // Restoran adresi
  phone: string; // Restoran telefon numarası
  menuLink?: string; // Restoran menüsüne bağlantı
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  address,
  phone,
  menuLink,
}) => {
  return (
    <div className="restaurant-details">
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Menu:</strong>{" "}
        <a href={menuLink} target="_blank" rel="noopener noreferrer">
          View Menu
        </a>
      </p>
    </div>
  );
};

export default RestaurantDetails;
