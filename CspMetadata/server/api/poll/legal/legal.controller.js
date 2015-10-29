'use strict';

var _ = require('lodash');
var Legal = require('./legal.model.js');

// Get list of legals
exports.index = function(req, res) {
  Legal.find(function (err, legals) {
    if(err) { return handleError(res, err); }
    return res.json(200, legals);
  });
};

// Get a single legal
exports.show = function(req, res) {
  Legal.findById(req.params.id, function (err, legal) {
    if(err) { return handleError(res, err); }
    if(!legal) { return res.send(404); }
    return res.json(legal);
  });
};

// Creates a new legal in the DB.
exports.create = function(req, res) {
  Legal.create(req.body, function(err, legal) {
    if(err) { return handleError(res, err); }
    return res.json(201, legal);
  });
};

// Updates an existing legal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Legal.findById(req.params.id, function (err, legal) {
    if (err) { return handleError(res, err); }
    if(!legal) { return res.send(404); }
    var updated = _.merge(legal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, legal);
    });
  });
};

// Deletes a legal from the DB.
exports.destroy = function(req, res) {
  Legal.findById(req.params.id, function (err, legal) {
    if(err) { return handleError(res, err); }
    if(!legal) { return res.send(404); }
    legal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

