/**
 * Define object router requests
 * obs-> Way to organize the handlers
 */

 // -> Depedencies
const handler = require('./handler');


// End Dependencies

// Router requests
const routers = {
  url: handler.url,
  ping: handler.ping,
  chosenHandler: handler.chosenHandler

}

// Export routers
module.exports = routers;