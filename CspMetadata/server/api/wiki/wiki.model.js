'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WikiSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Wiki', WikiSchema);