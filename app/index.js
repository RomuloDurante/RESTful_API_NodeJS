'use strict'
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
  var parsedUrl = url.parse(req.url, true);//the second argument is for analyze query string

  //Get the Path 
  var path = parsedUrl.pathname;
  var trimedParse = path.replace(/^\/+|\/+$/g,'');  //apara a url

  //Ge the query String as an object
  var queryStringObject = parsedUrl.query;


  //Get the HTTP method
  var method = req.method.toLowerCase(); // we need the string to lowercase

  //Get the Headers as the object
  var headers = req.headers;

  //Send the response
  res.end("Hello World!");

  //Log the request path
  console.log('Request received on Path-> '
  + trimedParse + '\n Method-> '+ method +
   '\n QueryString->',queryStringObject, 
  '\n Headers->',headers);
 
});

// Start server, and have it listen on port 3000
server.listen(5000, () => console.log("Server starts on port 5000 ..."));