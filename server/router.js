const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getPostits', mid.requiresLogin, controllers.Postit.getPostitsSelf);
  app.get('/getPostitsAll', mid.requiresLogin, controllers.Postit.getPostitsAll);
  app.get('/getAccount', mid.requiresSecure, controllers.Account.getAccount);

  app.get('/premium', mid.requiresSecure, mid.requiresLogin, controllers.Account.premiumPage);
  app.post('/premium', mid.requiresLogin, controllers.Account.premiumToggle);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/settings', mid.requiresSecure, mid.requiresLogin, controllers.Account.settingsPage);
  app.post('/pwChange', mid.requiresLogin, controllers.Account.changePassword);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/dashboard', mid.requiresLogin, controllers.Postit.dashboardPage);
  app.get('/maker', mid.requiresLogin, controllers.Postit.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Postit.makePostit);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
