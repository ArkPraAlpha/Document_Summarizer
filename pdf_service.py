import os
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_chroma import Chroma
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_openai import ChatOpenAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

# HuggingFace local cache
os.environ["HF_HOME"] = r"D:\Gen AI\Code\CACHE"

# LM Studio config
LMSTUDIO_BASE_URL = "http://localhost:1234/v1"
LMSTUDIO_MODEL = "openai/gpt-oss-20b"

def get_llm(temperature=0.3):
    return ChatOpenAI(
        model=LMSTUDIO_MODEL,
        base_url=LMSTUDIO_BASE_URL,
        api_key="not-needed",   # LM Studio ignores it
        temperature=temperature
    )

def get_embeddings():
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")


def get_pdf_text(file_paths):
    """Read one or more PDFs from file paths and return full text"""
    text = ""
    for p in file_paths:
        reader = PdfReader(p)
        for page in reader.pages:
            page_text = page.extract_text() or ""
            text += page_text + "\n"
    return text


def get_text_chunks(text):
    splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1500,
        chunk_overlap=200,
        length_function=len
    )
    return splitter.split_text(text)



def get_vectorstore(text_chunks, persist_directory=None):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # just create in-memory Chroma
    vectorstore = Chroma.from_texts(
        texts=text_chunks,
        embedding=embeddings
    )

    return vectorstore

def get_conversation_chain(vectorstore):
    llm = get_llm(temperature=0)
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    return ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )

def generate_summary(text):
    llm = get_llm(temperature=0.3)
    prompt = f"Summarize the following document in a concise, clear way:\n\n{text[:6000]}"
    response = llm.invoke(prompt)
    return response.content

def generate_mcqs(text):
    llm = get_llm(temperature=0.3)
    prompt = f"""From the following study material, create 10 multiple-choice questions with 4 options each. 
Mark the correct answer clearly.

Text:
{text[:6000]}
"""
    response = llm.invoke(prompt)
    return response.content
