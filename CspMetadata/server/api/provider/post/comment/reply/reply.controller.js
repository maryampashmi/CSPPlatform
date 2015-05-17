'use strict';

var _ = require('lodash');
var q = require('q');
var Reply = require('./reply.model.js');
var Comment = require('../comment.model.js');

// Get list of replies
exports.index = function(req, res) {
 /* console.log('replyId', JSON.stringify(req.url));
  console.log('reply', JSON.stringify(reply));*/
  Comment.findById(req.originalUrl.split('/')[7]).select('replies').populate('replies').exec(  function(err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Comment not found'); }

    var promises = [];

    _.forEach(comment.replies, function(replyId) {
      promises.push(Reply.findById(replyId).exec());
    });

    q.allSettled(promises)
      .catch(_.partial(handleError, res))
      .then(function(results) {
        console.log(_.map(results, _.property('value')));
        return res.status(200).json(_.map(results, _.property('value')));
      })
  })
};


// Get a single reply
exports.show = function(req, res) {
  Reply.findById(req.params.id, function (err, reply) {
    if(err) { return handleError(res, err); }
    if(!reply) { return res.send(404); }
    return res.json(reply);
  }).populate('replies');
};

// Creates a new reply in the DB.
exports.create = function(req, res) {
  console.log('i am inside api');
  console.log(req.originalUrl.split('/')[7]);

  Comment.findById(req.originalUrl.split('/')[7], function (err, comment) { //here can not find comment at all.
    console.log('commentId', JSON.stringify(req.url));
    console.log('comment', JSON.stringify(comment));
    if (err) {
      return handleError(res, err);
    }
    if (!comment) {
      return res.status(404).send('Comment not found');
    }

    Reply.create(req.body, function (err, reply) {
      console.log('req.body',req.body);
      if (err) {
        return handleError(res, err);
      }

      comment.replies.push(reply.id);
      comment.save(function (err) {
        if (err) return handleError(res, err);
        return res.status(201).json(reply);
      });
    });
  });
};


// Updates an existing reply in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reply.findById(req.params.id, function (err, reply) {
    if (err) { return handleError(res, err); }
    if(!reply) { return res.send(404); }
    var updated = _.merge(reply, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reply);
    });
  });
};

// Deletes a reply from the DB.
exports.destroy = function (req, res) {
  Comment.findById(req.originalUrl.split('/')[7], function (err, comment) {
    console.log('commentId', JSON.stringify(req.url));
    console.log('comment', JSON.stringify(comment));
    if (err) {
      return handleError(res, err);
    }
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    Reply.findById(req.params.id, function (err, reply) {
      console.log('replyId', JSON.stringify(req.url));
      console.log('reply', JSON.stringify(reply));
      if (err) {
        return handleError(res, err);
      }
      if (!reply) {
        return res.send(404).end('Reply not found');
      }
    /* if(reply.author != req.user._id ) {
      console.log('reply.author',req.user._id);
      return res.status(401).end();
    }*/

      reply.remove(function (err) {
        if (err) {
          return handleError(res, err);
        }

        // Remove the post ID from provider.posts
        comment.replies = _.filter(comment.replies, function (x) {
          return x != req.params.id
        });

        comment.save(function (err, saved) {
          if (err) return handleError(res, err);
          return res.status(204).end();
        })
      });
    });
  });
};

/*exports.destroy = function(req, res) {

  // Will print the user trying to delete the reply
  console.log('User: ', req.user);

  Reply.findById(req.params.id, function (err, reply) {
    if(err) { return handleError(res, err); }
    if(!reply) { return res.send(404); }

    *//*if(reply.author != req.user._id ) {
      console.log('reply.author',req.user._id);
      return res.status(401).end();
    }*//*

    reply.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};*/

// upvote a reply from the DB.

  exports.upvote = function (req, res) {
    console.log('inside upvote');
    Reply.findById(req.params.id, function (err, reply) {
      if (err) return handleError(res, err);
      if (!reply) return res.status(404).end('Reply not found');
      reply.upvotes++;
      //console.log('COMMENT FROM API',reply.upvotes);
      reply.save(function (err) {
        if (err) return handleError(res, err);
        console.log('res from api UPVOTING REPLY',res.body); //response is null
        return res.status(200).end();
      })
    });
  };

function handleError(res, err) {
  return res.send(500, err);
}
