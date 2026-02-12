const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/examregistration")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Schema
const examSchema = new mongoose.Schema({
  studentName: String,
  registerNumber: String,
  subject: String,
  examDate: String,
  examCenter: String
});

const Exam = mongoose.model("Exam", examSchema);

// POST /submit
app.post("/submit", async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    const exam = new Exam(req.body);
    await exam.save();
    console.log("Saved to MongoDB");
    res.status(201).json({ message: "Exam registration successful" });
  } catch (err) {
    console.error("Error saving to MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

// Optional GET to view all exams
app.get("/exams", async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
