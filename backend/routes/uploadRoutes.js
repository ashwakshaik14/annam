const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const Quiz = require("../models/Quiz");
const splitTranscript = require("../utils/splitTranscript");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("video"), async (req, res) => {
  const filePath = path.resolve(__dirname, "../", req.file.path);
  console.log("Received file:", filePath);

  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const whisperRes = await axios.post("http://localhost:8000/transcribe", formData, {
      headers: formData.getHeaders(),
    });

    // const transcript = whisperRes.data.transcript;
    // const chunks = splitTranscript(transcript);
    const { transcript, segments } = whisperRes.data;
    const chunks = splitTranscript(segments); // ✅ Now this works

    const mcqs = [];

    for (const chunk of chunks) {
      const response = await axios.post("http://localhost:8000/generate-mcq", {
        text: chunk,
      });

      if (response.data && response.data.mcqs) {
        mcqs.push(...response.data.mcqs);
      }
    }

    await Quiz.create({
      filename: req.file.originalname,
      transcript,
      mcqs,
    });

    res.json({
      message: "Transcription and MCQ generation successful",
      transcript,
      mcqs,
    });

  } catch (error) {
    console.error("❌ Error in transcription/MCQ generation:", error.message);
    res.status(500).json({ error: "Failed to transcribe or generate MCQs" });
  } finally {
    // fs.unlinkSync(filePath); // optional cleanup
  }
});

module.exports = router;
