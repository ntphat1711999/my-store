const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/update/:id', controller.update);

router.post('/update/:id', controller.postUpdate);

router.get('/delete/:id', controller.delete);

router.get('/:id', controller.get);

module.exports = router;