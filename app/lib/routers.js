/**
 * Define object router requests
 */

 // -> Depedencies
    const  _users = require('./services/users/users'),
           _tokens = require('./services/token/tokens');
// End Dependencies

// Public Router requests
const routers = {
  // SERVICES

  // Users service
  users: _users.startService,

  // Tokens Service
  tokens: _tokens.startService,


  /*********************************************** */
  // COMMOM SERVICES

 //check status server
  ping: (objUrl, callback) => {
    // Callback a http status code and payload
    callback(200, {"Ping": "Ok ->..."});
  },

  // not found path
  notFound: (objUrl, callback) => {
    callback(404, {"Error": "Routine not found"});
  },

  //choose router
  choose: (objUrl) => {
      
      if(routers[objUrl.path] && objUrl.path !== 'choose') {

        return routers[objUrl.path];

      } else{
        return routers.notFound;
      }
    }

}

// Export routers
module.exports = routers;