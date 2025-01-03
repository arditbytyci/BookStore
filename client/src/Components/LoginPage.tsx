import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);

    alert("login successful");
    navigate("/Home");
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin}></LoginForm>
    </div>
  );
};

export default LoginPage;
