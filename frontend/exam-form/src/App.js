import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    studentName: "",
    registerNumber: "",
    subject: "",
    examDate: "",
    examCenter: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.studentName ||
      !formData.registerNumber ||
      !formData.subject ||
      !formData.examDate ||
      !formData.examCenter
    ) {
      setError("All fields are required");
      return;
    }

    setError("");

    // Send data to backend
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    alert("Exam Registered Successfully");
  };

  return (
    <div className="container">
      <h2>Examination Registration Form</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="studentName" placeholder="Student Name" onChange={handleChange} />
        <input type="text" name="registerNumber" placeholder="Register Number" onChange={handleChange} />
        <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
        <input type="date" name="examDate" onChange={handleChange} />
        <input type="text" name="examCenter" placeholder="Exam Center" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
