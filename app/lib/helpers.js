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
   },

   /********************************************************* */
   // generate TOKEN
   token: (phone)=> {
    var token = '';
    for (let i = 0; i < 20; i++) {
      var randon1 = Math.floor(Math.random() * 25);
      var randon2 = Math.floor(Math.random() * 25);
      var randon3 = Math.floor(Math.random() * 10);
     // ASCII char 
     if( i % 2 === 0){
      token += String.fromCharCode(97 + randon1) + String.fromCharCode(65 + randon2) + randon3;
     } else {
      token += String.fromCharCode(65 + randon2) + String.fromCharCode(97 + randon1) + randon3;
     }
      
    }
    
    const tokenObj = {
      id: token,
      phone: phone,
      expires: Date.now() + 1000 * 60 * 60
    }
   
    return tokenObj;
   },

   /**************************************************** */

   // validates strings
   valid: (objUrl, method)=> {  
    // Parse the body from objUrl       
      const body = helpers.parseJson(objUrl.body);
    
          // make some verifications
          var dt = {
            //validate the body
            body:{
              firstName: typeof(body.firstName) === 'string' && body.firstName.trim().length > 0 ? body.firstName.trim() : false,
              lastName: typeof(body.lastName) === 'string' && body.lastName.trim().length > 0 ? body.lastName.trim() : false,
              phone: typeof(body.phone) === 'string' && body.phone.trim().length === 10 ? body.phone.trim() : false,
              password: typeof(body.password) === 'string' && body.password.trim().length > 0 ? body.password.trim() : false,
              toAsgreement: typeof(body.toAsgreement) === 'boolean' && body.toAsgreement === true ? true : false,
              // Validation for expires and id
              extend: typeof(body.extend) === 'boolean' && body.extend === true ? true : false,
              id: typeof(body.id) === 'string' && body.id.trim().length === 60 ? body.id.trim() : false,
            },
          
            // validation for the Headers
            headers: {
              token: typeof(objUrl.headers.token)  === 'string' ? objUrl.headers.token : false,
            },

            // validation for query strings
            queryString: {
                phone: typeof(objUrl.queryString.phone) === 'string' && objUrl.queryString.phone.trim().length === 10 ?objUrl.queryString.phone.trim() : false,
                id: typeof(objUrl.queryString.id) === 'string' && objUrl.queryString.id.trim().length === 60 ?objUrl.queryString.id.trim() : false,
             }
          }
            // return the data object
            return dt;
  }


 }

 // Export helpers

 module.exports = helpers;