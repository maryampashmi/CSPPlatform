'use strict';


var _ = require('lodash');
var q = require('q');
var Rating = require('./rating.model.js');
var Provider = require('../provider.model.js');

// Get list of ratings
exports.index = function(req, res) {
  Provider.findById(req.originalUrl.split('/')[3]).select('ratings').populate('ratings').exec( function(err, provider) {
    if(err) { return handleError(res, err); }
    if(!provider) { return res.status(404).send('Provider not found'); }

    var promises = [];

    _.forEach(provider.ratings, function(ratingId) {
      promises.push(Rating.findById(ratingId).exec());
    });

    q.allSettled(promises)
      .catch(_.partial(handleError, res))
      .then(function(results) {
        console.log(_.map(results, _.property('value')));
        return res.status(200).json(_.map(results, _.property('value')));

      })
  });
};

// Get a single rating
exports.show = function(req, res) {
  Rating.findById(req.params.id, function (err, rating) {
    if(err) { return handleError(res, err); }
    if(!rating) { return res.send(404); }
    return res.json(rating);
  }).populate('ratings');
};

// Creates a new rating in the DB.
exports.create = function(req, res) {
  Provider.findById(req.originalUrl.split('/')[3], function(err, provider) {
    if(err) { return handleError(res, err); }
    if(!provider) { return res.status(404).send('Provider not found'); }

    if(req.user===undefined){//if user is not signed in  go to login page
      return res.status(401).end();
    }

    req.body.author = req.user.name;

    console.log('req.body.role',req.body.role)


    Rating.create(req.body, function(err, rating) {
      if(err) { return handleError(res, err); }

      provider.ratings.push(rating._id);
      provider.save(function(err) {
        if(err) return handleError(res, err);
        console.log('what save in database',res.body)
        return res.status(201).json(rating);
      });
    });
  });
};


// Updates an existing rating in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Rating.findById(req.params.id, function (err, rating) {
    if (err) { return handleError(res, err); }
    if(!rating) { return res.send(404); }

    if((req.user===undefined)||(rating.author != req.user.name && req.user.role !== "admin")) {

      return res.status(401).end();
    }

    var updated = _.merge(rating, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, rating);
    });
  });
};

// Deletes a rating from the DB.
exports.destroy = function(req, res) {
  Provider.findById(req.originalUrl.split('/')[3], function(err, provider) {
    console.log('providerId', JSON.stringify(req.url));
    console.log('provider', JSON.stringify(provider));
    if (err) {
      return handleError(res, err);
    }
    if (!provider) {
      return res.status(404).send('Comment not found');
    }
    console.log("req.params.id",req.params.id);

    Rating.findById(req.params.id, function (err, rating) {
      console.log('ratingId', JSON.stringify(req.url));
      console.log('rating', JSON.stringify(rating));
      if (err) {
        return handleError(res, err);
      }
      if (!rating) {
        return res.send(404).end('Rating not found');
      }
      console.log('req.user',req.user);
      console.log('rating.author',rating.author);

      if((req.user===undefined)||(rating.author != req.user.name && req.user.role !== "admin")) {

        return res.status(401).end();
      }
      rating.remove(function (err) {
        if (err) {
          return handleError(res, err);
        }
        // Remove the rating ID from provider.ratings
        provider.replies = _.filter(provider.replies, function (x) {
          return x != req.params.id
        });

        provider.ratings.splice(provider.ratings.indexOf(req.params.id),1);

        provider.save(function (err, saved) {
          if (err) return handleError(res, err);
          return res.status(204).end();
        })
      });
    });
  });
};

// upvote a rating from the DB.
exports.upvote = function(req, res) {
  Rating.findById(req.params.id, function(err, rating) {
    if(err) return handleError(res, err);
    if(!rating) return res.status(404).end('Rating not found');

    if(req.user===undefined){//if user is not signed in  go to login page
      return res.status(401).end();
    }
    if(rating.author === req.user.name){
      res.write("Novote");//user cannot upvote his rating
      return res.status(200).end();
    }
    if(rating.upvoteUser.indexOf(req.user.name)<0){//list of user that already upvoted.
      rating.upvotes++;
      rating.upvoteUser.push(req.user.name);

      rating.save(function (err) {
        if (err) return handleError(res, err);

        console.log('res from api UPVOTING REPLY',res.body); //response is null

        res.write("Upvote");
        return res.status(200).end();
      })
    }else{
      rating.upvotes--;
      rating.upvoteUser.pop(req.user.name);

      rating.save(function (err) {
        if (err) return handleError(res, err);
        console.log('res from api UPVOTING REPLY',res.body); //response is null
        res.write("Downvote");
        return res.status(200).end();
      })
    }
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
