# Presentation Script: Smart Meeting Summarizer

Use this script as a guide for your video recording. Aim for a **3-5 minute** video.

---

## 🎬 Introduction (0:00 - 0:45)
"Hi everyone, my name is **Sagar Sangale**, and today I'm excited to present my technical submission for the **Entrata** Software Engineer task.

I've built a **Smart Meeting Summarizer**. The core problem I wanted to solve is 'Information Overload'—meetings are long, transcripts are messy, and finding action items manually is a waste of time. My tool uses AI to automate this with 100% grounding in the actual meeting data."

## 🚀 The Live Demo (0:45 - 2:30)
*(Screen share: Your running application at localhost:3000)*

"Here is the dashboard. It features a clean, professional dark mode interface designed for high-focus work.

1. **Inputting Data**: I'm going to grab a 'Sprint Review' template. You can see the transcript is quite raw.
2. **Generating Summary**: When I click 'Generate', the backend doesn't just summarize; it uses a custom **RAG (Retrieval-Augmented Generation)** strategy. It looks at my past meetings to ensure continuity.
3. **The Result**: In seconds, we have a structured summary.
    - **Main Topics**: Clear bullet points.
    - **Key Decisions**: Formal conclusions.
    - **Action Items**: Look how it correctly identified the owner and the deadline automatically.
4. **Interactive Features**: If the AI makes a small mistake, I can click any item and **edit it inline**. Alternatively, if I want to explore more details for a section, I can click **'Regenerate'** to target just that specific topic."

## 🛠️ Technical Deep Dive (2:30 - 4:00)
*(Screen share: Open VS Code to `backend/services/aiService.js` and `frontend/src/pages/Dashboard.js`)*

"Under the hood, I've focused on three main things:

1. **Model Selection**: I chose **GPT-4o-mini**. It's fast and reliable for JSON output. I've set the temperature to **0.1** to ensure the AI stays strictly factual—no hallucinations.
2. **System Architecture**: It's a decoupled **React/Node.js** architecture. The frontend uses **Material UI** for a premium feel, while the backend manages meeting history and context injection.
3. **Continuity (RAG)**: I built a lightweight RAG system. Before summarizing, the backend injects context from previous meetings so the AI understands who 'John' or 'Project Orion' is, providing a seamless experience across multiple sessions."

## 🏁 Conclusion (4:00 - 4:30)
"This project demonstrates my ability to build full-stack applications, integrate complex AI workflows, and most importantly, deliver a tool that is **production-ready and user-centric**.

Thank you for your time, and I'm looking forward to discussing this further with the Entrata team!"

---

### 💡 Recording Tips:
- **Clean Environment**: Ensure your terminal and browser tabs are clean.
- **Microphone**: Use a good headset if possible.
- **Energy**: Speak clearly and with confidence!
