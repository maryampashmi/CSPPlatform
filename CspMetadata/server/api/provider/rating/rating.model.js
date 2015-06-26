'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//rating parameter will be used for getting the parameter like
//rating for cost rating for unfriendliness rating for performance etc
var RatingSchema = new Schema({
  author: String,
 /* overalProviderRating: Number,
  overalCriteriaRating:Number,*/  /*move it to provider and criteria part*/
  rating : { type: Number, min: 1, max: 5 },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  criteria:{type: mongoose.Schema.Types.ObjectId, ref: 'Post'} //post is criteria
});

module.exports = mongoose.model('Rating', RatingSchema);
