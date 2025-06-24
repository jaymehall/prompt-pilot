# PromptPilot Production Notes

**Project Status:** Updated June 24, 2025

---

## Overview

PromptPilot is a developer-facing tool for testing and refining prompt + system instruction configurations for LLMs (starting with OpenAI’s GPT-3.5).  
It offers a real-time chat interface alongside editable instruction fields, structured in a two-pane layout.

This document details:
- System architecture
- UI behavior
- Custom styling decisions
- Backend API integration
- Production deployment + custom domain setup

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + TypeScript + TailwindCSS + Framer Motion
- **Backend:** FastAPI (Python 3.11), served via Uvicorn
- **LLM API:** OpenAI `gpt-3.5-turbo` (via `/v1/chat/completions`)
- **Deployment Target:** Vercel (frontend), Render (backend)
- **Styling:** TailwindCSS + custom scrollbar overrides via `index.css`

---

## API Integration

**POST /api/generate**

- Accepts:
  ```json
  {
    "systemInstruction": "string",
    "messages": [{ "role": "user" | "assistant", "content": "string" }],
    "model": "gpt-3.5-turbo"
  }
  ```
- Calls OpenAI Chat API:
  - Injects `systemInstruction` as role: `"system"`
  - Includes full message history (`user`, `assistant`)
- Returns:
  ```json
  {
    "message": "string"
  }
  ```

**Security:**
- OpenAI key loaded via `.env`
- Backend proxy isolates secret key from frontend
- CORS configured for:
  - `http://localhost:5173`
  - `https://prompt-pilot-pi.vercel.app`
  - `https://prompt-pilot.ai`
  - `https://www.prompt-pilot.ai`

---

## UI Layout

### ➤ Left Panel (Prompt Editor)

- System instruction input
  - Monospaced
  - Terminal style header: `user@prompt-lab:~$ System Instruction:`
  - Auto-expands with `scrollHeight` logic
  - Custom green scrollbar (`.custom-scroll`)
  - Max-height: 70vh with vertical scroll fallback

### ➤ Right Panel (AI Chat)

- User input textarea
  - Expandable
  - Press `Enter` to send
  - Press `Shift+Enter` for newlines
  - Scrollbar styled to match input ring blue (`#60a5fa`)
  - Uses class `.scroll-blue`
- GPT response area
  - Chat log in a `div` with vertical scroll
  - Typing effect animates one character at a time (currently 40ms delay)
  - Scrollbar styled to match UI (`.scroll-output`)
  - **Auto-scrolls to bottom** as new characters appear

---

## UX Behavior

- Placeholder message disappears after first user prompt
- GPT replies animate in using `setInterval()` with a 40ms delay per character
- Instruction editing does not reset chat
- **Auto-scroll now active** when GPT replies
- Focus remains in input field after reply
- Real-time debugging logs active during fetch to track env and payload behavior

---

## Deployment Notes

- **Frontend:** Vercel  
  - Connected to GitHub `main` branch  
  - Environment variable `VITE_API_URL` set to point to backend Render URL  
- **Backend:** Render  
  - Deployed via GitHub with `OPENAI_API_KEY` in `.env`  
  - CORS updated to support full production stack

---

## Custom Domain

- Registered: `prompt-pilot.ai`
- Connected to Vercel with:
  - `A Record (@)` → `216.198.79.193`
  - `CNAME (www)` → `d84194a5b92e78b9.vercel-dns-017.com`
- SSL issued successfully via Vercel
- Full-stack live at:  
  https://prompt-pilot.ai  
  https://www.prompt-pilot.ai

---