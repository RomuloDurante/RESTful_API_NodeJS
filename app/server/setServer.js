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
    http: (config) => {
      return $http.createServer((req, res) => {

        //Routing and get the payload
        Routing(req, res);
      }
      ).listen(config.PORT, () => console.log('Server Start in ['+config.envName+']-mode : PORT-> '+ config.PORT));
    }
  }

//Export server
module.exports = server;

// , () => console.log('Server Start in ['+config.envName+'] : PORT-> '+ config.PORT)