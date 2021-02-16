module.exports = (mongoose) => {
  const Todo = mongoose.model(
    'todo',
    mongoose.Schema(
      {
        title: String,
        isDone: { type: Boolean, default: false },
        // user: { type: String, ref: 'User' }
      },
      { timestamps: true }
    )
  );

  return Todo;
};