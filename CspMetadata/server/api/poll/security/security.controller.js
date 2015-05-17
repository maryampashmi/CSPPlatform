'use strict';

var _ = require('lodash');
var Security = require('./security.model.js');

// Get list of securitys
exports.index = function(req, res) {
  Security.find(function (err, securitys) {
    if(err) { return handleError(res, err); }
    return res.json(200, securitys);
  });
};

// Get a single security
exports.show = function(req, res) {
  Security.findById(req.params.id, function (err, security) {
    if(err) { return handleError(res, err); }
    if(!security) { return res.send(404); }
    return res.json(security);
  });
};

// Creates a new security in the DB.
exports.create = function(req, res) {
  Security.create(req.body, function(err, security) {
    if(err) { return handleError(res, err); }
    return res.json(201, security);
  });
};

// Updates an existing security in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Security.findById(req.params.id, function (err, security) {
    if (err) { return handleError(res, err); }
    if(!security) { return res.send(404); }
    var updated = _.merge(security, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, security);
    });
  });
};

// Deletes a security from the DB.
exports.destroy = function(req, res) {
  Security.findById(req.params.id, function (err, security) {
    if(err) { return handleError(res, err); }
    if(!security) { return res.send(404); }
    security.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
