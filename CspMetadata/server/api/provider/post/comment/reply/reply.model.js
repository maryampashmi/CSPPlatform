'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReplySchema = new Schema({

  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  upvoteUser:{type : Array, default:[]},
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
});

ReplySchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb, function(error) {
    if(error){
      console.error("Error saving object: ", error)
    }
  });
};


module.exports = mongoose.model('Reply', ReplySchema);
