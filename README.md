# Hubtique OS - Top 10 Features Implementation

This repository contains the foundational scaffolding and implementation of the Top 10 features identified in the competitive analysis for Hubtique OS. It is designed to be free, running entirely on a React frontend (deployable via Lovable) and Supabase (free tier).

## 🚀 Deployment Guide (Free)

### 1. Frontend Web App (Lovable / Vercel)
The web application is a standard Vite + React + TypeScript project.
To deploy for free:
- **Lovable**: Push this repository to GitHub. Use Lovable's GitHub integration to automatically deploy the `main` branch. It will detect the Vite project and build it.
- **Alternative (Vercel/Netlify)**: Connect your GitHub repository to Vercel or Netlify. The build command is `npm run build` and the output directory is `dist`.

### 2. Backend Logic (Supabase Free Tier)
We use Supabase for persistent data and background execution.
1. Create a free account at [Supabase](https://supabase.com/).
2. Create a new project.
3. Install the Supabase CLI locally: `npm install -g supabase`
4. Login: `supabase login`
5. Link project: `supabase link --project-ref <your-project-id>`
6. Deploy edge functions: `supabase functions deploy monitor-page` and `supabase functions deploy telegram-webhook`.

### 3. Chrome Extension
The extension provides DOM access and handles recording tasks, memory, and async execution.
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** and select the `chrome-extension` folder in this repository.

## 🌟 Implemented Features

1. **Pre-execution Plan Review** (`src/components/PlanReview.tsx`)
2. **Page Change Monitoring** (`supabase/functions/monitor-page`)
3. **Cross-tab Content Synthesis** (`chrome-extension/background.js`)
4. **Recording Mode** (`chrome-extension/content.js` & `background.js`)
5. **Credential Manager + Auto-login** (`src/components/Vault.tsx`)
6. **Contextual Task Suggestions** (`chrome-extension/content.js`)
7. **2FA Handling** (`chrome-extension/content.js` & `telegram-webhook`)
8. **Background Async Task Execution** (`chrome-extension/background.js`)
9. **Schema-based Structured Extraction** (`src/lib/extract.ts`)
10. **Adaptive Site Memory** (`src/lib/memory.ts`)

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run frontend
npm run dev

# Build frontend
npm run build
```
