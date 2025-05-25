# from flask import Flask, request, jsonify
# import whisper
# import os
# import re
# import uuid
# import traceback
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
# model = whisper.load_model("tiny")  # 'tiny' is faster and needs less RAM

# # Configure upload folder - match the frontend's path
# UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend", "uploads")
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# @app.route("/transcribe", methods=["POST"])
# def transcribe():
#     file_path = None
#     try:
#         if 'file' not in request.files:
#             return jsonify({"error": "No file uploaded"}), 400

#         video_file = request.files['file']
#         if not video_file or not video_file.filename:
#             return jsonify({"error": "Invalid file"}), 400

#         # Use the original filename as received
#         file_path = os.path.join(UPLOAD_DIR, video_file.filename)
#         print(f"[INFO] Saving file to: {file_path}")
#         video_file.save(file_path)

#         # Verify file was saved and has content
#         if not os.path.exists(file_path):
#             return jsonify({"error": "Failed to save file"}), 500
        
#         if os.path.getsize(file_path) == 0:
#             return jsonify({"error": "Uploaded file is empty"}), 400

#         print(f"[INFO] Transcribing file: {file_path}")
#         result = model.transcribe(file_path)
#         transcript = result["text"]

#         return jsonify({
#             "transcript": transcript,
#             "success": True
#         })

#     except Exception as e:
#         error_details = f"Error: {str(e)}\nTraceback: {traceback.format_exc()}"
#         print(f"[ERROR] {error_details}")
#         return jsonify({"error": str(e)}), 500

#     finally:
#         # Clean up file
#         if file_path and os.path.exists(file_path):
#             try:
#                 os.remove(file_path)
#                 print(f"[INFO] Cleaned up file: {file_path}")
#             except Exception as e:
#                 print(f"[WARNING] Failed to clean up {file_path}: {str(e)}")

# if __name__ == "__main__":
#     print(f"Server starting. Upload directory: {UPLOAD_DIR}")
#     app.run(port=8000, debug=True)




from flask import Flask, request, jsonify
import whisper
import os
import traceback
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)
model = whisper.load_model("tiny")

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ TRANSCRIPTION ROUTE
@app.route("/transcribe", methods=["POST"])
def transcribe():
    file_path = None
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        video_file = request.files['file']
        if not video_file or not video_file.filename:
            return jsonify({"error": "Invalid file"}), 400

        file_path = os.path.join(UPLOAD_DIR, video_file.filename)
        print(f"[INFO] Saving file to: {file_path}")
        video_file.save(file_path)

        if not os.path.exists(file_path):
            return jsonify({"error": "Failed to save file"}), 500
        if os.path.getsize(file_path) == 0:
            return jsonify({"error": "Uploaded file is empty"}), 400

        print(f"[INFO] Transcribing file: {file_path}")
        result = model.transcribe(file_path)
        # transcript = result["text"]

        # return jsonify({
        #     "transcript": transcript,
        #     "success": True
        # })
        return jsonify({
            "transcript": result["text"],
            "segments": result["segments"],
            "success": True
        })


    except Exception as e:
        error_details = f"Error: {str(e)}\nTraceback: {traceback.format_exc()}"
        print(f"[ERROR] {error_details}")
        return jsonify({"error": str(e)}), 500

    finally:
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
                print(f"[INFO] Cleaned up file: {file_path}")
            except Exception as e:
                print(f"[WARNING] Failed to clean up {file_path}: {str(e)}")

# ✅ NEW: MCQ GENERATION ROUTE
@app.route("/generate-mcq", methods=["POST"])
def generate_mcq():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "Empty input text"}), 400

        prompt = f"""
        Generate 2 multiple choice questions (MCQs) with 4 options and the correct answer, based on this transcript chunk:

        \"\"\"
        {text}
        \"\"\"

        Format your response as JSON like this:
        [
          {{
            "question": "What is ...?",
            "options": ["A", "B", "C", "D"],
            "answer": "B"
          }},
          ...
        ]
        """

        response = requests.post("http://localhost:11434/api/generate", json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        })

        response.raise_for_status()
        raw_output = response.json()["response"]
        mcqs = json.loads(raw_output)

        return jsonify({"mcqs": mcqs})

    except Exception as e:
        print("[MCQ ERROR]", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# ✅ Main
if __name__ == "__main__":
    print(f"Server starting. Upload directory: {UPLOAD_DIR}")
    app.run(port=8000, debug=True)
