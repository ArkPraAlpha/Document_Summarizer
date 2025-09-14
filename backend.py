from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import uuid

from pdf_service import (
    get_pdf_text,
    get_text_chunks,
    get_vectorstore,
    get_conversation_chain,
    generate_summary,
    generate_mcqs,
)

app = FastAPI()

# Allow frontend (React) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this to your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary folder for uploads
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Store conversations per session
conversations = {}


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a PDF file, split text, create embeddings and vectorstore.
    Returns session_id for further chat.
    """
    session_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{session_id}_{file.filename}")

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract and process
    text = get_pdf_text([file_path])
    chunks = get_text_chunks(text)
    vectorstore = get_vectorstore(chunks, persist_directory=f"chroma_{session_id}")
    chain = get_conversation_chain(vectorstore)

    # Save in memory
    conversations[session_id] = {"chain": chain, "text": text}

    return {"session_id": session_id, "message": "File processed successfully"}


@app.post("/chat/")
async def chat(session_id: str = Form(...), question: str = Form(...)):
    """
    Ask a question to the chatbot based on uploaded PDF context.
    """
    if session_id not in conversations:
        return {"error": "Invalid session_id"}

    chain = conversations[session_id]["chain"]
    response = chain.invoke({"question": question})

    return {
        "answer": response["answer"],
        "chat_history": [
            {"role": m.type, "content": m.content}
            for m in response["chat_history"]
        ],
    }


@app.get("/summary/{session_id}")
async def summary(session_id: str):
    """
    Generate summary of the uploaded PDF.
    """
    if session_id not in conversations:
        return {"error": "Invalid session_id"}

    text = conversations[session_id]["text"]
    summary = generate_summary(text)
    return {"summary": summary}


@app.get("/mcqs/{session_id}")
async def mcqs(session_id: str):
    """
    Generate MCQs from the uploaded PDF.
    """
    if session_id not in conversations:
        return {"error": "Invalid session_id"}

    text = conversations[session_id]["text"]
    mcqs = generate_mcqs(text)
    return {"mcqs": mcqs}
