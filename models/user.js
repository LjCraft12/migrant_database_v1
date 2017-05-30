const mongoose = require('mongoose');

// Client Schema
let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
});

let     User = module.exports = mongoose.model('User', userSchema);