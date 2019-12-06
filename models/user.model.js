const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    username: String,
    address: String,
    password: String,
    roles: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;