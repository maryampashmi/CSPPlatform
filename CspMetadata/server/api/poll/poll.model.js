'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  answer: String,
  type: Array ,/*type is include legal,security,.. */
  Author:String
});

module.exports = mongoose.model('Poll', PollSchema);
