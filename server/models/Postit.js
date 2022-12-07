const mongoose = require('mongoose');
const _ = require('underscore');

let PostitModel = {};

const setName = (name) => _.escape(name).trim();

// edit author to contain username string, then add a second 'owner' or 'op' value for internal ID
const PostitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  author: {
    type: String,
    required: true,
    trim: false,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PostitSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  content: doc.content,
  author: doc.author,
  owner: doc.owner,
});

PostitSchema.statics.findByOwner = (authorId, callback) => {
  const search = {
    // Convert the string authorId to object id
    owner: mongoose.Types.ObjectId(authorId),
  };

  return PostitModel.find(search).select('title content author').lean().exec(callback);
};

PostitSchema.statics.findAll = (callback) => PostitModel.find().select('title content author').lean().exec(callback);

PostitModel = mongoose.model('Postit', PostitSchema);

module.exports = PostitModel;
