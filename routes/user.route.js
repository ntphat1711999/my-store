const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.index);

router.get('/:id', controller.get);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;