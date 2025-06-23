# PromptPilot
  
**GitHub Repo:** [https://github.com/Cyberbot777/prompt-pilot](https://github.com/Cyberbot777/prompt-pilot)

## Overview

**PromptPilot** is a full-stack AI customization tool that lets users design, test, and refine GPT agents using custom prompts and system instructions — all in a polished, side-by-side interface. Built with React, FastAPI, and PostgreSQL, the platform supports OpenAI API integration, secure prompt sessions, and user-friendly UX with a dark, modern aesthetic.

PromptPilot is both a productivity tool and an educational experience: it empowers anyone — devs, writers, educators — to explore AI behavior design without needing to code.

## Features

- Prompt & System Inputs: Side-by-side layout with GPT (Claude/Grok planned)
- Markdown Output Viewer: Renders GPT responses cleanly
- Save Sessions: Prompts, system instructions, model, and output device-based export/import (cloud/local DB support coming soon)
- Export/Import Sessions: Save and upload `.md`, `.json`, or `.txt` prompt files
- Auth (v2): Planned JWT login system with user-specific session history and analytics
- Polished UI: Dark theme, smooth animations, minimal layout
- Deployment: Vercel (frontend), Render (backend), PostgreSQL DB

## Project Phases

- v1: Core GPT prompt trainer (local export/import)
- v1.5: Add Claude, Grok model toggles
- v2: JWT auth, user-specific session history (DB-backed)
- v2.5+: Model comparison, analytics, agent deploy

## Technologies

### Frontend
- React (Vite)
- Tailwind CSS (Dark + Glass UI)
- React Markdown (output rendering)
- Framer Motion (animations)
- Deployed via Vercel

### Backend
- FastAPI (Python)
- OpenAI API (via backend proxy)
- PostgreSQL (session history)
- SQLAlchemy (ORM)
- Deployed via Render

## Skills Demonstrated
- Full-stack app architecture
- Secure API proxying (OpenAI)
- Prompt engineering + structured testing
- Dark-themed responsive UI
- RESTful API design with FastAPI + PostgreSQL
- JWT auth and session storage (v2)
- Markdown file handling (export/import)
- Real-world deployment using GitHub CI, Vercel, and Render

## Usage Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Cyberbot777/prompt-pilot.git
cd prompt-pilot
```

---

### 2. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

### 3. Set Up the Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # Use this in Git Bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run at: [http://localhost:8000](http://localhost:8000)

---

### 4. Environment Variables

Set these in `.env` files (frontend & backend as needed):

- `OPENAI_API_KEY`
- `DATABASE_URL`

---

## Folder Structure

```
prompt-pilot/
├── frontend/     # Vite + React + Tailwind
└── backend/      # FastAPI + PostgreSQL + OpenAI
```

---

## Author

- Richard Hall

## Timeline

- Created: June 22, 2025  
- Status: In active development

---

> PromptPilot is more than a demo — it's a real tool for shaping AI with intention.
