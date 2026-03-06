const OpenAI = require('openai');
const ragService = require('./ragService');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Clean the markdown blocks or any other surrounding text from the AI output.
 */
function cleanJsonResponse(response) {
  let cleaned = response.trim();
  // Remove markdown blocks if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n/i, '').replace(/\n```$/g, '');
  }
  return cleaned.trim();
}

/**
 * Generate a complete meeting summary from a transcript.
 */
async function generateSummary(transcript) {
  const pastContext = ragService.getPastContext();
  const contextPrompt = pastContext
    ? `\n\nPast meeting context for continuity:\n${pastContext}\n`
    : '';

  const prompt = `
You are an expert AI meeting assistant. Your task is to extract a highly structured and accurate summary from a meeting transcript.

From the meeting transcript extract:
1. Main Topics (concise list of what was discussed)
2. Key Decisions (any formal or informal conclusions reached)
3. Action Items (specific tasks with owner and deadline, if mentioned)

Continuity: ${contextPrompt ? 'Avoid redundancy if similar topics were covered, but ensure this meeting stands on its own. Use the past context only to inform your summary and ensure consistency.' : 'This is the first meeting in the series.'}

Rules for accuracy:
- STRICT: Do not invent or hallucinate decisions or owners. 
- If an owner or deadline is not mentioned, mark it as "Unassigned" or "No deadline".
- If no decisions or action items are found, return an empty array for those fields.

Transcript:
${transcript}

Return strictly formatted JSON ONLY:
{
  "topics": ["topic 1", "topic 2"],
  "decisions": ["decision 1", "decision 2"],
  "action_items": [
     { "task": "description", "owner": "name", "deadline": "date" }
  ]
}
`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional meeting assistant that always returns valid JSON only. Never include conversational filler, markdown code blocks, or explanations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.1, // Higher precision
    });

    const cleaned = cleanJsonResponse(response.choices[0].message.content);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('AI Service (Summary) Error:', error);
    throw error;
  }
}

/**
 * Regenerate only a specific section for better precision.
 */
async function regenerateSection(transcript, section) {
  // Map frontend section names to internal JSON structure names if necessary
  const sectionMap = {
    'mainTopics': 'topics',
    'keyDecisions': 'decisions',
    'actionItems': 'action_items'
  };

  const targetKey = sectionMap[section] || section;

  let jsonFormat;
  if (targetKey === 'action_items') {
    jsonFormat = `{ "${section}": [ { "task": "Task description", "owner": "Owner name", "deadline": "Deadline" } ] }`;
  } else {
    jsonFormat = `{ "${section}": ["Item 1", "Item 2", "..."] }`;
  }

  const prompt = `
Extract ONLY the "${section}" from the meeting transcript below. Focus on being precise and grounded in the text.

Transcript:
${transcript}

Rules:
- Grounded in text: Do not hallucinate.
- Return ONLY the requested section in valid JSON format:
${jsonFormat}
`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a precise JSON extraction assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
    });

    const cleaned = cleanJsonResponse(response.choices[0].message.content);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('AI Service (Regenerate) Error:', error);
    return { [section]: [] }; // fallback
  }
}

module.exports = { generateSummary, regenerateSection };
