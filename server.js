const express = require('express');

const server = require('express').Router();


server.use(express.json());
server.use(logger);




//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  console.log(`${method} Request to ${url} [${new Date().toISOString()}]`);
  next();
};

module.exports = server;
