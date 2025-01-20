import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useAuth } from "../../Authentication/AuthContext";
import { RegisterForm } from "../Register/RegisterForm";
import img from "../../img/login-img.jpg";
import "./login.css";

const LoginHandler: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegistrationComplete = () => {
    navigate("/login");
  };

  const handleLogin = (token: string) => {
    login(token);

    alert("login successful");
    navigate("/Home");
  };

  return (
    <div className="test-container">
      <LoginForm onLogin={handleLogin}></LoginForm>
      {/* <RegisterForm onRegistrationComplete={handleRegistrationComplete} /> */}
    </div>
  );
};

export default LoginHandler;
