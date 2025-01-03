import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegistrationComplete = () => {
    alert("Registration successful! Redirecting to login..");

    navigate("/login");
  };

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
