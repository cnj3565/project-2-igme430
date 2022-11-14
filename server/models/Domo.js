const mongoose = require('mongoose');
const _ = require('underscore');

let DomoModel = {};

const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    require: true,
  },
  favFood: {
    type: String,
    trim: true,
    set: setName,
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

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  favFood: doc.favFood,
});

DomoSchema.statics.toAPI = (ownerId, callback) => {
  const search = {
    // Convert the string ownerId to object id
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return DomoModel.find(search).select('name age').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports = DomoModel;
