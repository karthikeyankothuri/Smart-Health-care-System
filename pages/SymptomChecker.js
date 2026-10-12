import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/PageStyle.css";

function SymptomChecker() {

  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkSymptoms = async () => {

    if (!symptom) {
      setResult("Please enter symptoms");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await axios.post("http://localhost:5001/ai-symptom", {
        symptoms: symptom
      });

      setResult(response.data.result);

    } catch (error) {
      console.log(error);
      setResult("Error connecting to AI backend");
    }

    setLoading(false);
  };

  return (
    <div className="page-container">

      <Navbar />

      <div className="page-card">

        <h2>AI Symptom Checker</h2>

        <textarea
          placeholder="Enter your symptoms (e.g., fever, headache, cough)"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
        />

        <button onClick={checkSymptoms} disabled={loading}>
          {loading ? "Analyzing..." : "Check Symptoms"}
        </button>

        {/* 🔥 Loading Animation */}
        {loading && (
          <p style={{ marginTop: "10px", color: "#1e6be3" }}>
            🤖 AI is analyzing your symptoms...
          </p>
        )}

        {/* 🔥 Result */}
        {result && (
          <div style={{
            marginTop: "20px",
            textAlign: "left",
            background: "#f4f8ff",
            padding: "15px",
            borderRadius: "8px"
          }}>
            <h3>AI Result:</h3>
            <p style={{ whiteSpace: "pre-line" }}>{result}</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default SymptomChecker;