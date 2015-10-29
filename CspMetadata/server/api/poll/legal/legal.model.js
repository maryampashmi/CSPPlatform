'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LegalSchema = new Schema({
  id: String,
  author: String,
  answer : { type: Number, min: 0, max: 2 },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }
});

module.exports = mongoose.model('Legal', LegalSchema);
