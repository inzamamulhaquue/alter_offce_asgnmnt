const ApiKey = require('../models/ApiKey');

const authMiddleware = async (req, res, next) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
        return res.status(403).json({ error: 'API Key is required' });
    }

    try {
        const keyRecord = await ApiKey.findOne({ key: apiKey, revoked: false });
        if (!keyRecord) {
            return res.status(401).json({ error: 'Invalid or revoked API Key' });
        }

        req.appId = keyRecord.appId; // Attach appId to the request for further use
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.validateApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ error: 'API Key is required' });
    }

    const validKey = await ApiKey.findOne({ key: apiKey });

    if (!validKey) {
        return res.status(403).json({ error: 'API Key not found in database' });
    }

    if (validKey.revoked) {
        return res.status(403).json({ error: 'API Key has been revoked' });
    }

    next();
};

module.exports = authMiddleware;
