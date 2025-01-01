import "../styles/StartPage.css";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";

const StartPage = () => {
  return (
    <div className="start-page">
      <img className="logo" src={bitescoutLogo11} alt="Logo" />
      <div className="content">
        <h1 className="catchphrase">Welcome to BiteScout</h1>
        <p className="subtitle">
          Your go-to platform for restaurant reservations
        </p>
        <div className="buttons">
          <a href="/#/login" className="btn login-btn">
            Log In
          </a>
          <a href="/#/signin/Customer" className="btn signup-btn">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
