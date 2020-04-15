const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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
    const rows = await User.find({
        username: username
    });
    if (!rows) throw new Error('Invalid username or password');

    const rs = bcrypt.compareSync(req.body.pass, rows[0].password);

    if (!rs) throw new Error('Password Incorrect');

    res.redirect('/');

};


module.exports.register = (req, res) => {
    res.render("pages/register", {
        err: null
    });
};


module.exports.postRegister = async (req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.password, N);
    const users = await User.find();
    const isHave = users.findIndex(user => user.username === req.body.username);

    if (isHave < 0) {
        let newuser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hash
        });
        newuser.save()
            .then(() => res.redirect('/'))
            .catch(err => console.log('Error: ', err))
    } else {
        res.render('pages/register', {
            err: 'Username already exists'
        })
    }
};

module.exports.resetPassword = (req, res) => {
    res.render("pages/resetpassword", {
        values: req.body
    });
};

module.exports.postResetPassword = async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USERNAME_MAIL, // generated ethereal user
            pass: process.env.PASSWORD_MAIL // generated ethereal password
        }
    });

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <taikhoanriengtu1@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: '<h1>Hello World</h1>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {
            msg: 'Email has been sent'
        });
    });

    res.redirect('/account/login');
}