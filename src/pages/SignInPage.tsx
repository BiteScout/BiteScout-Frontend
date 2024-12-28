import "../styles/SignInPage.css";
import bitescoutLogo11 from "../assets/bitescout-green.png";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {useAuthActions} from "../services/AuthFunctions.tsx";


const SignInPage = () => {
  let userType = useParams().userType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const {handleRegister} = useAuthActions()

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({
      email:email,
      password:password,
      userName: userName,
      userType: userType});
  }


  return (
    <div className="sign-in-page">
      <div className="sign-in-form-container">
        <img className="header__logo" src={bitescoutLogo11} alt="Logo"/>
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
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserName(e.target.value)
                }}
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
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value)
                }}
            />
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
              <a href="/#/signin/Customer">Sign In</a>
            </div>
            :
            <div className="login-link">
              Do you want to sign in as a restaurant owner?
              <a href="/#/signin/RestaurantOwner">Sign In</a>
            </div>
        }
      </div>
    </div>
  );
};

export default SignInPage;
