import React, { useState } from "react";
import { register } from "../../api/auth";
import "./register.css";
import img from "../../img/login-img.jpg";
export const RegisterForm: React.FC<{
  onRegistrationComplete: () => void;
}> = ({ onRegistrationComplete }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(username, email, password);
      alert("Registration successful! You can now log in.");
      onRegistrationComplete();
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container relative">
      <div className="image-container shadow-xl">
        <img src={img} alt="login-img" />
      </div>
      <form onSubmit={handleSubmit} className="shadow-xl">
        <h3>Register</h3>
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
          className="btn btn-sm w-[100px] bg-button-color rounded-2xl text-white mt-3"
        >
          Register
        </button>
      </form>
    </div>
  );
};
