const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    event: String,
    url: String,
    referrer: String,
    device: String,
    ipAddress: String,
    timestamp: Date,
    metadata: Object,
    appId: String
});

module.exports = mongoose.model('Event', EventSchema);