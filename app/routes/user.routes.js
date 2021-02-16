module.exports = (app) => {
  const users = require('../controllers/user.controller.js');
  const userMiddleware = require('../middleware/detectUser')

  let router = require('express').Router();

  // Create a new User
  router.post('/', users.create);
  // Get all users
  router.get('/', users.findAll);

  router.post('/login', users.login)

  router.get('/info', userMiddleware, users.getInfo)
  router.put('/edit', userMiddleware, users.editInfo)



  app.use('/api/users', router);
};