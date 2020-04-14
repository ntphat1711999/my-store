const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    avatar: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;