import "../styles/ButtonWithIcon.css";

interface ButtonWithIconProps {
  src: string; // Butonun ikonunu temsil eden görselin yolu
  func: (msg: string) => void; // Butona tıklandığında çağrılacak fonksiyon
  msg: string; // Fonksiyona gönderilecek mesaj
  className: string; // CSS sınıfı
}

export function ButtonWithIcon({
  src,
  func,
  msg,
  className,
}: ButtonWithIconProps) {
  return (
    <button className={className} onClick={() => func(msg)}>
      <img src={src} alt="button icon" className="button-icon" />
    </button>
  );
}

export default ButtonWithIcon;
