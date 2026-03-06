# Smart Meeting Summarizer 🎙️✨

**Technical Task**  
**Submitted by Sagar Sangale**

An AI-powered dashboard that transforms meeting transcripts into structured summaries (Topics, Decisions, Action Items) with context-aware history.

## 🖼️ Visual Demo

| Dashboard Overview | AI-Generated Summary |
|:---:|:---:|
| ![Dashboard](./doc/screenshots/dashboard.png) | ![Summary](./doc/screenshots/summary.png) |

| Meeting History | Mobile Responsive View |
|:---:|:---:|
| ![History](./doc/screenshots/history.png) | ![Responsive](./doc/screenshots/mobile.png) |

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v16+)
- OpenAI API Key

### 2. Installation
Clone the repository and install dependencies in both folders:

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### 3. Environment Setup
Create a `.env` file in the `backend/` directory by copying the example:

```bash
# In backend directory
cp .env.example .env
```

Then edit `.env` and add your OpenAI API key:
```env
PORT=5000
OPENAI_API_KEY=your_key_here
```

### 4. Running the App
Start both servers simultaneously:
- **Backend**: `cd backend && npm start` (Runs on port 5000)
- **Frontend**: `cd frontend && npm start` (Runs on port 3000)

---

## 📚 Documentation
For a deep dive into the technical details, please see the following documents:

1. [**Project Overview**](./doc/PROJECT_OVERVIEW.md)
2. [**Key Features**](./doc/KEY_FEATURES.md)
3. [**Technology Stack**](./doc/TECHNOLOGY_STACK.md)
4. [**Project Structure**](./doc/PROJECT_STRUCTURE.md)
5. [**Getting Started**](./doc/GETTING_STARTED.md)
6. [**System Architecture**](./doc/ARCHITECTURE.md)
7. [**AI Strategy**](./doc/AI_STRATEGY.md)

---

## 🛠️ Key Technical Highlights
- **Grounded AI**: Implemented low-temperature settings to prevent hallucinations.
- **Context-Awareness**: Built a lightweight RAG system for meeting continuity.
- **Responsive Design**: Fully responsive Material UI dashboard with glassmorphism aesthetics.
- **Developer-Ready**: Modular code structure following industry best practices.

---
**Note to Reviewer**: This project was built to demonstrate full-stack capabilities, AI integration, and a focus on clean, interactive User Experience.
