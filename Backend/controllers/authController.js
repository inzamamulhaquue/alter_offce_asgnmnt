const ApiKey = require('../models/ApiKey');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Register a new app and generate an API key
exports.registerApp = async (req, res) => {
    try {
        const { appName, ownerEmail } = req.body;
        
        if (!appName || !ownerEmail) {
            return res.status(400).json({ error: 'App name and owner email are required' });
        }

        const appId = uuidv4();  // Generate a unique app ID
        const apiKey = crypto.randomBytes(32).toString('hex'); // Generate secure API key

        // Store in Database
        await ApiKey.create({ appId, key: apiKey, appName, ownerEmail, revoked: false });

        res.status(201).json({ message: 'App registered successfully', appId, apiKey });
    } catch (error) {
        console.error("Error registering app:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get API key by App ID
exports.getApiKey = async (req, res) => {
    try {
        const { appId } = req.query;
        if (!appId) return res.status(400).json({ error: 'App ID is required' });

        const apiKey = await ApiKey.findOne({ appId, revoked: false });
        if (!apiKey) return res.status(404).json({ error: 'API Key not found' });

        res.json({ apiKey: apiKey.key });
    } catch (error) {
        console.error("Error fetching API key:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Revoke an API Key
exports.revokeApiKey = async (req, res) => {
    try {
        const { appId } = req.body;
        if (!appId) return res.status(400).json({ error: 'App ID is required' });

        const updated = await ApiKey.updateOne({ appId }, { revoked: true });
        if (updated.modifiedCount === 0) return res.status(404).json({ error: 'App ID not found' });

        res.json({ message: 'API Key revoked successfully' });
    } catch (error) {
        console.error("Error revoking API key:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};