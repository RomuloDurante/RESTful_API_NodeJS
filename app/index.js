/* 
*Primary file for API
*
*
*/

//Dependencies
const http = require('http');
const url = require('url');


// The server should respond to all request with a string
const server = http.createServer(function(req, res) {

  //Get the url and Parse it
  var parsedUrl = url.parse(req.url, true);

  //Get the Path 
  var path = parsedUrl.pathname;
  var trimedParse = path.replace(/^\/+|\/+$/g,'');

  //Send the response
  res.end("Hello World!");

  //Log the request path
  console.log('Request received on path: ' + trimedParse);
 
})

// Start server, and have it listen on port 3000
server.listen(3000, () => console.log("Server starts on port 3000 ..."));