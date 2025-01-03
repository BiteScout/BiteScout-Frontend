import "../styles/SignInPage.css";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {useAuthActions} from "../services/AuthFunctions.tsx";

const SignInPage = () => {
  let userType = useParams().userType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const {handleRegister} = useAuthActions()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({
      email: email,
      password: password,
      userName: userName,
      userType: userType
    });
  };

  return (
    <div className="sign-in-page">
      <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
      <div className="sign-in-form-container">
        <form onSubmit={handleSubmit} className="sign-in-form">
          <div className="input-group">
            {userType === "RestaurantOwner" ?
              <h1>Sign in as a Restaurant Owner</h1>
              :
              <h1>Sign in as a Customer</h1>
            }
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
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
              minLength={6} // Enforcing minimum length for username
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(e.target.value)
              }}
            />
            <small>Username must be at least 6 characters long</small>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              required
              minLength={8} // Enforcing minimum length for password
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" // Enforcing the password pattern (at least one letter and one number)
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
            />
            <small>Password must be at least 8 characters long and contain at least one letter and one number</small>
          </div>
          <button type="submit" className="sign-in-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/#/login">Log In</a>
        </div>
        {userType === "RestaurantOwner" ?
          <div className="login-link">
            Do you want to sign in as a customer? 
            <a href="/#/signin/Customer"> Sign In</a>
          </div>
          :
          <div className="login-link">
            Do you want to sign in as a restaurant owner? 
            <a href="/#/signin/RestaurantOwner"> Sign In</a>
          </div>
        }
      </div>
    </div>
  );
};

export default SignInPage;
