const models = require('../models');

const { Account } = models;

const premiumPage = (req, res) => {
  res.render('premium', { csrfToken: req.csrfToken() });
};

const premiumToggle = async (req, res) => {
  const premiumBool = `${req.body.premiumBool}`;
  req.session.account.premium = premiumBool;

  return Account.changePremium(req.session.account.username, premiumBool, (err) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured.' });
    }

    return res.json({ redirect: '/maker' });
  });
};

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ errpr: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;
  const premium = false;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);

    const newAccount = new Account({ username, password: hash, premium });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(400).json({ error: 'An error occured.' });
  }
};

const settingsPage = (req, res) => {
  res.render('settings', { csrfToken: req.csrfToken() });
};

const changePassword = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!username || !pass || !newPass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if(pass === newPass) {
    return res.status(400).json({ error: 'New password is the same as the old password!' });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  const hashPass = await Account.generateHash(newPass);

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Original password is incorrect!' });
    }
    
    return Account.passwordChanger(req.session.account.username, hashPass, (err) => {
      if (err) {
        return res.status(400).json({ error: 'An error occured.' });
      }
  
      return res.status(200).json({ error: 'Passwords successfully changed!' });
    });
  });
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

const getAccount = (req, res) => res.json({ account: req.session.account });

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  getToken,
  getAccount,
  premiumPage,
  premiumToggle,
  changePassword,
  settingsPage,
};
