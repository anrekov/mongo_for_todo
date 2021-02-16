// const token = req.headers['Authorization']

// token.verify().then((userId) => {
//   const user = userId.findById(userId)

//   if (user) {
//     req.user = user
//     next()
//   } else {
//     res.json({ error: 'You are not sign in'})
//   }
// })

// // Найти пользователя по зашифрованному id и если он есть, то авторизация удалась, иначе - ошибка

// const jwt = require('jsonwebtoken');

// const token = jwt.sign({id: user.id}, 'secretKey', {expiresIn: '1h'})
// return res.json({
//   token,
//   user: {
//     id: user.id,
//     login: user.login
//   }
// })
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
    // const decodedData = jwt.verify(token, 'secretKey');
    // req.user = decodedData;
    // next();

    // jwt.verify(token, 'secretKey').then((userId) => {
    //   const user = User.findById(userId)
    //   if (user) {
    //     req.user = user
    //     next()
    //   } else {
    //     res.json({ error: 'You are not sign in'})
    //   }
    // })

    const decodedData = jwt.verify(token, 'secretKey');
    User.findById(decodedData.userId, (err, user) => {
      if (err) {
        return res.json({ error: 'You are not sign in' });
      }
      if (user) {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: 'Пользователь не авторизован!' });
  }
};
