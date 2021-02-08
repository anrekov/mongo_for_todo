module.exports = (app) => {
  const todos = require('../controllers/todo.controller.js');

  let router = require('express').Router();

  // Create a new Todo
  router.post('/', todos.create);

  // Get all Todos
  router.get('/', todos.findAll);

  // Update a Todo with id
  router.put('/:id/title', todos.update);

  // set Done on Todo with id
  router.put('/:id/done', todos.updateDone);

  // Delete all done - its must be a first one before the same with /:id
  router.delete('/clear-done', todos.deleteDone);

  // Delete a Todo with id
  router.delete('/:id', todos.delete);

  app.use('/api/todos', router);
};