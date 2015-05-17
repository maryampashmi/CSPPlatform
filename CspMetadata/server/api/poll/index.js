'use strict';

var express = require('express');
var controller = require('./poll.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('editor'),controller.index);
router.get('/:id', auth.hasRole('editor'),controller.show);
router.post('/', auth.hasRole('editor'),controller.create);
router.put('/:id',auth.hasRole('editor'), controller.update);
router.patch('/:id', auth.hasRole('editor'),controller.update);
router.delete('/:id',auth.hasRole('editor'), controller.destroy);

module.exports = router;
