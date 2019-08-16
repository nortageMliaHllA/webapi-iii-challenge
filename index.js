// code away!
const express = require('express');
const server = express();

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const serverRouter = require('./server');

server.use(express.json());
server.use('/', serverRouter);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`)
  });
 
server.listen(4000, () => {
    console.log('\n Server running on port http://localhost:4000 ***\n');
});