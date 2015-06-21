'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//rating parameter will be used for getting the parameter like
//rating for cost rating for unfriendliness rating for performance etc
var RatingSchema = new Schema({
  author: String,
  rating : { type: Number, min: 1, max: 5 },
  parameter : String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
});

module.exports = mongoose.model('Rating', RatingSchema);
