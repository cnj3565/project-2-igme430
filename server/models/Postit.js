const mongoose = require('mongoose');
const _ = require('underscore');

let PostitModel = {};

const setName = (name) => _.escape(name).trim();

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
});

PostitSchema.statics.toAPI = (authorId, callback) => {
  const search = {
    // Convert the string authorId to object id
    author: mongoose.Types.ObjectId(authorId),
  };

  return PostitModel.find(search).select('title content').lean().exec(callback);
};

PostitModel = mongoose.model('Postit', PostitSchema);

module.exports = PostitModel;