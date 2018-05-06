/**
 * Define object router requests
 * obs-> Way to organize the handlers
 */

 // -> Depedencies
const handler = require('./handlers');
// End Dependencies

// Public Router requests
const routers = {
  ping: handler.ping,
  users: handler.users,
  notFound: handler.notFound,
}

// Export routers
module.exports = routers;