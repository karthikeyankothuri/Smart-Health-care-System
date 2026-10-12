import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/PageStyle.css";

function Appointment() {

  // 🔥 DOCTORS WITH IMAGES
  const doctors = [
    { name: "Dr. Smith", specialization: "General Physician", image: "https://randomuser.me/api/portraits/men/1.jpg", slots: ["10:00 AM", "11:00 AM"] },
    { name: "Dr. Priya", specialization: "Dermatologist", image: "https://randomuser.me/api/portraits/women/2.jpg", slots: ["12:00 PM", "3:00 PM"] },
    { name: "Dr. Kumar", specialization: "Neurologist", image: "https://randomuser.me/api/portraits/men/3.jpg", slots: ["11:00 AM", "4:00 PM"] },
    { name: "Dr. John", specialization: "Cardiologist", image: "https://randomuser.me/api/portraits/men/4.jpg", slots: ["9:00 AM", "1:00 PM"] },
    { name: "Dr. Meena", specialization: "Gynecologist", image: "https://randomuser.me/api/portraits/women/5.jpg", slots: ["10:30 AM", "2:30 PM"] },
    { name: "Dr. Ravi", specialization: "Orthopedic", image: "https://randomuser.me/api/portraits/men/6.jpg", slots: ["11:30 AM", "3:30 PM"] },
    { name: "Dr. Arjun", specialization: "Pediatrician", image: "https://randomuser.me/api/portraits/men/7.jpg", slots: ["9:30 AM", "12:30 PM"] },
    { name: "Dr. Sneha", specialization: "ENT Specialist", image: "https://randomuser.me/api/portraits/women/8.jpg", slots: ["1:00 PM", "4:00 PM"] },
    { name: "Dr. Rahul", specialization: "Psychiatrist", image: "https://randomuser.me/api/portraits/men/9.jpg", slots: ["10:00 AM", "2:00 PM"] },
    { name: "Dr. Anjali", specialization: "Ophthalmologist", image: "https://randomuser.me/api/portraits/women/10.jpg", slots: ["11:00 AM", "3:00 PM"] }
  ];

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    symptoms: ""
  });

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SMART FILTER
  const suggestDoctors = () => {
    const input = form.symptoms.toLowerCase();

    if (input.includes("skin"))
      return doctors.filter(d => d.specialization === "Dermatologist");

    if (input.includes("heart"))
      return doctors.filter(d => d.specialization === "Cardiologist");

    if (input.includes("head"))
      return doctors.filter(d => d.specialization === "Neurologist");

    return doctors;
  };

  const handleSearch = () => {
    setFilteredDoctors(suggestDoctors());
    setMessage("");
  };

  // 🔥 BOOKING
  const handleBooking = async () => {

    if (!form.name || !form.age || !form.phone) {
      setMessage("Fill all details");
      return;
    }

    if (!selectedDoctor || !selectedSlot) {
      setMessage("Select doctor and time");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/book-appointment", {
        name: form.name,
        age: form.age,
        phone: form.phone,
        doctor: selectedDoctor,
        slot: selectedSlot
      });

      setMessage(response.data.message);

    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="page-container">

      <Navbar />

      <div className="page-card">
        <h2>AI Appointment Booking</h2>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

        <textarea
          name="symptoms"
          placeholder="Enter symptoms (e.g., fever, skin issue)"
          value={form.symptoms}
          onChange={handleChange}
        />

        <button onClick={handleSearch}>Find Doctors</button>

        {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
      </div>

      {/* 🔥 DOCTOR CARDS */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        marginTop: "30px"
      }}>

        {filteredDoctors.map((doc, index) => (
          <div key={index} style={{
            width: "220px",
            padding: "15px",
            borderRadius: "12px",
            background: "white",
            textAlign: "center",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)"
          }}>

            <img
              src={doc.image}
              alt=""
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginBottom: "10px"
              }}
            />

            <h3>{doc.name}</h3>
            <p>{doc.specialization}</p>

            <select onChange={(e) => {
              setSelectedDoctor(doc.name);
              setSelectedSlot(e.target.value);
            }}>
              <option>Select Time</option>
              {doc.slots.map((slot, i) => (
                <option key={i}>{slot}</option>
              ))}
            </select>

            <button style={{ marginTop: "10px" }} onClick={handleBooking}>
              Book
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Appointment;