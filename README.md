Here’s a complete `README.md` file for your project, based on everything you've implemented:

---

```markdown
# 🎓 AI-Powered Lecture Video Analyzer

This MERN-stack project allows users to upload lecture videos, automatically transcribes them using OpenAI Whisper, and generates multiple choice questions (MCQs) using Mistral via Ollama. It features user authentication, role-based access control, MongoDB integration, and a student quiz interface.

## 🔧 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **AI Models:**
  - 🎙 Whisper (for transcription)
  - 🧠 Mistral (for MCQ generation via Ollama)
- **Authentication:** JWT + bcrypt
- **Styling:** CSS Modules

---

## 🚀 Features

### 🔒 Authentication
- User & Admin login/register with password hashing
- Admin-only route protection (upload & quiz management)

### 📥 Upload & Process
- Upload MP4 videos
- Real-time progress bar for transcription & MCQ generation
- Uses `openai-whisper` to transcribe video to text
- Splits text into chunks and generates MCQs via Ollama + Mistral

### 📚 Quiz Management
- Admin can:
  - View uploaded quizzes
  - Edit MCQs inline
  - Export quizzes as JSON
- Students can:
  - Attempt quizzes
  - See immediate correct answers

---

## 📁 Folder Structure

```

root/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── utils/           # Text splitting
│   └── index.js         # Entry point
├── frontend/
│   ├── components/      # React components
│   └── App.js           # Routing and Protected Routes
├── python/
│   └── app.py           # Flask server for Whisper & MCQ generation

````

---

## 🔄 Setup Instructions

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI and JWT_SECRET in .env
npm start
````

### Python (Flask Server)

```bash
cd python
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Upload & Quiz

* `POST /api/upload`
* `GET /api/quizzes`
* `PUT /api/quizzes/:quizId/mcq/:mcqIndex`

---

## ✍️ Sample Admin Credentials

* Use role: `"admin"` and passnumber (stored in `.env`) while registering

---

## ❗Challenges Faced

* Whisper model compatibility with Python 3.12
* Ollama running Mistral model locally with GPU limitations
* Ensuring MCQ JSON format for export and editing

---

## 📽 Demo Video

*A short walkthrough video is available showing the complete workflow.*

---
