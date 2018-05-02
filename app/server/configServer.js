/**
 * Configure the server
 */

  // -> Depedencies
  const $http = require('http'),
    $stringDecoder = require('string_decoder').StringDecoder,
    Routing = require('./routing');
  //End Dependencies

  // ->Server Config
  const server = {
    //config http server
    http: (PORT) => {
      return $http.createServer((req, res) => {

        //Routing and get the payload
        Routing(req, res);
      }
      ).listen(PORT, () => console.log('Server Start PORT->'+ PORT));
    }
  }

//Export server
module.exports = server;