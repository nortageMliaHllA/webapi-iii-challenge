const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter.js');

const server = express();

const bodyParser = express.json();


server.use(bodyParser);

server.use(helmet());
server.use(logger);

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toLocaleTimeString()
  const date = new Time().toLocaleTimeString()
  console.log(`${req.method} Request| http://localhost:4000${req.url} | ${date}, ${time}`);
  next();
};

module.exports = server;
