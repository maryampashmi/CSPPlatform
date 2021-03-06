'use strict';


var _ = require('lodash');
var q = require('q');
var Rating = require('./rating.model.js');
var Provider = require('../provider.model.js');

// Get average reating for the provider
exports.index = function(req, res) {
  Rating.find({provider:req.originalUrl.split('/')[3]}).exec( function(err, ratings) {
    if(err) { return handleError(res, err); }
    if(!ratings) { return res.status(404).send('Rating not found'); }
    var total =0;
    _.forEach(ratings, function(rating) {
       total += rating.rating
    });
    var average= total/ratings.length;
    return res.status(201).json({average:average});
  });
};

/**
 * Method called to get average rating for list of providers posted
 * @param req
 * @param res
 */
exports.getAverageRating = function(req, res) {
  var providers = JSON.parse(JSON.stringify(req.body));
  Rating.find({}, function(err, ratings){
    //return res.status(201).json(ratings);
    req.body.forEach(function(provider,index){
      var totalRating=0;
      var users = 0;
      ratings.forEach(function(rating){
        if(new String(provider._id).valueOf() === new String(rating.provider).valueOf()){
          users++;
          totalRating = totalRating+ rating.rating;
        }
      })
      if(users==0){
        users =1;
      }
      providers[index].averageRating = totalRating/users;

    })
    return res.status(201).json(providers);
  });

}

/**
 * Method used to get the rating details for a posts by id
 * @param req
 * @param res
 */
exports.getProviderRating = function(req, res) {
  var posts = new Array;
  Rating.find({}, function(err, ratings){

    var user = "";

    if(typeof req.user !== "undefined" ){
      user = req.user.name
    }

    req.body.forEach(function(post,index){
      var userRating = 0;
      posts.push({});
      var totalRating=0;
      var users = 0;

      ratings.forEach(function(rating){
        if(new String(post).valueOf() === new String(rating.criteria).valueOf()){
          users++;
          totalRating = totalRating+ rating.rating;
          if(new String(rating.author).valueOf()===user){
            posts[index].userRating = rating.rating;
          }
        }

      })
      if(users===0){
        users =1;
      }
      posts[index].post = post;
      posts[index].averageRating = totalRating/users;

    })
    return res.status(201).json(posts);
  });

}

/**
 * Method used to update/insert a rating into db
 * @param req
 * @param res
 */
exports.insertupdate = function(req, res) {

  var postRating = req.body.post;
  var provider = req.body.provider;
  ///console.log(postRating);

  if(req.user===undefined){//if user is not signed in  go to login page
    return res.status(401).end();
  }
  var user = req.user.name;

  Rating.find({"provider":provider._id,"author":user} ,function(err,ratings){
    if(err) { console.log(err); }
    postRating.forEach(function(post){
      if(post.userRating>0 &&post.userRating<=5) {
        var ratingTobeUpdated = null;
        ratings.forEach(function (rating) {
          if (rating.criteria == post.post) {
            ratingTobeUpdated = rating;
          }
        });

        if (ratingTobeUpdated !== null) {
          ratingTobeUpdated.rating = post.userRating
          ratingTobeUpdated.save();
        } else {
          //insert a new record to db
          var rating = new Rating({
            "author": user,
            "rating": post.userRating,
            "criteria": post.post,
            "provider": provider._id
          })

          rating.save();
        }
      }
    });
  });

  return res.status(201).json(user);

}

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
    var mongoose = require('mongoose');

    req.body.author = req.user.name;
    req.body.provider = mongoose.Types.ObjectId.fromString(provider._id);
   // console.log('req.body.role',req.body.role)


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


function handleError(res, err) {
  return res.send(500, err);
}
