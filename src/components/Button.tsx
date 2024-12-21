import "../styles/RestaurantPageButton.css";

// Props türünü tanımlıyoruz
interface ButtonProps {
  text: string; // Button'un metni
  onClick?: () => void; // Opsiyonel bir tıklama işlevi
  link?: string; // Opsiyonel bir bağlantı
}

const Button: React.FC<ButtonProps> = ({ text, onClick, link }) => {
  return link ? (
    <a href={link} className="button">
      {text}
    </a>
  ) : (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
