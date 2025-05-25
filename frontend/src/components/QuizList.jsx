import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Nav";
import styles from "../style/quizList.module.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editState, setEditState] = useState({});
  const [savedMCQs, setSavedMCQs] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/quizzes")
      .then(res => setQuizzes(res.data))
      .catch(err => console.error("Failed to fetch quizzes:", err));
  }, []);

  const handleEditToggle = (quizId, mcqIndex) => {
    setEditState((prev) => ({
      ...prev,
      [quizId]: { ...(prev[quizId] || {}), [mcqIndex]: !prev[quizId]?.[mcqIndex] }
    }));
  };

  const handleMCQChange = (quizIndex, mcqIndex, field, value) => {
    const updated = [...quizzes];
    updated[quizIndex].mcqs[mcqIndex][field] = value;
    setQuizzes(updated);
  };

  const saveMCQ = async (quizId, mcqIndex, updatedMcq) => {
    try {
      await axios.put(`http://localhost:5000/api/quizzes/${quizId}/mcq/${mcqIndex}`, updatedMcq);
      alert("✅ MCQ updated");
    } catch (err) {
      alert("❌ Failed to update MCQ");
    }
  };

  const handleExport = (quiz) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quiz, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `${quiz.filename}.json`);
    dlAnchor.click();
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.heading}>📚 Your Uploaded Quizzes</h2>
      {quizzes.map((quiz, qIndex) => (
        <div key={qIndex} className={styles.quizCard}>
          <div className={styles.quizHeader}>
            <h3>🎥 {quiz.filename}</h3>
            <button className={styles.exportButton} onClick={() => handleExport(quiz)}>📥 Export</button>
          </div>
          <p className={styles.timestamp}><strong>Uploaded:</strong> {new Date(quiz.createdAt).toLocaleString()}</p>

          <details className={styles.transcriptBlock}>
            <summary className={styles.transcriptSummary}>📝 Transcript</summary>
            <p className={styles.transcriptText}>{quiz.transcript}</p>
          </details>

          <div>
            <h4 className={styles.mcqTitle}>📘 MCQs</h4>
            {quiz.mcqs.map((mcq, mcqIndex) => {
              const isEditing = editState[quiz._id]?.[mcqIndex];
              return (
                <div key={mcqIndex} className={styles.mcqCard}>
                  {isEditing ? (
                    <>
                      <textarea
                        value={mcq.question}
                        onChange={(e) => handleMCQChange(qIndex, mcqIndex, "question", e.target.value)}
                        className={styles.textarea}
                      />
                      {mcq.options.map((opt, optIndex) => (
                        <input
                          key={optIndex}
                          value={opt}
                          onChange={(e) => {
                            const updated = [...mcq.options];
                            updated[optIndex] = e.target.value;
                            handleMCQChange(qIndex, mcqIndex, "options", updated);
                          }}
                          className={styles.input}
                        />
                      ))}
                      <input
                        value={mcq.answer}
                        onChange={(e) => handleMCQChange(qIndex, mcqIndex, "answer", e.target.value)}
                        className={styles.input}
                        placeholder="Answer"
                      />
                      <div className={styles.buttonGroup}>
                        <button onClick={() => saveMCQ(quiz._id, mcqIndex, mcq)} className={styles.saveButton}>💾 Save</button>
                        <button onClick={() => handleEditToggle(quiz._id, mcqIndex)} className={styles.cancelButton}>❌ Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p><strong>Q{mcqIndex + 1}:</strong> {mcq.question}</p>
                      <ul className={styles.optionList}>
                        {mcq.options.map((opt, optIdx) => (
                          <li key={optIdx}>{opt}</li>
                        ))}
                      </ul>
                      <p><strong>✅ Answer:</strong> {mcq.answer}</p>
                      <button onClick={() => handleEditToggle(quiz._id, mcqIndex)} className={styles.editButton}>✏️ Edit</button>
                    </>
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

export default QuizList;














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Nav";


// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [editState, setEditState] = useState({}); // { quizId: { mcqIndex: true } }
//   const [savedMCQs, setSavedMCQs] = React.useState({}); 
// // e.g. keys: `${quiz._id}_${mcqIndex}`, values: true or false


//   useEffect(() => {
//     axios.get("http://localhost:5000/api/quizzes")
//       .then(res => setQuizzes(res.data))
//       .catch(err => console.error("Failed to fetch quizzes:", err));
//   }, []);

//   const handleEditToggle = (quizId, mcqIndex) => {
//     setEditState((prev) => ({
//       ...prev,
//       [quizId]: { ...(prev[quizId] || {}), [mcqIndex]: !prev[quizId]?.[mcqIndex] }
//     }));
//   };

//   const handleMCQChange = (quizIndex, mcqIndex, field, value) => {
//     const updated = [...quizzes];
//     updated[quizIndex].mcqs[mcqIndex][field] = value;
//     setQuizzes(updated);
//   };

//   const saveMCQ = async (quizId, mcqIndex, updatedMcq) => {
//     try {
//       await axios.put(`http://localhost:5000/api/quiz/${quizId}/mcq/${mcqIndex}`, updatedMcq);
//       alert("✅ MCQ updated");
//     } catch (err) {
//       alert("❌ Failed to update MCQ");
//     }
//   };

//   const handleExport = (quiz) => {
//     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quiz, null, 2));
//     const dlAnchor = document.createElement("a");
//     dlAnchor.setAttribute("href", dataStr);
//     dlAnchor.setAttribute("download", `${quiz.filename}.json`);
//     dlAnchor.click();
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Saved Quizzes</h2>
//       {quizzes.map((quiz, qIndex) => (
//         <div key={qIndex} className="quiz-card" style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "15px" }}>
//           <h3>🎥 {quiz.filename}</h3>
//           <p><strong>Uploaded:</strong> {new Date(quiz.createdAt).toLocaleString()}</p>
//           <button onClick={() => handleExport(quiz)}>📥 Export as JSON</button>

//           <details>
//             <summary>📝 Transcript</summary>
//             <p>{quiz.transcript}</p>
//           </details>

//           <div>
//             <h4>📘 MCQs:</h4>
//             {quiz.mcqs.map((mcq, mcqIndex) => {
//               const isEditing = editState[quiz._id]?.[mcqIndex];
//               return (
//                 <div key={mcqIndex} style={{ marginBottom: "10px", padding: "10px", background: "#f9f9f9", borderRadius: "8px" }}>
//                   {isEditing ? (
//                     <>
//                       <textarea
//                         value={mcq.question}
//                         onChange={(e) => handleMCQChange(qIndex, mcqIndex, "question", e.target.value)}
//                         style={{ width: "100%" }}
//                       />
//                       {mcq.options.map((opt, optIndex) => (
//                         <input
//                           key={optIndex}
//                           value={opt}
//                           onChange={(e) => {
//                             const updated = [...mcq.options];
//                             updated[optIndex] = e.target.value;
//                             handleMCQChange(qIndex, mcqIndex, "options", updated);
//                           }}
//                           style={{ display: "block", width: "100%", marginBottom: "5px" }}
//                         />
//                       ))}
//                       <input
//                         value={mcq.answer}
//                         onChange={(e) => handleMCQChange(qIndex, mcqIndex, "answer", e.target.value)}
//                         placeholder="Answer"
//                         style={{ display: "block", width: "100%", marginBottom: "10px" }}
//                       />
//                       <button onClick={() => saveMCQ(quiz._id, mcqIndex, mcq)}>💾 Save</button>
//                       <button onClick={() => handleEditToggle(quiz._id, mcqIndex)}>❌ Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <p><strong>Q{mcqIndex + 1}:</strong> {mcq.question}</p>
//                       <ul>
//                         {mcq.options.map((opt, optIdx) => (
//                           <li key={optIdx}>{opt}</li>
//                         ))}
//                       </ul>
//                       <p><strong>✅ Answer:</strong> {mcq.answer}</p>
//                       <button onClick={() => handleEditToggle(quiz._id, mcqIndex)}>✏️ Edit</button>
//                     </>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuizList;
