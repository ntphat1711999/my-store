const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

router.get('/register', controller.register);

router.post('/register', controller.postRegister);

router.get('/resetpassword', controller.resetPassword);

router.post('/resetpassword', controller.postResetPassword);

module.exports = router;