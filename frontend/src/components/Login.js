// frontend/src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api"; // fixed import
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authAPI.login(email, password);

      // Expect backend: { user: {...}, token: "..." }
      const { user, token } = res.data || {};
      if (!user || !token) {
        setError("Invalid login response from server");
        return;
      }

      const normalizedUser = {
        ...user,
        role: user.role?.toLowerCase(),
      };

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      localStorage.setItem("token", token);

      // Update app state
      if (onLogin) {
        onLogin({ ...normalizedUser, token });
      }

      // Redirect based on role
      const targetPath = normalizedUser.role
        ? `/dashboard/${normalizedUser.role}`
        : "/dashboard";
      navigate(targetPath);
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <header className="login-header">
          <h1>Student Evaluation System</h1>
          <p>Sign in to continue</p>
        </header>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              // value="admin1@school.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@school.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              // value="admin123"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <footer className="login-footer">
          <p>
            <strong>Default:</strong> admin@school.com / admin123
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
