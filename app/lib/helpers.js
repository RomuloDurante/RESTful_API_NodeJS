/**
 * Methods for varios tasks
 * 
 */

 // -> Depedencies
 const crypto = require('crypto'),
      config = require('./config');


 // End Dependencies
 
 // container for all the helpers
 const helpers = {

   // validation 
   // this validation is for test, when we are on real production we need use ReGex to validate
   validation: (objUrl, method)=> {  
      // Parse the body from objUrl       
        const body = helpers.parseJson(objUrl.body);
      
        if(method === 'post'){
            // make some verifications
            var dt = {
              firstName: typeof(body.firstName) === 'string' && body.firstName.trim().length > 0 ? body.firstName.trim() : false,
              lastName: typeof(body.lastName) === 'string' && body.lastName.trim().length > 0 ? body.lastName.trim() : false,
              phone: typeof(body.phone) === 'string' && body.phone.trim().length === 10 ? body.phone.trim() : false,
              password: typeof(body.password) === 'string' && body.password.trim().length > 0 ? body.password.trim() : false,
              toAsgreement: typeof(body.toAsgreement) === 'boolean' && body.toAsgreement === true ? true : false,
            }

            // Return true or false
            if(dt.firstName && dt.lastName && dt.phone && dt.password && dt.toAsgreement){
              // hash the password
              dt.password =  helpers.hashPass(dt.password);

              // return the data object
              return dt;
            } else {
              return false
            }   

        } else if(method === 'put') {

          // fiels can be update for the user
          var dt = {
            firstName: typeof(body.firstName) === 'string' && body.firstName.trim().length > 0 ? body.firstName.trim() : false,
            lastName: typeof(body.lastName) === 'string' && body.lastName.trim().length > 0 ? body.lastName.trim() : false,
            password: typeof(body.password) === 'string' && body.password.trim().length > 0 ? body.password.trim() : false,
          }

          return dt;
        }
     
   }, 
/******************************************************* */ 

   // Password hash SHA256 
   hashPass: (password)=> {

      var newPass = crypto.createHmac('sha256', config.hashSecret).update(password).digest('hex');

      return newPass;
   },

   /******************************************************* */
   // Parse the JSON file
   parseJson: (jsonFile)=> {
      try {
        var parse = JSON.parse(jsonFile);
        return parse;

      } catch (error) {
        return false;
      }
   }


 }

 // Export helpers

 module.exports = helpers;