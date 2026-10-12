import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";
import SymptomChecker from "./pages/SymptomChecker";
import HealthTips from "./pages/HealthTips";
import AppointmentHistory from "./pages/AppointmentHistory";

function App() {
  return (
    <Router>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Appointment Page */}
        <Route path="/appointment" element={<Appointment />} />

        {/* Symptom Checker */}
        <Route path="/symptoms" element={<SymptomChecker />} />

        {/* Health Tips */}
        <Route path="/healthtips" element={<HealthTips />} />

        <Route path="/history" element={<AppointmentHistory />} />

      </Routes>

    </Router>
  );
}

export default App;



