'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: String,
     body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    replies:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb, function(error) {
    if(error){
      console.error("Error saving object: ", error)
    }
  });
};
module.exports = mongoose.model('Comment', CommentSchema);
