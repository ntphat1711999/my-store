const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

module.exports.login = (req, res) => {
    res.render('pages/login', {
        values: req.body,
    });
};

module.exports.postLogin = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    const rows = await User.find({
        username: username,
    });
    if (!rows) throw new Error('Invalid username or password');

    const rs = bcrypt.compareSync(req.body.pass, rows[0].password);

    if (!rs) throw new Error('Password Incorrect');

    res.redirect('/');
};

module.exports.register = (req, res) => {
    res.render('pages/register', {
        err_msg: null,
    });
};

module.exports.postRegister = async (req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.password, N);
    const users = await User.find();
    const isHave = users.findIndex((user) => user.email === req.body.email);

    if (isHave < 0) {
        let newuser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });
        newuser
            .save()
            .then(() => res.redirect('/'))
            .catch((err) => console.log('Error: ', err));
    } else {
        res.render('pages/register', {
            err_msg: 'Username already exists',
        });
    }
};

module.exports.resetPassword = (req, res) => {
    res.render('pages/resetpassword', {
        values: req.body,
    });
};

module.exports.postResetPassword = async (req, res) => {
    const user = await User.find({
        email: req.body.email
    });
    if (user) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.USERNAME_MAIL, // generated ethereal user
                pass: process.env.PASSWORD_MAIL, // generated ethereal password
            },
        });

        const raw_newPassword = Math.random().toString(36).substr(2, 8);
        const newPassword = bcrypt.hashSync(raw_newPassword, 10);

        await User.findOneAndUpdate({
                email: req.body.email
            }, {
                $set: {
                    password: newPassword
                }
            })
            .then(() => console.log("Password was reseted !!"))
            .catch(err => console.log("Error: ", err));

        // setup email data with unicode symbols
        let mailOptions = {
            from: `"NTP Store Email" <${process.env.USERNAME_MAIL}>`, // sender address
            to: req.body.email, // list of receivers
            subject: 'Reset password', // Subject line
            html: `<h1>Your password was reseted</h1>
                        <span> New password: ${raw_newPassword} </span>    
                    `,
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });

        res.redirect('/account/login');
    } else {
        res.render('pages/resetpassword', {
            err_msg: 'Invalid email, please try again !!'
        });
    }
};