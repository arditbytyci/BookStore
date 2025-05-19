import React, { useState, useEffect } from "react";
import { login, register } from "./auth";
import img from "../img/login-img.jpg";
import "./auth-style.css";
import toast from "react-hot-toast";
import previous from "../assets/previous.png";
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC<{
  onLogin: (token: string) => void;
  onRegistrationComplete: () => void;
}> = ({ onLogin, onRegistrationComplete }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [moveImage, setMoveImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setEmail("");
    setFullName("");
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(username, password);
      onLogin(token);

      setUsername("");
      setPassword("");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Invalid username or password.",
      );
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(fullName, username, email, password);
      toast.success("Registration successful!");
      onRegistrationComplete();
      // Clear form fields after successful registration
      setEmail("");
      setPassword("");
      setUsername("");
      setFullName("");
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err: string) => toast.error(err));
      } else {
        toast.error("Registration failed, please try again.");
      }
    }
  };

  const handleImageMove = () => {
    setMoveImage(!moveImage); // Toggle the image position
    document.body.style.overflow = moveImage ? "hidden" : "visible";

    setUsername("");
    setPassword("");
    setEmail("");
    setFullName("");
  };

  return (
    <div className="login-container ">
      <img
        src={previous}
        alt=""
        className="w-10 h-10 cursor-pointer absolute left-0 top-5"
        onClick={() => navigate("/")}
      />
      <div className="image-container shadow-xl">
        <form
          onSubmit={handleRegisterSubmit}
          className="register-container-left relative shadow-xl"
        >
          <div className={`cover absolute ${moveImage ? "moved-image" : ""}`}>
            <img src={img} alt="" className="img" />
          </div>
          <h3>Register</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="btn btn-sm w-[100px] bg-button-color rounded-2xl text-white mt-3 font-thin hover:bg-transparent hover:border-button-color hover:text-gray-800"
          >
            Register
          </button>
          <p className="mt-5">
            Already have an account?{" "}
            <a className="link" onClick={handleImageMove}>
              Login
            </a>
          </p>
        </form>
      </div>

      <form
        autoComplete="off"
        onSubmit={handleLoginSubmit}
        className={`login-container-right ${moveImage ? "hide" : ""}`}
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
          className="btn btn-sm w-[100px] bg-button-color text-white font-thin  hover:bg-transparent hover:border-button-color hover:text-gray-800 mt-3 rounded-2xl"
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

export default AuthForm;
