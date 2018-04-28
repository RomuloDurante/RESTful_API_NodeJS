/* 
*Primary file for API
*
*
*/

//Dependencies
const http = require('http');


// The server should respond to all request with a string
const server = http.createServer(function(req, res) {
  res.end("Hello World!");
})

// Start server, and have it listen on port 3000
server.listen(3000, () => console.log("Server starts on port 3000 ..."));