# AI Tool Selection & Reasoning

As an AI developer, selecting the right tools is the most critical decision in building a reliable application. Below is the stack I selected for the **Smart Meeting Summarizer**.

---

## 1. Primary AI Engine: OpenAI API (`gpt-4o-mini`)

### Why I selected this tool:
1. **JSON Mode Reliability**: This task requires the AI to return structured data (arrays of topics/tasks). OpenAI provides the most consistent JSON output compared to open-source alternatives.
2. **Context Window**: It easily handles long transcripts (up to 128k tokens), which is necessary for hour-long meetings.
3. **Speed**: Summarization is an "on-demand" task. I chose the `mini` variant to ensure the user gets a result in <3 seconds.

## 2. Prompt Engineering Strategy

I utilized **Few-Shot Prompting** and **Strict System Instructions** as my primary "Tools" for quality control.

- **System Role**: Defined as a "Professional Meeting Assistant" to set the tone.
- **Output Constraints**: Specifically told the AI to avoid "According to the transcript..." filler text and jump straight to the data.
- **Fallback Logic**: Implemented a "Clean JSON" utility in the `aiService.js` to handle any markdown formatting the AI might accidentally include.

## 3. Vector-lite Content Strategy (Mock RAG)

Since this is a technical demonstration, I implemented a **Short-term Memory RAG**.

- **Reasoning**: A full Vector Database (like Pinecone) is powerful but introduces infrastructure complexity that can be brittle during a demo.
- **Selected Method**: Using a local JSON store to inject the most recent 3 summaries into the current prompt.
- **Benefit**: It demonstrates the *concept* of RAG (context-awareness) without requiring the hiring manager to setup cloud database keys.

## 4. UI Polish: Lottie & Framer-like Animations

For an "AI" tool, the visual feedback is part of the tool itself.

- **Reasoning**: AI can feel like a "black box." By using smooth transition animations and glow effects when the AI is "thinking," we increase user trust and satisfaction.

---
**Author:** Sagar Sangale
