/**
 * 
 *  Post method
 */

 // Dependencies
 
 const helpers = require('../../helpers'),
   _fileSystem = require('./fileSystem');

 // end dependencies

 const _post = (objUrl, callback)=>{
      // validathe the object and create body
      var body = helpers.validation(objUrl, 'post');
      
      // if body exists 
      if(body) {
        // create a new user if no exists in .data/users
        _fileSystem.create('users', body.phone, body, (err)=>{
          if(err) {
            console.log(err);
            // if user already exists send error
            callback(400, err);
          } else {
            console.log('User create');
            // if no erros send status 200 and body to setServer
            callback(200, body);
          }
        });

      } else {
        // if body return false
        callback(400,{'Error': 'missing requirements !'} );
      }
  
    };



 


 // Export post

 module.exports = _post;