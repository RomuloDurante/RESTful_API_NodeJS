/**
 * 
 *  Methods to check requests
 */

 const _checking = {
   
    //ping check the life of the server
    ping: (objUrl, callback) => {
      // Callback a http status code and payload
      callback(200, {"Ping": "Ok ->..."});
    },

    /*************************************** */
    
    // Not founder router
    notFound: (objUrl, callback) => {
      callback(404, {"Error": "Routine not found"});
    },

    /*************************************** */

    //chose router
    chooseRouter: (routers, objUrl) => {
      
      if(routers[objUrl.path]) {

        return routers[objUrl.path];

      } else{
        return _checking.notFound;
      }
    },
 }

 // exports
 module.exports = _checking;