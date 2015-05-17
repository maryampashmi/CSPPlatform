'use strict';

var _ = require('lodash');
var q = require('q');
var Comment = require('./comment.model.js');
var Post = require('../post.model.js');
//var Provider = require('../../provider.model.js');


// Get list of comments
exports.index = function(req, res) {
  Post.findById(req.originalUrl.split('/')[5]).select('comments').populate('comments').exec( function(err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Post not found'); }

    var promises = [];

    _.forEach(post.comments, function(commentId) {
      promises.push(Comment.findById(commentId).exec());
    });

    q.allSettled(promises)
      .catch(_.partial(handleError, res))
      .then(function(results) {
        console.log(_.map(results, _.property('value')));
        return res.status(200).json(_.map(results, _.property('value')));

      })
  })
};
// /api/providers/5550bb0d56a7c1401ec70d89/posts/5550bb2056a7c1401ec70d8a/comments


// Get a single comment
exports.show = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    return res.json(comment);
  }).populate('comments');
};



// Creates a new comment in the DB.
exports.create = function(req, res) {
  //console.log('i am inside api');
  //console.log(req.originalUrl.split('/')[5]);

    Post.findById(req.originalUrl.split('/')[5], function (err, post) { //here can not find post at all.
      console.log('postId', JSON.stringify(req.url));
      console.log('post', JSON.stringify(post));
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return res.status(404).send('Post not found');
      }
      Comment.create(req.body, function (err, comment) {
        console.log('req.body',req.body);
        if (err) {
          return handleError(res, err);
        }
        post.comments.push(comment.id);
        post.save(function (err) {
          if (err) return handleError(res, err);
          return res.status(201).json(comment);
        });
      });
    });
  };


// Updates an existing comment in the DB.
  exports.update = function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    Comment.findById(req.params.id, function (err, comment) {
      if (err) {
        return handleError(res, err);
      }
      if (!comment) {
        return res.send(404);
      }
      var updated = _.merge(comment, req.body);
      updated.save(function (err) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(200, comment);
      });
    });
  };

// Deletes a comment from the DB.
  exports.destroy = function (req, res) {
    Post.findById(req.originalUrl.split('/')[5], function (err, post) {
      console.log('postId', JSON.stringify(req.url));
      console.log('post', JSON.stringify(post));
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return res.status(404).send('Post not found');
      }
      Comment.findById(req.params.id, function (err, comment) {
        console.log('commentId', JSON.stringify(req.url));
        console.log('comment', JSON.stringify(comment));
        if (err) {
          return handleError(res, err);
        }
        if (!comment) {
          return res.send(404).end('Comment not found');
        }
        comment.remove(function (err) {
          if (err) {
            return handleError(res, err);
          }

          // Remove the post ID from provider.posts
          post.comments = _.filter(post.comments, function (x) {
            return x != req.params.id
          });

          post.save(function (err, saved) {
            if (err) return handleError(res, err);
            return res.status(204).end();
          })
        });
      });
    });
  };

// upvote a comment from the DB.
  exports.upvote = function (req, res) {
    console.log('inside upvote');
    Comment.findById(req.params.id, function (err, comment) {
      if (err) return handleError(res, err);
      if (!comment) return res.status(404).end('Comment not found');
      comment.upvotes++;
      //console.log('COMMENT FROM API',comment.upvotes);
      comment.save(function (err) {
        if (err) return handleError(res, err);
        console.log('res from api UPVOTING COMMENT',res.body); //response is null
        return res.status(200).end();
      })
    });
  };


  function handleError(res, err) {
    return res.send(500, err);
  }
