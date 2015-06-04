'use strict';

var _ = require('lodash');
var Wiki = require('./wiki.model');
var final = require('./final');

// Get list of wikis
exports.index = function(req, res) {

  final.bulkInsert(req,res);
  /*Wiki.find(function (err, wikis) {
    if(err) { return handleError(res, err); }
    return res.json(200, wikis);
  });*/
};

// Get a single wiki
exports.show = function(req, res) {
  Wiki.findById(req.params.id, function (err, wiki) {
    if(err) { return handleError(res, err); }
    if(!wiki) { return res.send(404); }
    return res.json(wiki);
  });
};

// Creates a new wiki in the DB.
exports.create = function(req, res) {
  Wiki.create(req.body, function(err, wiki) {
    if(err) { return handleError(res, err); }
    return res.json(201, wiki);
  });
};

// Updates an existing wiki in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Wiki.findById(req.params.id, function (err, wiki) {
    if (err) { return handleError(res, err); }
    if(!wiki) { return res.send(404); }
    var updated = _.merge(wiki, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, wiki);
    });
  });
};

// Deletes a wiki from the DB.
exports.destroy = function(req, res) {
  Wiki.findById(req.params.id, function (err, wiki) {
    if(err) { return handleError(res, err); }
    if(!wiki) { return res.send(404); }
    wiki.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
