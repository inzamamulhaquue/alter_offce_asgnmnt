const express = require('express');
const { collectEvent, getEventSummary, getUserStats } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/collect', authMiddleware, collectEvent);
router.get('/event-summary', authMiddleware, getEventSummary);
router.get('/user-stats', authMiddleware, getUserStats);

module.exports = router;
