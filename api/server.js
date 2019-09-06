const express = require('express');
const helmet = require('helmet');

const secrets = require('../config/secrets.js');

console.log('environment:', secrets.environment);
// should log "environment development" to the console

const projectRouter = require('./projectRouter.js');

const actionRouter = require('./actionRouter.js');

const server = express();

server.use(helmet());

server.use('/api', projectRouter);

server.use('/api', actionRouter);

// GET /api
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
  });
  

module.exports = server;
