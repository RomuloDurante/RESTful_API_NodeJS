/**
 * Define object router requests
 */

 // -> Depedencies
    const  _checking = require('./services/_checking'),
           _users = require('./services/_users'),
           _tokens = require('./services/_tokens');
// End Dependencies

// Public Router requests
const routers = {
  users: _users.startService,
  ping: _checking.ping,
  notFound: _checking.notFound,
  token: _tokens
}

// Export routers
module.exports = routers;