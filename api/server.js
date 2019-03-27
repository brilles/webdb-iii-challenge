const express = require('express');
const helmet = require('helmet');

//cohorts and students
const cohortsRouter = require('./cohorts/cohorts.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>sanity</h1>');
});

server.use('/api/cohorts', cohortsRouter);

module.exports = server;
