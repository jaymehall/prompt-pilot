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
- Multi-model Claude integration with model labeling

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + TypeScript + TailwindCSS + Framer Motion
- **Backend:** FastAPI (Python 3.11), served via Uvicorn
- **LLM API:** OpenAI `gpt-3.5-turbo`, Anthropic `claude-3-5-sonnet-20241022`
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
    "model": "gpt-3.5-turbo" | "claude-3-5-sonnet-20241022"
  }
  ```
- Routes to:
  - OpenAI Chat API for GPT-3.5
  - Anthropic Messages API for Claude
- Returns:
  ```json
  {
    "message": "string"
  }
  ```

**Security:**
- API keys loaded via `.env`:
  - `OPENAI_API_KEY`
  - `CLAUDE_API_KEY`
- Backend proxy isolates secret keys from frontend
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

- Model toggle radio buttons centered above output
- User input textarea
  - Expandable
  - Press `Enter` to send
  - Press `Shift+Enter` for newlines
  - Scrollbar styled to match input ring blue (`#60a5fa`)
  - Uses class `.scroll-blue`
- GPT/Claude response area
  - Typing effect animates one character at a time (40ms)
  - Messages are dynamically labeled: `GPT:`, `Claude:`, `You:`
  - Scrollbar styled to match UI (`.scroll-output`)
  - **Auto-scrolls to bottom** as new characters appear

---

## UX Behavior

- Placeholder message dynamically updates to reflect selected model
- Claude and GPT responses labeled clearly
- GPT replies animate in using `setInterval()` with 40ms delay
- Instruction editing does not reset chat
- Auto-scroll behavior is active during reply animation
- Model toggle maintains session context on frontend
- Focus remains in input field after reply
- Debug logs active during fetch

---

## Deployment Notes

- **Frontend:** Vercel  
  - Connected to GitHub `main` branch  
  - Environment variable `VITE_API_URL` set to backend Render URL  
- **Backend:** Render  
  - Deployed via GitHub with keys stored in `.env`  
  - CORS updated for all frontends (localhost + production)

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