'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PrivacySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Privacy', PrivacySchema);