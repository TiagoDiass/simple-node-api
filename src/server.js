const PORT = process.env.PORT || 3333;

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(PORT, function () {
  console.log(`Server is running on localhost:${PORT}`);
});
