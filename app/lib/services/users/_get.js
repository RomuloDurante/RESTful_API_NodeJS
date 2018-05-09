/**
 * 
 * 
 */
 // -> Depedencies
 const helpers = require('../../helpers'),
          _data = require('../data');


 // End Dependencies
 const get = (objUrl, callback)=>{

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
};


module.exports = get;