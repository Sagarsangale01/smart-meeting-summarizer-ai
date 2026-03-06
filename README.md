# Smart Meeting Summarizer 🎙️✨

**Technical Task**  
**Submitted by Sagar Sangale**

An AI-powered dashboard that transforms meeting transcripts into structured summaries (Topics, Decisions, Action Items) with context-aware history.

## 🖼️ Visual Demo

|              Dashboard Overview               |           AI-Generated Summary            |
| :-------------------------------------------: | :---------------------------------------: |
| ![Dashboard](./doc/screenshots/dashboard.png) | ![Summary](./doc/screenshots/summary.png) |

|              Meeting History              |           Mobile Responsive View            |
| :---------------------------------------: | :-----------------------------------------: |
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

Create `.env` files in both the `backend/` and `frontend/` directories by copying the provided examples:

**Backend Setup (`backend/.env`):**

```bash
# In backend directory
cp .env.example .env
```

Edit `backend/.env` and add your OpenAI API key:

```env
PORT=5000
OPENAI_API_KEY=your_openai_key_here
```

**Frontend Setup (`frontend/.env`):**

```bash
# In frontend directory
cp .env.example .env
```

Edit `frontend/.env` and configure the API URL:

```env
REACT_APP_API_URL=http://your_domain_name/api
# For local setup, use: http://localhost:5000/api
```

### 4. Running the App

Start both servers simultaneously:

- **Backend**: `cd backend && npm start` (Runs on port 5000)
- **Frontend**: `cd frontend && npm start` (Runs on port 3000)

---

## ☁️ AWS Cloud Deployment

This project is designed with a cloud-native mindset and can be professionally deployed on AWS:

- **Frontend**: Amazon S3 (Static Website Hosting)
- **Backend**: AWS EC2 (Elastic Compute Cloud - Node.js)

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
