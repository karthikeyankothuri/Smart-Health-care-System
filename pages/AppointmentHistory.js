import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/PageStyle.css";

function AppointmentHistory() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5001/appointments");

      console.log("DATA:", res.data);  // 🔥 DEBUG

      // 🔥 FIX: ensure it's array
      if (Array.isArray(res.data)) {
        setAppointments(res.data);
      } else {
        setAppointments([]);
      }

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="page-container">

      <Navbar />

      <div className="page-card">

        <h2>Appointment History</h2>

        {appointments.length === 0 ? (
          <p>No appointments yet</p>
        ) : (
          <ul style={{ textAlign: "left" }}>
            {appointments.map((a, i) => (
              <li key={i}>
                <b>{a.name}</b> booked with <b>{a.doctor}</b> at <b>{a.slot}</b>
              </li>
            ))}
          </ul>
        )}

      </div>

    </div>
  );
}

export default AppointmentHistory;