'use strict'
/* 
*Primary file for API
*
*
*/

//Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');


// Instantiate HTTP server
const httpServer = http.createServer(function(req, res) {
    unifieldServer(req, res); 
});
// Start the HTTP server
httpServer.listen(config.httpPORT, () => console.log("Server starts on port -> " + config.httpPORT + " in [" + config.envName +"] mode."));

//Instatiate HTTPS server
const httpsServerOptions = {
  key: fs.readFileSync('./app/https/key.pem'),
  cert: fs.readFileSync('./app/https/cert.pem')
}
const httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  unifieldServer(req, res); 
});

// Start the HTTPS server
httpsServer.listen(config.httpsPORT, () => console.log("Server starts on port -> " + config.httpsPORT + " in [" + config.envName +"] mode."));

//all the server logic http and https
var unifieldServer = function(req, res) {
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
  
      //Get the payload, if any (the body text)
        var decoder = new stringDecoder('utf-8');
        var buffer = ''; // we can use var named body
  
        req.on('data', function(data) { // data parameter is the chunk 
          buffer += decoder.write(data);
        });
  
        req.on('end', function() {
          buffer += decoder.end();
          
          //choose the handler this request got to
          var chosenHandler = typeof(router[trimedParse]) !== 'undefined' ? router[trimedParse] : handlers.notFound;
  
          //construct the data object to send the handler
          const data = {
            'trimedParse' : trimedParse,
            'queryStringObject ': queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
  
          }
          console.log(data); //test
  
          // router the request to the handler specified in the router
          chosenHandler(data, function(statusCode,payload){
  
              // Use the status code returned from the handler, or set the default status code to 200
              statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
  
              // Use the payload returned from the handler, or set the default payload to an empty object
              payload = typeof(payload) === 'object'? payload : {};
  
              // Convert the payload to a string
              var payloadString = JSON.stringify(payload);
  
              // Return the response
              res.setHeader('Content-Type', 'aplication/json');
              res.writeHead(statusCode);
              res.end(payloadString);
              console.log("Returning this response: ",statusCode,payloadString);
  
       });
   });
};
/****************************************************************************** */

// define the handlers
const handlers = {};
  //sample.handlers
  handlers.sample = function(data, callback){
    //callback http status, and pauload object

    callback(406, {'name': 'sample handler'});
  }
  //not found handlers
  handlers.notFound = function(data, callback) {
    callback(404);
  }


//define a request router
var router = {
  'sample': handlers.sample
}