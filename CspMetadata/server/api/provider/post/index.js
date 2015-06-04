'use strict';

var express = require('express');
var controller = require('./post.controller.js');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',auth.appendUser(), controller.create);
router.put('/:id',auth.appendUser(), controller.update);
router.post('/:id',auth.appendUser(), controller.update);
router.delete('/:id', auth.appendUser(), controller.destroy);
router.put('/:id/upvote',auth.appendUser(), controller.upvote);

module.exports = router;
/*/api/providers/:providerId/posts/:postId/comments/*/
