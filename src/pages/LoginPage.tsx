import "../styles/LoginPage.css";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import useAxios from "../interceptors/AxiosInstance.tsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const {login} = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("auth/login", {
          username: email,
          password: password,
/*          email: "johndoe2@example.com",
          role: "CUSTOMER"*/
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        login();
        navigate("/");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
{/*        <form onSubmit={handleSubmit} className="login-form">*/}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">
            <a href="/password-reset">Forgot your password?</a>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Log In
          </button>
{/*        </form>*/}
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
