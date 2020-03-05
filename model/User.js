const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 2048,
        min: 3
    },
    date: {
        type: Date,
        default: Date.now(),
        required: false
    }
});

module.exports = mongoose.model('User', userSchema); // export schema for the user