/**
 *  Payload for resquest and response 
 */

// -> Depedencies
const $stringDecoder = require('string_decoder').StringDecoder,
             handler = require('./handler');


// End Dependencies

// Payload
const Routing = (req, res) => {
    //create decoder
    var decoder = new $stringDecoder('utf-8');
    var buffer = '';
    
    //requst data for buffer
    req.on('data', (data) => { buffer += decoder.write(data) });

    //end decoder
    req.on('end', () => {
      buffer += decoder.end();

      // get the obj url 
      var objUrl = handler.url(req, buffer);
      
      //choose the handler( if handler do not exists use default)
      var chosenHandler = handler.chosenHandler(handler, objUrl);
      
      //call the choosed handler
      chosenHandler(objUrl, (statusCode, payload)=> {
        // use the status code back by handler, or default 200
        statusCode = typeof(statusCode === 'number') ? statusCode : 200;

        //use the payload back by handler or default empty object
        payload = typeof(payload === 'object') ? payload : {};

        //convert the paylod to a string
        var payloadString = JSON.stringify(payload);

        //send the response
        res.writeHead(statusCode);
        res.end('hello world');
        console.log(statusCode, payloadString);
      });
    });
}

// exports Payload
module.exports = Routing;
