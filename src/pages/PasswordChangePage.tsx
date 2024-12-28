import React from "react";
import "../styles/PasswordChangePage.css";
import bitescoutLogo11 from "../assets/bitescout-green.png";

const PasswordChangePage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New password submitted.");
  };

  return (
    <div className="password-change-page">
      <div className="form-container">
        <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
        <h1 className="title">Set a New Password</h1>
        <form onSubmit={handleSubmit} className="password-change-form">
          <div className="input-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangePage;
