import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form-column">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="register-text mt-3">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
