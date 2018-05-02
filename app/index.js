 /**
  *  Start the servers
  */
 // -> Depedencies
 
 const server = require('./server/server'),
 config = require('./lib/configApp'); 
 // End Dependencies


// Start HTTP server
server.http(config);

// Start HTTPS server
server.https(config);

