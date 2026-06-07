# Kingdom Ambassadors — Project Dashboard

A progress tracker for Kingdom Ambassadors Marketplace class projects.

## Deploy to Vercel (3 steps)

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "kingdom ambassadors dashboard"
gh repo create kingdom-dashboard --public --push
```
> If you don't have the GitHub CLI, create the repo at github.com manually and follow the push instructions.

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (use your GitHub account)
2. Click **Add New Project**
3. Import your `kingdom-dashboard` repo
4. Click **Deploy** — done ✅

Your live URL will be: `https://kingdom-dashboard.vercel.app` (or similar)

---

## Run locally
```bash
npm install
npm start
```
Opens at `http://localhost:3000`

## Features
- Add, edit, delete projects
- Track progress per project (0–100%)
- Filter by status: All / Active / Done / Stalled / Draft
- Mountain of influence tag per project
- Presentation date tracking
- Notes per project
- Data persists in localStorage (survives page refresh)
- Dark theme, mobile responsive

## Tech stack
- React 18 + TypeScript
- localStorage for persistence
- No external UI libraries
