const PORT = 3333;

const express = require('express');
const routes = require('./routes');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.listen(PORT, function () {
    console.log(`Server is running on localhost:${PORT}`);
});