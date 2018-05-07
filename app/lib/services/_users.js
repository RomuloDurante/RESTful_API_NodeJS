/**
 * 
 *  Methods for handler with request and response
 */

 // -> Depedencies
 const helpers = require('../helpers'),
          _data = require('../data');


 // End Dependencies
 // Object method
  const _users = {
    // method POST
    // Required data: firstname, lastname, phone, password, toAsgreement (no optional data)
    post: (objUrl, callback)=>{
      // validathe the object and create body
      var body = helpers.validation(objUrl, 'post');
      
      // if body exists 
      if(body) {
        // create a new user if no exists in .data/users
         _data.create('users', body.phone, body, (err)=>{
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
  
    },

    // method GET
    // Require data phone
    // Optional data : none
    get: (objUrl, callback)=>{

      var phone = typeof(objUrl.queryString.phone) === 'string' && objUrl.queryString.phone.trim().length === 10 ?objUrl.queryString.phone.trim() : false ;

      if(phone) {
        // looked the user
        _data.read('users', phone, (err, data)=>{
          if(!err && data) {
            //parse the data
            data = helpers.parseJson(data);

            // remove the password
            delete data.password;

            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(400, {'Error':'phone does not exists'})
      }
    },

     // method PUT
     // Require data phone
     // Optional data: everything else (at least one must be specifeield)
     put: (objUrl, callback)=>{

       //parse body
       var body = helpers.parseJson(objUrl.body);
      // validate phone
       var phone = typeof(body.phone) === 'string' && body.phone.trim().length === 10 ? body.phone.trim() : false ;
      
       // validation for data update
       var dataToUpdate = helpers.validation(objUrl, 'put');

       if(phone) {
          if(dataToUpdate.firstName || dataToUpdate.lastName || dataToUpdate.password) {
            // Lookup the user
            _data.read('users', phone, (err, userData)=> {
             
              if(!err && userData){
              //parse the data
               var update = helpers.parseJson(userData);

               dataToUpdate.firstName ? update.firstName = dataToUpdate.firstName : '';
               dataToUpdate.lastName ? update.lastName = dataToUpdate.lastName : '';
               dataToUpdate.password ? update.password = helpers.hashPass(dataToUpdate.firstName): '';
             
              // store the data
              _data.update('users', phone, update, (err)=> {
                if(!err){
                  callback(200);
                }else {
                  callback(500, {"Error": 'Could not update the user'});
                }
              });
               

              }else {
               callback(400, {'Error': 'The especified users does not exists'}); 
              }
            });

          }else {
            callback(400, {'Error': 'Missing fields to update'});
          }
       } else {
         callback(400, {'Error' : 'Missing required fields'});
       }



    },

     // method DELETE
     // require field Phone
     delete: (objUrl, callback)=>{
      //check the phone number
      
      var phone = typeof(objUrl.queryString.phone) === 'string' && objUrl.queryString.phone.trim().length === 10 ?objUrl.queryString.phone.trim() : false ;

      if(phone) {
        // looked the user
        _data.read('users', phone, (err, data)=>{
          if(!err && data) {
              // delete
              _data.delete('users', phone, ()=> {
                if(!err){
                  callback(200); 
                }else {
                 callback(500, {'Error' : 'Could not delete the user'}); 
                }
              });
            
          } else {
            callback(400, {"Error": "Could not find the user"});
          }
        });
      } else {
        callback(400, {'Error':'phone does not exists'})
      }
    },

    // chosen the method
    startService: (objUrl, callback) => {
            // chosen the method
            var methods = ['post', 'get', 'put', 'delete'];
            if(methods.indexOf(objUrl.method) > -1) {
      
              //if get the method call the function
               _users[objUrl.method](objUrl, callback);
      
            } else {
              callback(405);
            }
    }
  }

  // Export methods

  module.exports = _users;