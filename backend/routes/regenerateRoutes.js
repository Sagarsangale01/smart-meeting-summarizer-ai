const express = require('express');
const router = express.Router();

const { regenerateSection } = require('../controllers/regenerateController');

router.post('/regenerate', regenerateSection);

module.exports = router;
