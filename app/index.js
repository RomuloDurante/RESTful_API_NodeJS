const server = require('./server/setServer'),
      config = require('./config'); // we need call because return a function

//start http server
server.http(config);

