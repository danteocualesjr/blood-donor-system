# BloodLink - AI-Powered Blood Donor System

An AI-powered blood donor search system. Ask natural-language questions to find donors, check blood type compatibility, and get answers about blood donation.

## Features

- **AI-powered search** — Ask questions like "Find O+ donors near Manila" or "Who can donate to AB+?"
- **Chat interface** — Conversational AI assistant (BloodLink AI) powered by OpenAI
- **Location & blood type filters** — Browse and filter donors by area and blood type
- **Donor cards** — View available donors with blood type, location, distance, and donation history
- **Responsive design** — Mobile-first layout

## Tech Stack

- React + TypeScript + Vite (frontend)
- Tailwind CSS v4 (styling)
- Express (API server)
- OpenAI GPT-4o-mini (AI)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your OpenAI API key

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-api-key
```

### 3. Run the app

```bash
npm run dev
```

This starts both the Express API server (port 3001) and the Vite dev server (port 5173).

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```
# blood-donor-system
