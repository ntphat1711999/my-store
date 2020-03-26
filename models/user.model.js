const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    salary: Number,
    address: String,
    username: String,
    password: String,
    roles: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;