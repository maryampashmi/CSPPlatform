'use strict';

var _ = require('lodash');
var q = require('q');
var Dependencies = require('./dependencies.model');
var Provider = require('../provider/provider.model');
var Certificate = require('../provider/certificates/certificates.model.js');
var CertController= require('../provider/certificates/certClauses/certClauses.model.js');
var CertSubController = require('../provider/certificates/certClauses/certSubClauses/CertSubClauses.model.js');

// Get list of dependenciess
/*exports.index = function(req, res) {
 Dependencies.find(function (err, dependenciess) {
 if(err) { return handleError(res, err); }
 return res.json(200, dependenciess);
 });
 };*/

// Get a single dependencies
exports.index = function(req, res) {
  var output = [];
  Certificate.find({}).populate('certControllers').exec(function (err, certificates) {
    var promise = Certificate.populate(certificates,{path: 'certControllers.certSubControllers', model: 'CertSubController'});
    promise.then(function(data){
        //res.json(processJSON(certificates,res))
        processJSON(certificates,res)
      }
    ).end();
  });
}
function processJSON(certificates,res) {
  var output = []
  Provider.find({}).exec(function (err, providers) {
  certificates.forEach(function (certificate, indx) {
    var cert = {};
    cert.name = certificate.name;
    cert.id = certificate["_id"];
    cert.certControllers = new Array;
    certificates[indx].certControllers.forEach(function (certController, index) {
      var ctrlr = {};
      ctrlr.name = certController.name;
      ctrlr.id = certController["_id"];
      ctrlr.description = certController.description;
     // ctrlr.certSubControllers = certController.certSubControllers;
      ctrlr.certSubControllers = []
      certController.certSubControllers.forEach(function(certSubCtrl){

        var certSubCtrlTmp = JSON.parse(JSON.stringify(certSubCtrl))

        //var certSubCtrlTmp = certSubCtrl
       var x = populateProvider(certSubCtrlTmp,providers)
        ctrlr.certSubControllers.push(x)
      })
      cert.certControllers.push(ctrlr);
    })
    output.push(cert);
  })
    res.json(output)
   // return output;
})

  //populateProvider(res,output)
};
function populateProvider(certSubCtrl,providers){
  var providersTmp = []
  providers.forEach(function (provider) {

    var providerTmp = {};
    providerTmp.name = provider.name
    providerTmp.id = provider._id

    provider.CertSubControllers.forEach(function (certSubController) {
      if (certSubController.toString() == certSubCtrl._id.toString()) {
        providersTmp.push(providerTmp)
      }
    })
  })
  certSubCtrl.providers = providersTmp

  return certSubCtrl
}


// Creates a new dependencies in the DB.
exports.create = function(req, res) {
  Dependencies.create(req.body, function(err, dependencies) {
    if(err) { return handleError(res, err); }
    return res.json(201, dependencies);
  });
};


// Updates an existing dependencies in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dependencies.findById(req.params.id, function (err, dependencies) {
    if (err) { return handleError(res, err); }
    if(!dependencies) { return res.send(404); }
    var updated = _.merge(dependencies, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dependencies);
    });
  });
};

// Deletes a dependencies from the DB.
exports.destroy = function(req, res) {
  Dependencies.findById(req.params.id, function (err, dependencies) {
    if(err) { return handleError(res, err); }
    if(!dependencies) { return res.send(404); }
    dependencies.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
