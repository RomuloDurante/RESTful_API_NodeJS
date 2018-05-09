/**
 * Users for organize the methods
 * 
 */


 const users = {
     post: require('./_post'),

     get: require('./_get'),

     put: require('./_put'),

     delete: require('./_delete'),

    // chosen the method
    startService: (objUrl, callback) => {
      // chosen the method
      var methods = ['post', 'get', 'put', 'delete'];
      if(methods.indexOf(objUrl.method) > -1) {

        //if get the method call the function
         users[objUrl.method](objUrl, callback);

      } else {
        callback(405);
      }

      console.log(objUrl);
    } 

 }

 module.exports = users;