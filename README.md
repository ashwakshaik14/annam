```markdown
# 🎓 AI-Powered Lecture Video Quiz Generator

A full-stack MERN application that allows users to upload lecture videos, automatically transcribes them using OpenAI Whisper, and generates MCQs (Multiple Choice Questions) using Mistral (via Ollama). It supports user authentication, admin privileges, and interactive student quiz functionality.

---

## 🛠️ Tech Stack

- **Frontend:** React.js + CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Python Services:** Flask + OpenAI Whisper + Ollama (Mistral)
- **Authentication:** JWT, bcrypt
- **AI Services:**
  - 🧠 Whisper (audio transcription)
  - 📝 Mistral (MCQ generation)

---

## 🌟 Key Features

### 🔐 Authentication
- Register/Login for users and admins
- Admin passnumber required during registration
- JWT-based protected routes

### 🎥 Video Upload & AI Processing
- Upload `.mp4` lecture videos
- Transcribe audio to text using Whisper
- Automatically generate MCQs using Mistral AI
- Real-time progress bar during upload and processing

### 📚 Quiz Management (Admin)
- View all uploaded quizzes
- Edit generated MCQs inline
- Export quiz data as downloadable JSON

### 🧑‍🎓 Student Quiz View
- Take quizzes interactively
- Submit answers and see correct answers instantly

---

## 📂 Project Structure

```

```
project/
├── backend/              # Express + MongoDB API
│   ├── models/           # Mongoose schemas (User, Quiz)
│   ├── routes/           # Auth, Upload, Quiz APIs
│   └── utils/            # Transcript splitter
├── frontend/             # React.js frontend
│   └── components/       # UI components for views
├── python/               # Flask app for AI processing
│   └── app.py            # Whisper & MCQ generation
```

````

---

## 🧪 How It Works

1. **Admin logs in** and uploads a video.
2. **Backend** sends the file to the **Python server**.
3. **Whisper** transcribes the audio.
4. Transcript is split into chunks and passed to **Mistral via Ollama**.
5. Each chunk generates 2 MCQs.
6. **MongoDB** stores the filename, transcript, and MCQs.
7. Admin can **edit or export** quizzes.
8. Students can **attempt quizzes**, see correct answers after submission.

---

## ⚙️ Setup Instructions

### 1. Backend (Node.js)

```bash
cd backend
npm install
cp .env.example .env
# Add MONGO_URI and JWT_SECRET to your .env
npm start
````

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

### 3. Python AI Server (Flask)

```bash
cd python
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 4. Run Ollama (Mistral)

```bash
ollama serve
ollama run mistral
```

---

## 🔐 Admin Access

* Register as admin by selecting **role = admin**
* Provide the correct **passnumber** (stored in `.env` as `ADMIN_PASSNUMBER`)

---

## 🧠 AI Prompt Example

```json
Generate 2 multiple choice questions (MCQs) with 4 options and the correct answer, based on this transcript chunk:
"""
[transcript chunk]
"""
Return in JSON format:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "B"
  }
]
```

---

## 💡 Optional Enhancements

* Add quiz result storage
* Add user dashboard for students
* Enable PDF quiz exports

---
