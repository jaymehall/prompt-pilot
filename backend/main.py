from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class GenerateRequest(BaseModel):
    systemInstruction: str
    messages: List[Message]
    model: str = "gpt-3.5-turbo"

@app.post("/api/generate")
async def generate(data: GenerateRequest):
    try:
        print("📥 Received request to /api/generate")
        print("System instruction:", data.systemInstruction)
        print("Messages:", data.messages)

        response = client.chat.completions.create(
            model=data.model,
            messages=[
                {"role": "system", "content": data.systemInstruction},
                *[{"role": m.role, "content": m.content} for m in data.messages]
            ],
        )

        print("✅ OpenAI response:", response)

        return {
            "message": response.choices[0].message.content
        }

    except Exception as e:
        print("❌ OpenAI API call failed:", e)
        return {"error": str(e)}

@app.get("/api/ping")
def ping():
    return {"message": "pong"}
