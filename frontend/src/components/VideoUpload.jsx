// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "./Nav";


// const VideoUpload = () => {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setStatus("Uploading...");

//     const formData = new FormData();
//     formData.append("video", file);

//     try {
//       const response = await axios.post("http://localhost:5000/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setStatus("Upload successful. Processing...");
//       console.log("Transcript + MCQs:", response.data);
//     } catch (error) {
//       setStatus("Upload failed.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <Navbar />
//       <h2>Upload Lecture Video (MP4)</h2>
//       <input type="file" accept="video/mp4" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>{status}</p>
//     </div>
//   );
// };

// export default VideoUpload;













import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Nav";
import styles from "../style/video.module.css";

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    try {
      setStatus("Uploading file...");
      setProgress(20);

      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(Math.min(percent, 90)); // Upload phase
        },
      });

      setStatus("Transcribing audio...");
      setProgress(50);

      // simulate transcription time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus("Generating MCQs...");
      setProgress(80);

      // simulate MCQ generation time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setProgress(100);
      setStatus("✅ Upload complete! Transcript and MCQs ready.");
      console.log("Transcript + MCQs:", response.data);
    } catch (error) {
      setStatus("❌ Upload failed.");
      setProgress(0);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.card}>
        <h2 className={styles.title}>📤 Upload Lecture Video (MP4)</h2>
        <input
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <button onClick={handleUpload} className={styles.uploadButton}>
          Upload
        </button>

        {/* Progress bar */}
        {progress > 0 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
        )}

        <p className={`${styles.status}`}>{status}</p>
      </div>
    </div>
  );
};

export default VideoUpload;
