'use strict';

var _ = require('lodash');
var q = require('q');
var Certificate = require('../certificates.model.js');
var CertController= require('./certClauses.model.js');

// Get list of certClause
exports.index = function(req, res) {
    Certificate.findById(req.originalUrl.split('/')[5]).select('certClauses').populate('certClauses').exec( function(err, certificate) {
      if(err) { return handleError(res, err); }
      if(!certificate) { return res.status(404).send('Certificate not found'); }

      var promises = [];

      _.forEach(certificate.certClauses, function(certClauseId) {
        promises.push(CertController.findById(certClauseId).exec());
      });

      q.allSettled(promises)
        .catch(_.partial(handleError, res))
        .then(function(results) {
          console.log(_.map(results, _.property('value')));
          return res.status(200).json(_.map(results, _.property('value')));

        })
    })
  };

// Get a single certClause
exports.show = function(req, res) {
  CertController.findById(req.params.id, function (err, certClause) {
    if(err) { return handleError(res, err); }
    if(!certClause) { return res.send(404); }
    return res.json(certClause);
  });
};

// Creates a new certClause in the DB.
exports.create = function(req, res) {
   Certificate.findById(req.originalUrl.split('/')[5], function (err, certificate) { //here can not find certificate at all.
      console.log('certificateId', JSON.stringify(req.url));
      console.log('certificate', JSON.stringify(certificate));
      if (err) {
        return handleError(res, err);
      }
      if (!certificate) {
        return res.status(404).send('Certificate not found');
      }
      CertController.create(req.body, function (err, certClause) {


        console.log('req.body',req.body);
        if (err) {
          return handleError(res, err);
        }
        certificate.certControllers.push(certClause._id);
        certificate.save(function (err) {
          if (err) return handleError(res, err);
          return res.status(201).json(certClause);
        });
      });
    });
  };

// Updates an existing certClause in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CertController.findById(req.params.id, function (err, certClause) {
    if (err) { return handleError(res, err); }
    if(!certClause) { return res.send(404); }
    var updated = _.merge(certClause, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, certClause);
    });
  });
};

// Deletes a certClause from the DB.
exports.destroy = function(req, res) {
    Certificate.findById(req.originalUrl.split('/')[5], function (err, certificate) {
      console.log('certificateId', JSON.stringify(req.url));
      console.log('certificate', JSON.stringify(certificate));
      if (err) {
        return handleError(res, err);
      }
      if (!certificate) {
        return res.status(404).send('Certificate not found');
      }
      CertController.findById(req.params.id, function (err, certClause) {
        console.log('certClauseId', JSON.stringify(req.url));
        console.log('certClause', JSON.stringify(certClause));
        if (err) {
          return handleError(res, err);
        }
        if (!certClause) {
          return res.send(404).end('CertController not found');
        }
        certClause.remove(function (err) {
          if (err) {
            return handleError(res, err);
          }

          // Remove the certificate ID from provider.certificates
          certificate.certClauses = _.filter(certificate.certClauses, function (x) {
            return x != req.params.id
          });

          certificate.save(function (err, saved) {
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
