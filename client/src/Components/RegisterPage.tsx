import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegistrationComplete = () => {
    navigate("/login");
  };

  return (
    <div>
      <RegisterForm onRegistrationComplete={handleRegistrationComplete} />
    </div>
  );
};

export default RegisterPage;
