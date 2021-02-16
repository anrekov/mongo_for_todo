const db = require('../models');
// const Todo = db.todos;
const User = db.users;

// Create and Save a new Todo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const name = req.user.username;

  User.updateOne(
    { username: name },
    { $push: { todos: [{ title: req.body.title }] } }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with name=${name}`,
        });
      } else res.send({ message: 'User was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with name=' + name,
      });
    });
};

// Get all Todos from the database.
exports.findAll = (req, res) => {
  res.send(req.user.todos);
};

// Update a Todo title by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  // todo id
  const id = req.params.id;
  // local update
  let arr = req.user.todos;
  arr.forEach((todo) => {
    if (todo._id == id) {
      todo.title = req.body.title;
    }
  });

  // update whole todos
  User.updateOne({ username: req.user.username }, { todos: arr })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: 'Todo was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};

// put Done
exports.updateDone = (req, res) => {
  // todo id
  const id = req.params.id;
  // local update
  let arr = req.user.todos;
  arr.forEach((todo) => {
    if (todo._id == id) {
      todo.isDone = !todo.isDone;
    }
  });

  // update whole todos
  User.updateOne({ username: req.user.username }, { todos: arr })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: 'Todo was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};

// Delete all DONE todos from the database.
exports.deleteDone = (req, res) => {
  // local update
  let arr = req.user.todos;
  arr = arr.filter((todo) => todo.isDone === false);

  // update whole todos
  User.updateOne({ username: req.user.username }, { todos: arr })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: 'Todo(s) was deleted successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
  // todo id
  const id = req.params.id;
  // local update
  let arr = req.user.todos;
  arr = arr.filter((todo) => todo._id != id);

  // update whole todos
  User.updateOne({ username: req.user.username }, { todos: arr })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: 'Todo was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};
