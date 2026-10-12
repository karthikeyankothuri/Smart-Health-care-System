import React from "react";
import Navbar from "../components/Navbar";
import "./HealthTips.css";

function HealthTips() {

  const tips = [
    {
      title: "Stay Hydrated",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      desc: "Drink at least 8 glasses of water daily to maintain body balance."
    },
    {
      title: "Regular Exercise",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      desc: "Exercise improves heart health and boosts immunity."
    },
    {
      title: "Balanced Diet",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      desc: "Include fruits, vegetables, and proteins in your daily diet."
    },
    {
      title: "Avoid Junk Food",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      desc: "Reduce intake of processed and oily foods."
    },
    {
      title: "Get Enough Sleep",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      desc: "Sleep at least 7-8 hours daily for good health."
    },
    {
      title: "Wash Hands Frequently",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
      desc: "Prevents infections and spread of diseases."
    },
    {
      title: "Mental Health Care",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      desc: "Practice meditation and reduce stress."
    },
    {
      title: "Regular Health Checkup",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",
      desc: "Early detection helps prevent serious diseases."
    }
  ];

  return (
    <div className="health-container">

      <Navbar />

      <h2 className="health-title">AI Health Tips</h2>

      <div className="health-grid">

        {tips.map((tip, index) => (

          <div key={index} className="health-card">

            <img src={tip.image} alt="" />

            <h3>{tip.title}</h3>

            <p>{tip.desc}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default HealthTips;