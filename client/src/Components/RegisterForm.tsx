import React, { useState } from "react";
import { register } from "../api/auth";

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
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
