const http = require('http');
const app = require("./app")
const hostname = '127.0.0.1';
const port = 8080

var DataLayer = require("./companydata/index.js")
var dl = new DataLayer("ay6582")

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});