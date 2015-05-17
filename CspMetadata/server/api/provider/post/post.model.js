'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  body: String,
  upvotes: {type: Number, default:0},
  author: String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb, function(error) {
    if(error){
      console.error("Error saving object: ", error)
    }
  });
};

module.exports = mongoose.model('Post', PostSchema);
