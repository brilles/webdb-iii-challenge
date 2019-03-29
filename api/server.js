const express = require('express');
const helmet = require('helmet');

//cohorts and students
const cohortsRouter = require('./cohorts/cohorts.js');
const studentsRouter = require('./students/students.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>sanity</h1>');
});

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;
