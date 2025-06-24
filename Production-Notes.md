
# PromptPilot Production Notes  

**Project Status:** June 23, 2025

---

## Overview

PromptPilot is a developer-facing tool for testing and refining prompt + system instruction configurations for LLMs (starting with OpenAI’s GPT-3.5).  
It offers a real-time chat interface alongside editable instruction fields, structured in a two-pane layout.

This document details:
- System architecture
- UI behavior
- Custom styling decisions
- Backend API integration

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
- CORS configured for `http://localhost:5173`

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
  - Typing effect animates one character at a time
  - Scrollbar styled to match UI (`.scroll-output`)

---

## Custom Styling

### index.css custom classes

```css
.custom-scroll {
  scrollbar-color: #4ade80 transparent;
  ...
}

.scroll-blue {
  scrollbar-color: #60a5fa #1e293b;
  ...
}

.scroll-output {
  scrollbar-color: #60a5fa #1e293b;
  ...
}
```

All scrollbars across system inputs, user chat, and GPT output are consistent with the terminal/utility styling.

---

## UX Behavior

- Placeholder message disappears after first user prompt
- GPT replies animate in using `setInterval()` with a 20ms delay per character
- Instruction editing does not reset chat
- Scroll-to-bottom behavior is currently manual (auto-scroll TBD)
- Focus remains in input field after reply

---

## Decisions Locked

- Scrollbars now visually consistent and thematically matched
- System instruction label is pinned to one line — terminal-style
- No animated or color-based state changes for user input typing (deliberate to preserve CLI feel)
- Scrollbar colors match `focus:ring-*` inputs exactly using Tailwind palette values
