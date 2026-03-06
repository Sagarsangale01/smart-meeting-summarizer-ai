# System Architecture & Technical Decisions

This document details the architectural choices and technical strategies used in the **Smart Meeting Summarizer**.

---

## 1. System Architecture
The application follows a classic **Client-Server Architecture** with a focus on asynchronous AI processing.

### Architecture Diagram (Logic Flow)
1. **User Input**: User pastes a transcript into the React Frontend.
2. **API Request**: Frontend sends the text to the Node.js Backend.
3. **Context Injection (RAG)**: The Backend retrieves snippets of past meetings from the local storage to provide "Contextual Awareness."
4. **AI Generation**: The system sends a combined prompt (History + Current Transcript) to the OpenAI `gpt-4o-mini` model.
5. **Structured Output**: AI returns a strictly formatted JSON object.
6. **UI Hydration**: Frontend renders the JSON into interactive "Summary Cards."

## 2. Technical Decisions & Reasoning

### Choice of AI Model: `gpt-4o-mini`
- **Reasoning**: I selected `gpt-4o-mini` because it offers a perfect balance between **speed, cost, and intelligence**.
- **Alternative Considered**: `gpt-4-turbo` (Too slow/expensive for simple summarization) or `llama-3` (Requires complex local hosting).
- **Benefit**: Extremely low latency, which is critical for a smooth user dashboard experience.

### State Management: React Hooks
- **Reasoning**: For a single-page dashboard of this scale, Redux would be overkill. I used `useState` and `useEffect` with a custom API service layer.
- **Benefit**: Simplifies the codebase and improves maintainability while keeping performance high.

### Styling: Material UI (MUI) + Deep Dark Theme
- **Reasoning**: Entrata's tools often deal with dense data. A "Glassmorphism" dark theme with MUI reduces eye strain and gives the tool a premium "AI-native" feel.
- **Decision**: Custom HSL color palettes were used instead of stock MUI colors.

### Reliability: "Hallucination Guard"
- **Implementation**: I implemented a low `temperature` setting (0.1) in the LLM configuration.
- **Reasoning**: Summaries must be factually grounded. A low temperature ensures the AI stays "boring but accurate" instead of creative.

## 3. RAG (Retrieval-Augmented Generation) Strategy
Instead of sending 10 past meetings (which would hit token limits and cost), the backend maintains a summary of the *last few* interactions. This allows the AI to "remember" who "John" is or what the "Orion Project" mentioned last week refers to, without overwhelming the model.

---
**Author:** Sagar Sangale
