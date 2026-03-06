const fs = require('fs');
const path = require('path');

// Simple file-based RAG storage for the prototype
const DATA_PATH = path.join(__dirname, '../data/meetings.json');

// Initialize the data file if it doesn't exist
if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify([]));
}

/**
 * Saves a new meeting entry to the local JSON storage.
 */
function addMeeting(transcript, summary) {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

        const newMeeting = {
            id: Date.now(),
            date: new Date().toISOString(),
            transcript: transcript.substring(0, 500), // store a snippet
            summary: summary,
        };

        // Keep only the last 10 meetings for the prototype
        const updatedData = [newMeeting, ...data].slice(0, 10);
        fs.writeFileSync(DATA_PATH, JSON.stringify(updatedData, null, 2));
        return true;
    } catch (err) {
        console.error('Failed to save meeting to RAG:', err);
        return false;
    }
}

/**
 * Retrieves past context for the current meeting summary generation.
 * For this prototype, we'll return the summary of the most recent meeting
 * to provide continuity.
 */
function getPastContext() {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
        if (data.length === 0) return null;

        // Return the last meeting summary to provide continuity
        const lastMeeting = data[0];
        return `
Previous Meeting Context (for continuity):
Main Topics: ${lastMeeting.summary.topics.join(', ')}
Key Decisions: ${lastMeeting.summary.decisions.join(', ')}
`;
    } catch (err) {
        console.error('Failed to retrieve past context:', err);
        return null;
    }
}

/**
 * Retrieves all stored meetings for the UI history.
 */
function getAllMeetings() {
    try {
        return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    } catch (err) {
        return [];
    }
}

/**
 * Clears all history from the RAG store.
 */
function clearHistory() {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify([]));
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    addMeeting,
    getPastContext,
    getAllMeetings,
    clearHistory,
};
