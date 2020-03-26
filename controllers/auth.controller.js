const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.login = (req, res) => {
  res.render("pages/login", {
      values: req.body
  });
};

module.exports.postLogin = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    const rows = await User.find({username: username});
    if (!rows) throw new Error('Invalid username or password');

    const rs = bcrypt.compareSync(req.body.pass, rows[0].password);

    if (!rs) throw new Error('Password Incorrect');

    res.redirect('/');

};