const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  subject: String,
  date: String,
  college: String
});

module.exports = mongoose.model("Exam", examSchema);
