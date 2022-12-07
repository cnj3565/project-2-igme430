const models = require('../models');
const PostitModel = require('../models/Postit');

const { Postit } = models;

const makerPage = (req, res) => {
  Postit.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occured! ' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), postits: docs });
  });
};

const dashboardPage = (req, res) => {
  Postit.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occured! ' });
    }
    return res.render('userfeed', { csrfToken: req.csrfToken(), postits: docs });
  });
};

const makePostit = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const postitData = {
    title: req.body.title,
    content: req.body.content,
    author: req.session.account.username,
    owner: req.session.account._id,
  };

  try {
    const newPostit = new Postit(postitData);
    await newPostit.save();
    return res.status(201).json({
      title: newPostit.title,
      content: newPostit.content,
      author: newPostit.author,
      owner: newPostit.owner,
    });
  } catch (err) {
    console.log(err);
    // duplicate posts can be made, if desired
    return res.status(400).json({ error: 'An error occured' });
  }
};

// gets user's own posts
const getPostitsSelf = (req, res) => {
  PostitModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured! ' });
    }
    return res.json({ postits: docs });
  });
};

// gets posts from entire database rather than from single user
const getPostitsAll = (req, res) => {
  PostitModel.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured! ' });
    }

    // remakes the Postit array in reverse chronological order
    // which better suits a social media site
    const revChron = [];
    for (let i = docs.length - 1; i >= 0; i--) {
      revChron.push(docs[i]);
    }

    return res.json({ postits: revChron });
  });
};

module.exports = {
  makerPage,
  dashboardPage,
  makePostit,
  getPostitsSelf,
  getPostitsAll,
};
