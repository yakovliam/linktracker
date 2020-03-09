const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        default: "ERR"
    },
    urlSlug: {
        type: String,
        required: true,
        default: "ERR"
    },
    date: {
        type: Number,
        default: Date.now(),
        required: true
    }
}, {collection: "clicks"});

module.exports = mongoose.model('Click', clickSchema); // export schema