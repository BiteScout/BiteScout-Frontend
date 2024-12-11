import "../styles/ButtonWithText.css"; // Buton stil dosyası

interface ButtonWithTextProps {
  text: string; // Butonun metni
  func: (msg: string) => void; // Butona tıklandığında çağrılacak fonksiyon
  msg: string; // Fonksiyona gönderilecek mesaj
  className: string; // CSS sınıfı
}

export function ButtonWithText({
  text,
  func,
  msg,
  className,
}: ButtonWithTextProps) {
  return (
    <button className={className} onClick={() => func(msg)}>
      <p className="button-text">{text}</p> {/* Buton metni */}
    </button>
  );
}

export default ButtonWithText;
