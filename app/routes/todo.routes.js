module.exports = (app) => {
  const todos = require('../controllers/todo.controller.js');
  const userMiddleware = require('../middleware/detectUser')

  let router = require('express').Router();

  // Create a new Todo
  router.put('/', userMiddleware, todos.create);

  // Get all Todos
  router.get('/', userMiddleware, todos.findAll);

  // Update a Todo with id
  router.put('/:id/title', userMiddleware, todos.update);

  // set Done on Todo with id
  router.put('/:id/done', userMiddleware, todos.updateDone);

  // Delete all done - it is must be a first one before the same with /:id
  router.delete('/clear-done', userMiddleware, todos.deleteDone);

  // Delete a Todo with id
  router.delete('/:id', userMiddleware, todos.delete);

  app.use('/api/todos', router);
};