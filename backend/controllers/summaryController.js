const aiService = require('../services/aiService');
const ragService = require('../services/ragService');

exports.generateMeetingSummary = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript required' });
    }

    // Check if we have past context (RAG)
    const pastContext = ragService.getPastContext();
    const result = await aiService.generateSummary(transcript);

    // Save for future continuity
    ragService.addMeeting(transcript, result);

    res.json({
      ...result,
      ragUsed: !!pastContext
    });
  } catch (error) {
    console.error('Summary Controller Error:', error);

    res.status(500).json({
      error: 'Failed to generate summary',
      details: error.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = ragService.getAllMeetings();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

exports.clearHistory = async (req, res) => {
  try {
    ragService.clearHistory();
    res.json({ message: 'History cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear history' });
  }
};
