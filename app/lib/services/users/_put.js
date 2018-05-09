/**
 * 
 * 
 */
 // -> Depedencies
 const helpers = require('../../helpers'),
          _data = require('../data');


 // End Dependencies

 const put = (objUrl, callback)=>{

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
             callback(200, {OK : 'User was update'});
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

}

module.exports = put;