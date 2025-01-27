import React, { useState } from "react";
import { login, register } from "./auth";
import img from "../img/login-img.jpg";
import "./auth-style.css";
import toast from "react-hot-toast";

const AuthFrom: React.FC<{
  onLogin: (token: string) => void;
  onRegistrationComplete: () => void;
}> = ({ onLogin, onRegistrationComplete }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [moveImage, setMoveImage] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(username, password);
      onLogin(token);
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(fullName, username, email, password);
      toast.success("Registration successful!");
      onRegistrationComplete();
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

  const handleRegistrationComplete = () => {
    setMoveImage(!moveImage);
  };

  const handleImageMove = () => {
    setMoveImage(!moveImage); // Toggle the image position
    document.body.style.overflow = moveImage ? "hidden" : "visible";
  };

  return (
    <div className="login-container">
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
            onClick={handleRegistrationComplete}
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
        onSubmit={handleLoginSubmit}
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

export default AuthFrom;
