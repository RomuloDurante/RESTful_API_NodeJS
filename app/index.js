 /**
  *  Start the servers
  */
 // -> Depedencies
 
 const createServer = require('./server/createServer'),
 config = require('./lib/config'); 
 // End Dependencies


// Start HTTP server
createServer.http(config);

// Start HTTPS server
createServer.https(config);

