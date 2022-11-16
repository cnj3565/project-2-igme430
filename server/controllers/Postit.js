const models = require('../models');
const PostitModel = require('../models/Postit');

const { Postit } = models;

const makerPage = (req, res) => res.render('app');

const makePostit = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const postitData = {
    title: req.body.title,
    content: req.body.content,
    author: req.session.account_id,
  };

  try {
    const newPostit = new Postit(postitData);
    await newPostit.save();
    return res.status(201).json({ title: newPostit.title, content: newPostit.content, author: newPostit.author });
  } catch (err) {
    console.log(err);
    // duplicate posts can be made, if desired
    return res.status(400).json({ error: 'An error occured' });
  }
};

// Make an option to see everyone's posts, or just your own. Depends on current page
const getPostitsSelf = (req, res) => PostitModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ postits: docs });
});

module.exports = {
  makerPage,
  makePostit,
  getPostitsSelf,
};
