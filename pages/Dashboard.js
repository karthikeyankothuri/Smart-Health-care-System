import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  // 🔐 Protect dashboard (optional but important)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-header">
        <h1>Welcome to Smart Health Care System</h1>
        <p>Select a service to continue</p>
      </div>

      <div className="dashboard-cards">

        <div className="card" onClick={() => navigate("/appointment")}>
          <h2>📅</h2>
          <h3>Book Appointment</h3>
          <p>Schedule a doctor visit</p>
        </div>

        <div className="card" onClick={() => navigate("/symptoms")}>
          <h2>🩺</h2>
          <h3>Symptom Checker</h3>
          <p>Check possible health conditions</p>
        </div>

        <div className="card" onClick={() => navigate("/healthtips")}>
          <h2>💡</h2>
          <h3>Health Tips</h3>
          <p>Get daily medical advice</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
