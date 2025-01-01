import React from "react";
import "../styles/PasswordChangeApprovalPage.css";
import bitescoutLogo11 from "../assets/bitescout-logo1-1.png";

const PasswordChangeApprovalPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted for password reset.");
  };

  return (
    <div className="password-change-page">
       <img className="header__logo" src={bitescoutLogo11} alt="Logo" />
      <div className="form-container">
        <h1 className="title">Reset Your Password</h1>
        <p className="subtitle">
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="password-change-form">
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
          <button type="submit" className="submit-button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeApprovalPage;
