'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProviderSchema = new Schema({
  name: String,
  abbreviated: String,
 // company:String,
  services: {type : Array, default:[]},
  locations: {type : Array, default:[]},
  description: String,
  url: String,
  author: String,
  upvotes: { type:Number, default:0 },
  upvoteUser:{type : Array, default:[]},
  createdOn: { type: Date, default: Date.now },
  //certificates:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificates' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  CertSubControllers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'CertSubController'}],
});

ProviderSchema.methods.findByName = function (cb) {
  return this.model('Provider').find({ name: this.name }, cb);
}
ProviderSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb, function(error) {
    if(error){
      console.error("Error saving object: ", error)
    }
  });
};

module.exports = mongoose.model('Provider', ProviderSchema);
