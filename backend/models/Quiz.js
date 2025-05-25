// models/Quiz.js
const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const quizSchema = new mongoose.Schema({
  filename: String,
  transcript: String,
  mcqs: [mcqSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
