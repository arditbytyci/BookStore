import React, { useState } from "react";
import { login } from "../../api/auth";
import img from "../../img/login-img.jpg";
import "./login.css";
import { RegisterForm } from "../Register/RegisterForm";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC<{ onLogin: (token: string) => void }> = ({
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [moveImage, setMoveImage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(username, password);
      onLogin(token);
    } catch (error) {
      alert("Invalid credentials!");
    }
  };
  const handleRegistrationComplete = () => {
    navigate("/login");
  };

  const handleImageMove = () => {
    setMoveImage(!moveImage); // Toggle the image position
    document.body.style.overflow = moveImage ? "hidden" : "visible";
  };

  return (
    <div className="login-container">
      <div className="image-container shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="register-container-left relative shadow-xl"
        >
          <div className={`cover absolute ${moveImage ? "moved-image" : ""}`}>
            <img src={img} alt="" className="img" />
          </div>
          <h3>Register</h3>
          <input
            type="text"
            placeholder="Full Name"
            className="input focus:outline-none focus:ring-0 font-thin"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input focus:outline-none focus:ring-0 font-thin"
          />
          <input
            type="email"
            placeholder="Email"
            className="input focus:outline-none focus:ring-0 font-thin"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input focus:outline-none focus:ring-0 font-thin"
          />
          <button
            type="submit"
            className="btn btn-sm w-[100px] bg-button-color rounded-2xl text-white mt-3"
          >
            Register
          </button>
          <p className="mt-5">
            Don't have an account?{" "}
            <a className="link" onClick={handleImageMove}>
              Login
            </a>
          </p>
        </form>
      </div>

      <form
        onSubmit={handleSubmit}
        className={` login-container-right ${moveImage ? "hide" : ""}`}
      >
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input focus:outline-none focus:ring-0 font-thin"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input focus:outline-none focus:ring-0 font-thin"
        />
        <button
          type="submit"
          className="btn btn-sm w-[100px] bg-button-color text-white font-semibold mt-3 rounded-2xl"
        >
          Login
        </button>
        <p className="mt-5">
          Don't have an account?{" "}
          <a className="link" onClick={handleImageMove}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
