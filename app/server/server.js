/**
 * Configure the server
 */

  // -> Depedencies
  const $http = require('http'),
        $https = require('https'),
        configServers = require('./configServers'),
        httpsServerOptions = require('./https/httpsServerOptions');
  //End Dependencies

  // ->Server Config
  const server = {
    //config HTTP server
    http: (config) => {
      return $http.createServer((req, res) => {

        //config HTTP server
        configServers(req, res);
        
      }
      ).listen(config.httpPORT, () => console.log('HTTP Server Start in ['+config.envName+']-mode : PORT-> '+ config.httpPORT));
    },

    //config HTTPS server
    https: (config) => {
      return $https.createServer( httpsServerOptions, (req, res) => {

        //configServers
        configServers(req, res);
        
      }
      ).listen(config.httpsPORT, () => console.log('HTTPS Server Start in ['+config.envName+']-mode : PORT-> '+ config.httpsPORT));
    },
  }

//Export server
module.exports = server;

