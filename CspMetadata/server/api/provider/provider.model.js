'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProviderSchema = new Schema({
  name: String,
  abbreviated: String,
  services: Array,
  locations: Array,
  description: String,
  url: String,
  author: String,
  upvotes: { type:Number, default:0 },
  createdOn: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

ProviderSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb, function(error) {
    if(error){
      console.error("Error saving object: ", error)
    }
  });
};

module.exports = mongoose.model('Provider', ProviderSchema);
