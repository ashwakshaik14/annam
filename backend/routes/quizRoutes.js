const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");


// GET all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// PUT update MCQ
router.put("/:quizId/mcq/:mcqIndex", async (req, res) => {
  const { quizId, mcqIndex } = req.params;
  const { question, options, answer } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    quiz.mcqs[mcqIndex] = { question, options, answer };
    await quiz.save();

    res.json({ message: "MCQ updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update MCQ" });
  }
});

module.exports = router;
