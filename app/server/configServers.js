/**
 *  Configure the http and https server
 */

// -> Depedencies
const $stringDecoder = require('string_decoder').StringDecoder,
            router = require('./routers');

// End Dependencies

// config and configServers
const configServers= (req, res) => {
    //create decoder
    var decoder = new $stringDecoder('utf-8');
    var buffer = '';
    
    //requst data for buffer
    req.on('data', (data) => { buffer += decoder.write(data) });

    //end decoder
    req.on('end', () => {
      buffer += decoder.end();

      // get the obj url 
      var objUrl = router.url(req, buffer);
      
      //choose the router( if router do not exists use default)
      var chosenRouter = router.chosenHandler(handler, objUrl);
      
      //call the choosed handler
      chosenRouter(objUrl, (statusCode, payload)=> {
        // use the status code back by handler, or default 200
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

        //use the payload back by handler or default empty object
        payload = typeof(payload) === 'object' ? payload : {};

        //convert the paylod to a string
        var payloadString = JSON.stringify(payload);

        //send the response
        res.setHeader('Content-Type', 'application/json')//response Json format
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log(statusCode, payloadString);
      });
    });
}

// exports Payload
module.exports = configServers;
