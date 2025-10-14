import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

import './Register.css';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", { name, email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form-column">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </button>
        </form>
        <p className="login-text mt-3">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
