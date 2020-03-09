const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        default: "url"
    },
    urlSlug: {
        type: String,
        required: true,
        default: "slug"
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Number,
        default: Date.now(),
        required: true
    }
}, {collection: "links"});

module.exports = mongoose.model('Link', linkSchema); // export schema