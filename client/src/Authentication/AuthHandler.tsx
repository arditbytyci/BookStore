import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

import "./auth-style.css";
import toast from "react-hot-toast";
import AuthForm from "./AuthForm";

const AuthHandler: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegistrationComplete = () => {
    navigate("/login");
  };

  const handleLogin = (token: string) => {
    login(token);

    toast.success("Login successful!");
    navigate("/Home");
  };

  return (
    <div className="flex justify-center items-center">
      <AuthForm
        onLogin={handleLogin}
        onRegistrationComplete={handleRegistrationComplete}
      ></AuthForm>
    </div>
  );
};

export default AuthHandler;
