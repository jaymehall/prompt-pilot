from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import os
from dotenv import load_dotenv
import requests

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://prompt-pilot-pi.vercel.app",
        "https://prompt-pilot.ai",
        "https://www.prompt-pilot.ai",
    ],
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
        print("Received request to /api/generate")
        print("Model selected:", data.model)
        print("System instruction:", data.systemInstruction)
        print("Messages:", data.messages)

        if data.model.startswith("gpt"):
            response = client.chat.completions.create(
                model=data.model,
                messages=[
                    {"role": "system", "content": data.systemInstruction},
                    *[{"role": m.role, "content": m.content} for m in data.messages]
                ],
            )
            reply = response.choices[0].message.content

        elif data.model.startswith("claude"):
            anthropic_key = os.getenv("CLAUDE_API_KEY")
            if not anthropic_key:
                raise HTTPException(status_code=500, detail="Claude API key not found")

            headers = {
                "x-api-key": anthropic_key,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json"
            }

            payload = {
                "model": data.model,
                "system": data.systemInstruction,
                "max_tokens": 1024,
                "messages": [m.dict() for m in data.messages]
            }

            res = requests.post(
                "https://api.anthropic.com/v1/messages",
                headers=headers,
                json=payload
            )

            if res.status_code != 200:
                print("Claude API error:", res.text)
                raise HTTPException(status_code=res.status_code, detail="Claude API call failed")

            reply = res.json()["content"][0]["text"]

        else:
            raise HTTPException(status_code=400, detail="Unsupported model")

        return { "message": reply }

    except Exception as e:
        print("Model call failed:", e)
        return {"error": str(e)}

@app.get("/api/ping")
def ping():
    return {"message": "pong"}