'use strict';

var _ = require('lodash');
var Privacy = require('./privacy.model.js');

// Get list of privacys
exports.index = function(req, res) {
  Privacy.find(function (err, privacys) {
    if(err) { return handleError(res, err); }
    return res.json(200, privacys);
  });
};

// Get a single privacy
exports.show = function(req, res) {
  Privacy.findById(req.params.id, function (err, privacy) {
    if(err) { return handleError(res, err); }
    if(!privacy) { return res.send(404); }
    return res.json(privacy);
  });
};

// Creates a new privacy in the DB.
exports.create = function(req, res) {
  Privacy.create(req.body, function(err, privacy) {
    if(err) { return handleError(res, err); }
    return res.json(201, privacy);
  });
};

// Updates an existing privacy in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Privacy.findById(req.params.id, function (err, privacy) {
    if (err) { return handleError(res, err); }
    if(!privacy) { return res.send(404); }
    var updated = _.merge(privacy, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, privacy);
    });
  });
};

// Deletes a privacy from the DB.
exports.destroy = function(req, res) {
  Privacy.findById(req.params.id, function (err, privacy) {
    if(err) { return handleError(res, err); }
    if(!privacy) { return res.send(404); }
    privacy.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
