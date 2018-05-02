/**
 *  Handlers for manipulate url and request path
 */

// -> Depedencies
const $url = require('url');

// End Dependencies

// Handler
const handler = {
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

  //sample handler
  sample: (data, callback) => {
    // Callback a http status code and payload
    callback(406, { "name": "Romulo" });
  },

  // Not founder handler
  notFound: (data, callback) => {
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


} //->End Handlers

// Export handlers
module.exports = handler;