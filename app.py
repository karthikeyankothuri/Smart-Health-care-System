from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# 🔑 Optional (for real AI)
client = OpenAI(api_key="YOUR_API_KEY_HERE")


# -------------------------------
# HOME
# -------------------------------
@app.route("/")
def home():
    return "Backend is running"


# -------------------------------
# LOGIN
# -------------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if email == "admin@gmail.com" and password == "1234":
        return jsonify({"message": "Login Success"}), 200
    else:
        return jsonify({"message": "Invalid Credentials"}), 401


# -------------------------------
# AI SYMPTOM CHECKER (HYBRID)
# -------------------------------
@app.route("/ai-symptom", methods=["POST"])
def ai_symptom():
    data = request.json
    symptoms = data.get("symptoms", "").lower()

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a medical assistant."},
                {"role": "user", "content": f"My symptoms are: {symptoms}"}
            ]
        )

        result = response.choices[0].message.content
        return jsonify({"result": result})

    except Exception as e:
        print("AI ERROR:", e)

        # 🔥 FALLBACK FREE AI
        if "fever" in symptoms and "headache" in symptoms:
            result = """Possible Condition: Viral Fever

Precautions:
- Take rest
- Drink fluids
- Take paracetamol"""

        elif "skin" in symptoms:
            result = """Possible Condition: Skin Allergy

Precautions:
- Avoid allergens
- Use creams
- Consult doctor"""

        elif "cough" in symptoms:
            result = """Possible Condition: Cold

Precautions:
- Drink warm fluids
- Rest well"""

        else:
            result = """General Advice:
- Maintain healthy diet
- Stay hydrated"""

        return jsonify({"result": result})


# -------------------------------
# BOOK APPOINTMENT
# -------------------------------
@app.route("/book-appointment", methods=["POST"])
def book_appointment():
    data = request.json

    name = data.get("name")
    age = data.get("age")
    phone = data.get("phone")
    doctor = data.get("doctor")
    slot = data.get("slot")

    if not name or not doctor or not slot:
        return jsonify({"message": "Missing details"}), 400

    try:
        # Load file
        with open("appointments.json", "r") as f:
            appointments = json.load(f)

        # 🔥 Check duplicate slot
        for appt in appointments:
            if appt["doctor"] == doctor and appt["slot"] == slot:
                return jsonify({"message": "Slot already booked"}), 400

        new_appt = {
            "name": name,
            "age": age,
            "phone": phone,
            "doctor": doctor,
            "slot": slot
        }

        appointments.append(new_appt)

        with open("appointments.json", "w") as f:
            json.dump(appointments, f, indent=4)

        return jsonify({"message": "Appointment booked successfully"}), 200

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"message": "Server error"}), 500

    

# -------------------------------
# GET APPOINTMENTS (FIX)
# -------------------------------
@app.route("/appointments", methods=["GET"])
def get_appointments():
    import os
    import json

    try:
        file_path = os.path.join(os.getcwd(), "appointments.json")

        if not os.path.exists(file_path):
            with open(file_path, "w") as f:
                json.dump([], f)

        with open(file_path, "r") as f:
            appointments = json.load(f)

        return jsonify(appointments), 200

    except Exception as e:
        print("ERROR:", e)
        return jsonify([]), 200
    

# -------------------------------
# RUN
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)