import React, { useState } from "react";
import { login } from "../../api/auth";
import img from "../../img/login-img.jpg";
import "./login.css";
const LoginForm: React.FC<{ onLogin: (token: string) => void }> = ({
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(username, password);
      onLogin(token);
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container relative">
      <div className="image-container shadow-xl">
        <img src={img} alt="login-img" />
      </div>
      <form onSubmit={handleSubmit} className="shadow-xl">
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
      </form>
    </div>
  );
};

export default LoginForm;
