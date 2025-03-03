const express = require('express');
const { registerApp, getApiKey, revokeApiKey } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerApp);
router.get('/api-key', getApiKey);
router.post('/revoke', revokeApiKey);

module.exports = router;