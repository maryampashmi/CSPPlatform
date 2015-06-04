'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CertificatesSchema = new Schema({
  name:String,
  description:String,
  provider: {type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },//why i can not save this provider in mongodb?
  certControllers:[{type: mongoose.Schema.Types.ObjectId, ref: 'CertController' }]
});

module.exports = mongoose.model('Certificate', CertificatesSchema);
