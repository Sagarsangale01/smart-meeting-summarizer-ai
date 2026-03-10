# How to Present: Code Flow Guide

This document prepares you to explain the "Heart of the Application" if the manager asks: *"Walk me through the code of how a summary is generated."*

---

## 🌊 The 5-Step Logic Flow

### 1. Frontend: The Trigger
**File**: `frontend/src/pages/Dashboard.js` -> `handleGenerate()`
- **Explain**: "When the user clicks generate, the `transcript` state is sent to our API service. I use a loading state here to provide immediate feedback to the user."

### 2. Service Layer: The Bridge
**File**: `frontend/src/services/api.js`
- **Explain**: "I built a clean service layer using Axios. This keeps my UI components focused on rendering, while the logic for communicating with the server stays central."

### 3. Backend: The Orchestrator
**File**: `backend/controllers/summaryController.js`
- **Explain**: "The controller receives the transcript. But before it goes to the AI, it calls the `ragService`. This is where the magic happens—we pull in past meeting context to give the AI 'memory' of who the team members are."

### 4. The AI Engine: Prompt Engineering
**File**: `backend/services/aiService.js`
- **Explain**: "This is the core. I use a **Strict System Prompt**. Notice how I've defined the JSON structure in the prompt. This ensures the AI always returns valid data. I also use a `cleanJsonResponse` helper to strip out any markdown formatting, making the system much more robust."

### 5. UI Hydration: Interactive Design
**File**: `frontend/src/components/SummaryCard.js`
- **Explain**: "Finally, the JSON returns to the frontend. We map this data into `SummaryCard` components. I've made these interactive; users can edit items inline or trigger a targeted regeneration of just one specific section."

---

## 🎯 High-Level Key Phrases to Use:
- **"Separation of Concerns"**: (Mention how UI, Services, and Controllers are separated).
- **"State Synchronization"**: (How you keep the local history and server history in sync).
- **"Error Handling"**: (Show how you handle the case if the AI returns an invalid format).
- **"Developer Experience (DX)"**: (Mention how the modular folder structure makes it easy for a team to collaborate on this code).

---
**Prepared for:** Sagar Sangale  
**Goal:** Impress Entrata Technical Management
