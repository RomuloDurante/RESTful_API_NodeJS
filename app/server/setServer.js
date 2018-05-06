/**
 *  Configure the http and https server
 */

// -> Depedencies
const $stringDecoder = require('string_decoder').StringDecoder,
            handler = require('../lib/handlers');
            router = require('../lib/routers');

// End Dependencies

// config and configServers
const setServer= (req, res) => {
    //create decoder
    var decoder = new $stringDecoder('utf-8');
    var buffer = '';
    
    //request data for buffer and decoder it
    req.on('data', (data) => {
      
       buffer += decoder.write(data)
      
      });

    //end decoder
    req.on('end', () => {
          buffer += decoder.end();

          // get the obj url 
          var objUrl = handler.url(req, buffer);

          //choose the router( if router do not exists use default)
          var chosenRouter = handler.chosenHandler(handler, objUrl);
          
          //call the choosed handler
          chosenRouter(objUrl, (statusCode, body)=> {

            // use the status code back by handler, or default 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            //check of body exists
            body = typeof(body) === 'object' ? body : {};

            //convert the paylod to a string
            var body = JSON.stringify(body);

            //send the response
            res.setHeader('Content-Type', 'application/json')//response Json format
            res.writeHead(statusCode);
            res.end(body);
            console.log(statusCode, body);
      });
    });
}

// exports 
module.exports = setServer;
