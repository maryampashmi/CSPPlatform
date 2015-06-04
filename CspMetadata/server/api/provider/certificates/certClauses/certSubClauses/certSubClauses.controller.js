'use strict';

var _ = require('lodash');
var q = require('q');
var CertSubController = require('./CertSubClauses.model.js');
var CertController= require('../certClauses.model.js');

// Get list of CertSubController
exports.index = function(req, res) {
  //CertSubClauses.find(function (err, certSubClause) {
    CertController.findById(req.originalUrl.split('/')[7]).select('certSubControllers').populate('certSubControllers').exec(  function(err, certController) {
      if(err) { return handleError(res, err); }
      if(!certController) { return res.status(404).send('CertController not found'); }

      var promises = [];

      _.forEach(certController.CertSubController, function(certSubClauseId) {
        promises.push(CertSubClause.findById(certSubClauseId).exec());
      });

      q.allSettled(promises)
        .catch(_.partial(handleError, res))
        .then(function(results) {
          console.log(_.map(results, _.property('value')));
          return res.status(200).json(_.map(results, _.property('value')));
        })
    })
  };

// Get a single certSubClause
exports.show = function(req, res) {
  CertSubClause.findById(req.params.id, function (err, certSubClause) {
    if(err) { return handleError(res, err); }
    if(!certSubClause) { return res.send(404); }
    return res.json(certSubClause);
  });
};

// Creates a new certSubClause in the DB.
exports.create = function(req, res) {
  CertController.findById(req.originalUrl.split('/')[7], function (err, certController) { //here can not find certController at all.
      console.log('certControllerId', JSON.stringify(req.url));
      console.log('certController', JSON.stringify(certController));
      if (err) {
        return handleError(res, err);
      }
      if (!certController) {
        return res.status(404).send('CertController not found');
      }

      CertSubController.create(req.body, function (err, certSubController) {
        console.log('req.body',req.body);
        if (err) {
          return handleError(res, err);
        }

        certController.certSubControllers.push(certSubController._id);
        // certSubController.author = req.user._id, // this is i add user._id into author of certSubController.
        certController.save(function (err) {
          if (err) return handleError(res, err);
          return res.status(201).json(certSubController);
        });
      });
    });
  };


// Updates an existing certSubClause in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CertSubClause.findById(req.params.id, function (err, certSubClause) {
    if (err) { return handleError(res, err); }
    if(!certSubClause) { return res.send(404); }
    var updated = _.merge(certSubClause, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, certSubClause);
    });
  });
};

// Deletes a certSubClause from the DB.
exports.destroy = function(req, res) {
  //CertSubClause.findById(req.params.id, function (err, certSubClause) {
    CertController.findById(req.originalUrl.split('/')[7], function (err, certController) {
      console.log('certControllerId', JSON.stringify(req.url));
      console.log('certController', JSON.stringify(certController));
      if (err) {
        return handleError(res, err);
      }
      if (!certController) {
        return res.status(404).send('CertController not found');
      }
      console.log("req.params.id",req.params.id);
      CertSubClause.findById(req.params.id, function (err, certSubClause) {
        console.log('certSubClauseId', JSON.stringify(req.url));
        console.log('certSubClause', JSON.stringify(certSubClause));
        if (err) {
          return handleError(res, err);
        }
        if (!certSubClause) {
          return res.send(404).end('CertSubClause not found');
        }
        certSubClause.remove(function (err) {
          if (err) {
            return handleError(res, err);
          }

          // Remove the post ID from provider.posts
          certController.CertSubController = _.filter(certController.CertSubController, function (x) {
            return x != req.params.id
          });

          certController.save(function (err, saved) {
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
