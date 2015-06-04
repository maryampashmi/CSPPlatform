//var _ = require('lodash');
var Certificate = require('./api/provider/certificates/certificates.model.js');
var CertController= require('./api/provider/certificates/certClauses/certClauses.model.js');



  CertController.find({}, function(error, data) {
    console.log('DATAAAAAAAAAAAAA',data);
    res.json(data)
  })


  /*Certificate.findById(req.originalUrl.split('/')[5], function (err, certificate) { //here can not find certificate at all.
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
  });*/
