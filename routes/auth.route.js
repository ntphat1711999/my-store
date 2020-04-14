const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

router.get('/register', controller.register);

router.get('/resetpassword', controller.resetPassword);

module.exports = router;