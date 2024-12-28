import "../styles/SignInPage.css";
import bitescoutLogo11 from "../assets/bitescout-green.png";

const SignInPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sign In Form Submitted");
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-form-container">
        <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
        <form onSubmit={handleSubmit} className="sign-in-form">
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              required
            />
          </div>
          <button type="submit" className="sign-in-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
