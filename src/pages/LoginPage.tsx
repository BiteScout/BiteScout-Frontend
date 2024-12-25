import "../styles/LoginPage.css";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="forgot-password">
            <a href="/password-reset">Forgot your password?</a>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
