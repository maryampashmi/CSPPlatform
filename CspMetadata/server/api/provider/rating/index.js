'use strict';

var express = require('express');
var controller = require('./rating.controller.js');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',auth.appendUser(), controller.create);
router.post('/getAverageRating', controller.getAverageRating);
router.put('/:id',auth.appendUser(), controller.update);
router.post('/:id',auth.appendUser(), controller.update);
router.delete('/:id', auth.appendUser(), controller.destroy);
router.put('/:id/upvote',auth.appendUser(), controller.upvote);

module.exports = router;
