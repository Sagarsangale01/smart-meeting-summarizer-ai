const aiService = require('../services/aiService');

exports.regenerateSection = async (req, res) => {
  try {
    const { transcript, section } = req.body;

    if (!transcript || !section) {
      return res.status(400).json({
        error: 'Transcript and section are required',
      });
    }

    // result will be { [section]: [...] } from aiService
    const result = await aiService.regenerateSection(transcript, section);

    res.json({
      section: section,
      data: result,
    });
  } catch (error) {
    console.error('Regenerate Controller Error:', error);

    res.status(500).json({
      error: 'Failed to regenerate section',
      details: error.message
    });
  }
};
