const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();

// let corsOptions = {
//   allowedHeaders: ['apikey', 'Content-Type', 'accept'],
//   exposedHeaders: ['apikey'],
//   origin: 'http://localhost:8081',
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// также можно будет вывеcти мой туду, собрав его в один файл (webpack)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to this application.' });
});

require('./app/routes/todo.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });