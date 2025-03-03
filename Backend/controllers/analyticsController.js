const Event = require('../models/Event');
const redisClient = require('../config/redis');

exports.collectEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: 'Event recorded' });
};

exports.getEventSummary = async (req, res) => {
    const { event, startDate, endDate, appId } = req.query;
    const cacheKey = `event-summary:${event}:${appId}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));
    
    const query = { event };
    if (appId) query.appId = appId;
    if (startDate && endDate) query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    
    const totalEvents = await Event.countDocuments(query);
    const deviceData = await Event.aggregate([
        { $match: query },
        { $group: { _id: '$device', count: { $sum: 1 } } }
    ]);
    
    const response = { event, count: totalEvents, deviceData };
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));
    res.json(response);
};

exports.getUserStats = async (req, res) => {
    const { userId } = req.query;
    const events = await Event.find({ userId });
    res.json({ userId, totalEvents: events.length, deviceDetails: events[0]?.metadata, ipAddress: events[0]?.ipAddress });
};