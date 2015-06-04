'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CertClausesSchema = new Schema({
  name:String,
  parent:Array,
  description:String,
  certificate: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
  certSubControllers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'CertSubController' }]
});

module.exports = mongoose.model('CertController', CertClausesSchema);
