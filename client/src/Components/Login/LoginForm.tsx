import React, { useState } from "react";
import { login } from "../../api/auth";
import img from "../../img/login-img.jpg";
import "./login.css";

const LoginForm: React.FC<{ onLogin: (token: string) => void }> = ({
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [moveImage, setMoveImage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(username, password);
      onLogin(token);
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  const handleImageMove = () => {
    setMoveImage(!moveImage); // Toggle the image position
  };

  return (
    <div className="login-container relative">
      {/* <div
        className={`image-container shadow-xl ${
          moveImage ? "moved-image" : ""
        }`}
      >
        <img src={img} alt="login-img" className="" />
      </div> */}
      {/* <div className="image-container shadow-xl">
        <img src={img} alt="login-img" />
      </div> */}
      <div className="image-container shadow-xl">
        <img src={img} alt="login-img" />
      </div>
      {moveImage ? (
        <>
          {" "}
          <form onSubmit={handleSubmit} className="shadow-xl relative">
            <h2>Register</h2>
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
              Already have an account?{" "}
              <a className="link" onClick={handleImageMove}>
                Register
              </a>
            </p>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="shadow-xl">
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
                Login
              </a>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;

// {!moveImage ? (
//   <>
//     <div
//       className={`image-container shadow-xl ${
//         moveImage ? "moved-image" : ""
//       }`}
//     >
//       <img src={img} alt="login-img" className="absolute" />
//     </div>
//     <form
//       onSubmit={handleSubmit}
//       className={`shadow-xl ${moveImage ? "hidden" : ""}`}
//     >
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="input focus:outline-none focus:ring-0 font-thin"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="input focus:outline-none focus:ring-0 font-thin"
//       />
//       <button
//         type="submit"
//         className="btn btn-sm w-[100px] bg-button-color text-white font-semibold mt-3 rounded-2xl"
//       >
//         Login
//       </button>
//       <button
//         type="button"
//         onClick={handleImageMove}
//         className="btn btn-sm w-[100px] bg-gray-500 text-white font-semibold mt-3 rounded-2xl"
//       >
//         Move Image
//       </button>
//       <p>
//         Dont have an account? <a onClick={handleImageMove}>Register</a>
//       </p>
//     </form>
//   </>
// ) : (
//   <>
//     <div
//       className={`image-container shadow-xl ${
//         moveImage ? "moved-image" : ""
//       }`}
//     ></div>
//     <form onSubmit={handleSubmit} className="shadow-xl ">
//       <h3>Register</h3>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="input focus:outline-none focus:ring-0 font-thin"
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         className="input focus:outline-none focus:ring-0 font-thin"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="input focus:outline-none focus:ring-0 font-thin"
//       />
//       <button
//         type="submit"
//         className="btn btn-sm w-[100px] bg-button-color rounded-2xl text-white mt-3"
//       >
//         Register
//       </button>
//       <p>
//         Already have an account? <a onClick={handleImageMove}>Login</a>
//       </p>
//     </form>
//   </>
// )}
