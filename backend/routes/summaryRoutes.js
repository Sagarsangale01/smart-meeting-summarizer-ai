const express = require('express');
const router = express.Router();

const { generateMeetingSummary, getHistory, clearHistory } = require('../controllers/summaryController');

router.post('/summary', generateMeetingSummary);
router.get('/history', getHistory);
router.delete('/history', clearHistory);

module.exports = router;
