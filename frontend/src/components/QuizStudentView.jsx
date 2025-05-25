import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Nav";
import styles from "../style/quizStudent.module.css";

const QuizStudentView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/quizzes")
      .then(res => setQuizzes(res.data))
      .catch(err => console.error("Failed to fetch quizzes:", err));
  }, []);

  const handleSelectAnswer = (quizId, mcqIndex, option) => {
    setAnswers(prev => ({ ...prev, [`${quizId}_${mcqIndex}`]: option }));
  };

  const handleSaveAnswer = (quizId, mcqIndex) => {
    if (!answers[`${quizId}_${mcqIndex}`]) {
      alert("Please select an answer before saving.");
      return;
    }
    setSubmitted(prev => ({ ...prev, [`${quizId}_${mcqIndex}`]: true }));
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.heading}>📚 Take a Quiz</h2>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className={styles.quizCard}>
          <h3 className={styles.quizTitle}>{quiz.filename}</h3>
          <div>
            {quiz.mcqs.map((mcq, mcqIndex) => {
              const key = `${quiz._id}_${mcqIndex}`;
              const selectedAnswer = answers[key];
              const isSubmitted = submitted[key];

              return (
                <div key={mcqIndex} className={styles.mcqBlock}>
                  <p className={styles.question}><strong>Q{mcqIndex + 1}:</strong> {mcq.question}</p>

                  {mcq.options.map((opt, optIndex) => {
                    let labelStyle = "";
                    if (isSubmitted && opt === mcq.answer) {
                      labelStyle = styles.correctAnswer;
                    }

                    return (
                      <label
                        key={optIndex}
                        className={`${styles.optionLabel} ${labelStyle}`}
                      >
                        <input
                          type="radio"
                          name={key}
                          value={opt}
                          disabled={isSubmitted}
                          checked={selectedAnswer === opt}
                          onChange={() => handleSelectAnswer(quiz._id, mcqIndex, opt)}
                          className={styles.radioInput}
                        />
                        {opt}
                      </label>
                    );
                  })}

                  {!isSubmitted ? (
                    <button className={styles.saveButton} onClick={() => handleSaveAnswer(quiz._id, mcqIndex)}>
                      Submit Answer
                    </button>
                  ) : (
                    <p className={styles.answerReveal}>
                      ✅ <strong>Correct Answer:</strong> {mcq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizStudentView;
