'use strict';

var _ = require('lodash');
var Provider = require('./provider.model');
var config = require('../../config/environment');

// Get list of providers
exports.index = function(req, res) {
  Provider.find(function (err, providers) {
    if(err) { return handleError(res, err); }
    return res.json(200, providers);
  });
};

// Get a single provider
exports.show = function(req, res) {
  Provider.findById(req.params.id, function (err, provider) {
    if(err) { return handleError(res, err); }
    if(!provider) { return res.send(404); }
    return res.json(provider);
  });
};

/// Creates a new provider in the DB.
exports.create = function(req, res) {
 // console.log("req.user.name",req.user);

 /* if(config.userRoles.indexOf(req.user.role) < config.userRoles.indexOf('admin')) {
    return res.status(401).send('You need to be an admin to create posts');
  }*/

  console.log("req",req.user);
  //req.body.author = req.user.name;
  Provider.create(req.body, function(err, provider) {
    if(err) { return handleError(res, err); }
    return res.json(201, provider);
  });

};


// Creates upvote in the DB.
exports.upvote = function(req, res) {
  Provider.findById(req.params.id, function(err, provider) {
    if(err) return handleError(res, err);
    if(!provider) return res.status(404).end('Provider not found');

    if(req.user===undefined){//if user is not signed in  go to login page
      return res.status(401).end();
    }

    if(provider.author === req.user.name){
      res.write("Novote");//user cannot upvote his post
      return res.status(200).end();
    }
    if(provider.upvoteUser.indexOf(req.user.name)<0){//list of user that already upvoted.
      provider.upvotes++;
      provider.upvoteUser.push(req.user.name);

      provider.save(function (err) {
        if (err) return handleError(res, err);

        console.log('res from api UPVOTING REPLY',res.body); //response is null

        res.write("Upvote");
        return res.status(200).end();
      })
    }else{
      provider.upvotes--;
      provider.upvoteUser.pop(req.user.name);

      provider.save(function (err) {
        if (err) return handleError(res, err);
        console.log('res from api UPVOTING REPLY',res.body); //response is null
        res.write("Downvote");
        return res.status(200).end();
      })
    }
  });
};


// Updates an existing provider in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  Provider.findById(req.params.id, function (err, provider) {
    if (err) { return handleError(res, err); }
    if(!provider) { return res.send(404); }

    //after merge we should get only the ids
    //console.log('BEFORE MODIFICATION',req.body);
    var posts = req.body.posts;
    var postIds= new Array;
    posts.forEach(function(post){
      postIds.push(post._id);
    });
    req.body.posts = postIds;
    var updated = _.merge(provider, req.body);
    //console.log('AFTER MODIFICATION',updated);
    updated.save(function (err) {
      //hack for updating arrays
      Provider.findById(req.params.id, function (err, provider) {
        provider.locations = req.body.locations;
        provider.services = req.body.services;
        console.log("@@@@@@@@@@@@",req.body);
        //console.log(provider.services);
        provider.save(function (err) {
          if (err) {
            return handleError(res, err);
          }
          return res.json(200, provider);
        });
      });

    });
  });
};

// Deletes a provider from the DB.
exports.destroy = function(req, res) {
  Provider.findById(req.params.id, function (err, provider) {
    if(err) { return handleError(res, err); }
    if(!provider) { return res.send(404); }

    if(req.user.role === "admin" || req.user.role !== "super editor" && req.body.author !== provider.author ){
      return res.send(401).end('Unauthorise user to delete');
    }
    provider.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
