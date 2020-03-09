const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now(),
        required: false
    }
});

module.exports = mongoose.model('Link', linkSchema); // export schema