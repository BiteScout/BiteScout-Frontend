import "../styles/LoginPage.css";
import bitescoutLogo11 from "../assets/bitescout-green.png";
import { useState } from "react";
import { useAuthActions } from "../services/AuthFunctions.tsx";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useAuthActions();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
        handleLogin({ username, password }); // Call the login handler with form data
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        <a href="/#/approvePassword">Forgot your password?</a>
                    </div>
                    <button className="login-button" type="submit">
                        Log In
                    </button>
                </form>
                <div className="signup-link">
                    Don't have an account? <a href="/#/signin/Customer">Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
