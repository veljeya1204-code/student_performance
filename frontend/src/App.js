// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import AdminDashboard from "./dashboards/AdminDashboard";
import TeacherDashboard from "./dashboards/TeacherDashboard";
import StudentDashboard from "./dashboards/StudentDashboard";
import ParentDashboard from "./dashboards/ParentDashboard";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.role = parsedUser.role?.toLowerCase();
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Invalid stored user, clearing:", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    const normalizedUser = {
      ...userData,
      role: userData.role?.toLowerCase(),
    };

    setUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    if (userData.token) localStorage.setItem("token", userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    // Force reload to clear any cached state
    window.location.href = "/";
  };

  // Role-based dashboard component selector
  const getDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case "teacher":
        return <TeacherDashboard user={user} onLogout={handleLogout} />;
      case "student":
        return <StudentDashboard user={user} onLogout={handleLogout} />;
      case "parent":
        return <ParentDashboard user={user} onLogout={handleLogout} />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public login route */}
      <Route
        path="/login"
        element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />}
      />

      {/* Protected dashboard route */}
      <Route
        path="/dashboard/*"
        element={user ? getDashboard() : <Navigate to="/login" replace />}
      />

      {/* Root redirect */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
