const db = require('../models');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.users;

const generateAccessToken = (userId, username) => {
  const payload = { userId, username };
  return jwt.sign(payload, 'secretKey', { expiresIn: 60 * 60 }); // '1h'
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: 'Username can not be empty!' });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({ message: 'Password can not be empty!' });
    return;
  }

  // const hashPassword = bcrypt.hashSync(req.body.password, 7);

  // Create User
  const user = new User({
    username: req.body.username,
    password: req.body.password, // password: hashPassword,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Todo.',
        err
      });
    });
};

// Get all users from the db.
exports.findAll = (req, res) => {
  const name = req.query.username;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      });
    });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      if (password !== user.password) {
        return res.status(400).json({ message: 'Введен неверный пароль' });
      }
      const token = generateAccessToken(user._id, user.username);
      return res.json({ token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: 'Login error' });
    });
};

exports.getInfo = (req, res) => {
  const info = {
    username: req.user.username,
    password: req.user.password,
    name: req.user.name,
    email: req.user.email,
    age: req.user.age,
  };
  res.send(info);
};

exports.editInfo = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const info = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };

  User.updateOne(
    { username: req.user.username },
    {
      username: info['username'],
      password: info['password'],
      name: info['name'],
      email: info['email'],
      age: info['age'],
    }
  )
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
