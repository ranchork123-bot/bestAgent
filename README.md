# Hubtique OS - Full Feature Scaffolding

This repository contains the foundational scaffolding for **all 60+ features** identified in the competitive analysis for Hubtique OS. It is designed to be free, running entirely on a React frontend (deployable via Lovable) and Supabase (free tier).

## 🚀 Free Deployment Guide

You can deploy this entire architecture for **$0/month**.

### 1. Frontend Web App (Lovable / Vercel)
The web application is a standard Vite + React + TypeScript project. This serves as the UI for your Vault, Skills Marketplace, Execution Graphs, and Plan Reviews.

**To deploy for free using Lovable:**
1. Push this repository to your GitHub account.
2. Go to [Lovable.dev](https://lovable.dev) (or use their GitHub integration).
3. Connect your repository. Lovable will automatically detect the Vite React project.
4. It will build using `npm run build` and deploy the `dist/` directory automatically.

**Alternative (Vercel):**
1. Connect your GitHub repository to Vercel.
2. The Build Command is automatically detected as `npm run build`.
3. The Output Directory is `dist`.

### 2. Backend Logic & Database (Supabase Free Tier)
We use Supabase for persistent data (Agent Memory, Audit Logs) and Edge Functions (Webhooks, API endpoints, Cron jobs).
1. Create a free account at [Supabase](https://supabase.com/).
2. Create a new project.
3. Install the Supabase CLI locally: `npm install -g supabase`
4. Login to the CLI: `supabase login`
5. Link your local project: `supabase link --project-ref <your-project-id>`
6. Deploy all edge functions:
   ```bash
   supabase functions deploy monitor-page
   supabase functions deploy telegram-webhook
   supabase functions deploy agent-api
   supabase functions deploy whatsapp-webhook
   ```
7. *Note on Database:* You will need to create tables via the Supabase Dashboard for `agent_actions`, `site_memory`, and `user_profiles` to fully activate the mock functions in `src/lib/`.

### 3. Chrome Extension (The Agent Engine)
The extension provides native DOM access and handles recording tasks, memory, session replays, and parallel async execution without cloud browser costs.
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `chrome-extension` folder in this repository.

---

## 🌟 Feature Map (Where things are scaffolded)

### Core UI Components (`src/components/`)
- **PlanReview.tsx**: Feature - Pre-execution plan review
- **Vault.tsx**: Feature - Credential manager & Auto-login
- **SkillsMarketplace.tsx**: Feature - Agent templates & Skills sharing
- **ExecutionGraph.tsx**: Feature - Visual plan execution graph

### Backend / Core Logic (`src/lib/`)
- **extract.ts**: Feature - Schema-based structured extraction
- **memory.ts**: Feature - Adaptive site memory
- **ai.ts**: Features - Ollama local LLM, BM25 filtering, AI Workflow Builder
- **workflow.ts**: Features - Sub-workflows, Workflow version history, Human-in-the-loop gates
- **integrations.ts**: Features - Google Sheets export, YouTube summarizer, CAPTCHA auto-solver
- **agentCore.ts**: Features - Audit logging, Persistent memory, Persona/Context injection, Async execution queue

### Edge Functions (`supabase/functions/`)
- **monitor-page**: Feature - Page change monitoring & Price drop alerts
- **telegram-webhook**: Feature - 2FA/OTP handling via Telegram
- **agent-api**: Feature - Hubtique Agent API (external triggering)
- **whatsapp-webhook**: Feature - WhatsApp / Messaging channels integration

### Chrome Extension (`chrome-extension/`)
- **background.js**: Features - Cross-tab content synthesis, Recording mode, Parallel multi-tab execution
- **content.js**: Features - Contextual task suggestions, 2FA prompt detection, On-page writing assistant, Session replay/audit snapshots

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run frontend locally
npm run dev

# Build frontend
npm run build
```
