/**
 *  Handlers for manipulate 
 */

// -> Depedencies
const $url = require('url'),
      _users = require('./methods/_users');
  

//End Dependencies

/******************************************************************* */

// Handler
const handlers = {
  //handler url and payload(buffer/body)
  url: (req, buffer) => {
    //Parse the url
    function parsedUrl(req) {
      return $url.parse(req.url, true);
    }
    var parsedUrl = parsedUrl(req);

    //Create the url Object
    return {
      //Get the Path and trimmed it with replace
      path: parsedUrl.pathname.replace(/^\/+|\/+$/g, ''),

      //Get the HTTP method
      method: req.method.toLowerCase(),

      //Get the queryString Object
      queryString: parsedUrl.query,

      //Get the Headers Object
      headers: req.headers,

      // Get the body
      body: buffer      
    }
  },

  //ping handler
  ping: (objUrl, callback) => {
    // Callback a http status code and payload
    callback(200);
  },

  // Not founder handler
  notFound: (objUrl, callback) => {
    callback(404);
  },

  //chose handler
  chosenHandler: (handler, objUrl) => {
    //return the sample handler with callback
    if(handler[objUrl.path]) {

      return handler[objUrl.path];

    } else{
      return handler.notFound;
    }
  },

  // Users
  users: (objUrl, callback)=> {
      // chosen the method
      var methods = ['post', 'get', 'put', 'delete'];
      if(methods.indexOf(objUrl.method) > -1) {

        //if get the method call the function
         _users[objUrl.method](objUrl, callback);

      } else {
        callback(405);
      }
  },

} //->End Handlers

// Export handlers
module.exports = handlers;