// code away!
const express = require('express');
const server = require('express');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
 
server.listen(4000, () => {
    console.log('\n Server running on port http://localhost:4000 ***\n');
});