import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useAuth } from "../Authentication/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (token: string) => {
    login(token);

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
