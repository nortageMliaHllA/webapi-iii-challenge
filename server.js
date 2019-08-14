const express = 'express';
const postRouter = require('./posts/postRouter.js');

const server = express();

const bodyParser = express.json();


server.use(bodyParser);
server.use('/api/post', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
