/**
 * 
 *  Manage the token service
 */
// Dependencies
const _data = require('../data');
      helpers = require('../../helpers');
// end dependencies

const tokens = {
  post: require('./_post'),

  get: require('./_get'),

  put: require('./_put'),

  delete: require('./_delete'),

// verify if token and id is corrently valid
verify: (id, phone, callback)=> {
  _data.read('tokens', id, (err, tokenData)=> {
     //parse the data
     parseData = helpers.parseJson(tokenData);

    if(!err && parseData) {
      // check is the token is for the given user and has not expired
      if(parseData.phone === phone && parseData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    }else {
      callback(false);
    }
  });
},

 // chosen the method
 startService: (objUrl, callback) => {
   // chosen the method
   var methods = ['post', 'get', 'put', 'delete'];
   if(methods.indexOf(objUrl.method) > -1) {

     //if get the method call the function
      tokens[objUrl.method](objUrl, callback);

   } else {
     callback(405);
   }

   console.log(objUrl);
 } 

}

module.exports = tokens;