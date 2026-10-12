import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/";
  };

  return (
    <div style={styles.navbar}>

      <h2 style={styles.title}>Smart Health Care System</h2>

      <div style={styles.links}>

        <Link to="/dashboard" style={styles.link}>Home</Link>

        <Link to="/history">History</Link>

        <Link to="/appointment" style={styles.link}>Appointment</Link>

        <Link to="/symptoms" style={styles.link}>Symptom Checker</Link>

        <Link to="/healthtips" style={styles.link}>Health Tips</Link>

        <span style={styles.logout} onClick={handleLogout}>
          Logout
        </span>

      </div>

    </div>
  );
}

const styles = {

  navbar: {
    background: "linear-gradient(90deg, #1e6be3, #0d4ecb)",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
  },

  title: {
    color: "white",
    fontSize: "22px",
    fontWeight: "bold"
  },

  links: {
    display: "flex",
    gap: "20px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500"
  },

  logout: {
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    background: "red",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default Navbar;