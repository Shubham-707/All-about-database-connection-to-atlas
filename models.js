//schema for database

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Qualification: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Gender: {
        type: String,
        required: true
    }
})

const User = new mongoose.model('User', UserSchema);
module.exports = User;