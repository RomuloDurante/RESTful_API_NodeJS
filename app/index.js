const server = require('./server/server'),
      config = require('./server/configApp'); // we need call because return a function

// Start HTTP server
server.http(config);

// Start HTTPS server
server.https(config);

