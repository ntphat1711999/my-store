const User = require('../models/user.model');

module.exports.index = async function (req, res) {
    var users = await User.find();
    res.render('pages/staff/index', {
        users: users
    });
}

module.exports.get = async function(req, res){
    var users = await User.find();
    res.render('pages/staff/view', {
        users: users
    });
}

module.exports.create = function (req, res) {
    res.render('pages/staff/create');
} 

module.exports.postCreate = function(req, res){
    // User.insertMany(req.body);
    res.redirect('/staff');
}
