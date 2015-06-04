'use strict';

var _ = require('lodash');
var q = require('q');
var Certificate = require('./certificates.model.js');
var Provider = require('../provider.model.js');

// Get list of certificates
exports.index = function(req, res) {
  Provider.findById(req.originalUrl.split('/')[3]).select('certificates').populate('certificates').exec( function(err, provider) {
    if(err) { return handleError(res, err); }
    if(!provider) { return res.status(404).send('Provider not found'); }

    var promises = [];

    _.forEach(provider.certificates, function(certificateId) {
      promises.push(Certificate.findById(certificateId).exec());
    });

    q.allSettled(promises)
      .catch(_.partial(handleError, res))
      .then(function(results) {
        console.log(_.map(results, _.property('value')));
        return res.status(200).json(_.map(results, _.property('value')));

      })
  });
};


// Get a single certificate
exports.show = function(req, res) {
  Certificate.findById(req.params.id, function (err, certificate) {
    if(err) { return handleError(res, err); }
    if(!certificate) { return res.send(404); }
    return res.json(certificate);
  });
};

// Creates a new certificate in the DB.
exports.create = function(req, res) {
  Provider.findById(req.originalUrl.split('/')[3], function(err, provider) {
    if(err) { return handleError(res, err); }
    if(!provider) { return res.status(404).send('Provider not found'); }

    Certificate.create(req.body, function(err, certificate) {
      if(err) { return handleError(res, err); }

      provider.certificates.push(certificate._id);
      provider.save(function(err) {
        if(err) return handleError(res, err);
        console.log('what save in database',res.body)
        return res.status(201).json(certificate);
      });
    });
  });
};

// Updates an existing certificate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Certificate.findById(req.params.id, function (err, certificate) {
    if (err) { return handleError(res, err); }
    if(!certificate) { return res.send(404); }
    var updated = _.merge(certificate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, certificate);
    });
  });
};

// Deletes a certificate from the DB.
exports.destroy = function(req, res) {
  Provider.findById(req.originalUrl.split('/')[3], function(err, provider) {
    console.log('providerId', JSON.stringify(req.url));
    console.log('provider', JSON.stringify(provider));
    if (err) {
      return handleError(res, err);
    }
    if (!provider) {
      return res.status(404).send('Provider not found');
    }
    Certificate.findById(req.params.id, function (err, certificate) {
      console.log('certificateId', JSON.stringify(req.url));
      console.log('certificate', JSON.stringify(certificate));
      if (err) {
        return handleError(res, err);
      }
      if (!certificate) {
        return res.send(404).end('Certificate not found');
      }
      certificate.remove(function (err) {
        if (err) {
          return handleError(res, err);
        }
        // Remove the certificate ID from provider.certificates
        provider.certificates = _.filter(provider.certificates, function(x) { return x != req.params.id });

        provider.save(function(err, saved) {
          if(err) return handleError(res, err);
          return res.status(204).end();
        })
      });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
