'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CertSubClausesSchema = new Schema({
  name:String,
  //parent:Array,
  description:String,
  certController: { type: mongoose.Schema.Types.ObjectId, ref: 'CertController'}
});

module.exports = mongoose.model('CertSubController', CertSubClausesSchema);
