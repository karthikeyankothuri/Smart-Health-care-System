import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password
      });

      alert(response.data.message);
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");

    } catch (error) {
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>SMART HEALTHCARE AI</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <span>👤</span>
            <input
              type="email"
              placeholder="Username / Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">SECURE LOGIN</button>

        </form>

        <div className="extra-links">
          <span>Forgot Password?</span>
          <span>Request Access</span>
        </div>

      </div>

    </div>
  );
}

export default Login;