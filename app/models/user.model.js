module.exports = (mongoose) => {
  const User = mongoose.model(
    'user',
    mongoose.Schema({
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      name: {type: String, default: 'Guest'},
      email: {type: String, default: ''},
      age: {type: String, default: ''},
      todos: [
        {
          title: { type: String, required: true },
          isDone: { type: Boolean, default: false },
        },
      ],
    })
  );

  return User;
};
