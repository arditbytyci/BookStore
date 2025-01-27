import { useNavigate } from "react-router-dom";
import AuthFrom from "./AuthForm";
import { useAuth } from "./AuthContext";

import "./auth-style.css";
import toast from "react-hot-toast";

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
    <div className="test-container">
      <AuthFrom
        onLogin={handleLogin}
        onRegistrationComplete={handleRegistrationComplete}
      ></AuthFrom>
    </div>
  );
};

export default AuthHandler;
