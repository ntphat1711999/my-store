const User = require('../models/user.model');

module.exports.index = async function (req, res) {
    let users = await User.find();
    res.render('pages/staff/index', {
        users: users
    });
}

module.exports.get = async function (req, res) {
    let user = await User.findOne({
        _id: req.params.id
    });
    res.render('pages/staff/view', {
        user: user
    });
}

module.exports.create = function (req, res) {
    res.render('pages/staff/create');
}

module.exports.postCreate = function (req, res) {
    let user = new User({
        name: req.body.name,
        phone: req.body.phone,
        salary: req.body.role === 'Quản lý' ? 5000000 : 3000000,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    user.save()
        .then(() => res.redirect('/staff'))
        .catch(err => res.status(400).json('Error: ', error));
}

module.exports.update = function (req, res) {

}

module.exports.postUpdate = function (req, res) {

}

module.exports.delete = async function (req, res) {
    await User.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/staff'))
        .catch(err => res.status(400).json('Error: ', err));
}