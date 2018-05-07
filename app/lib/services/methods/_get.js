/**
 * 
 *  Get method
 */

 // Dependencies

 const helpers = require('../../helpers'),
   _fileSystem = require('./fileSystem');

 // end dependencies

 const _get = (objUrl, callback)=>{

  var phone = typeof(objUrl.queryString.phone) === 'string' && objUrl.queryString.phone.trim().length === 10 ?objUrl.queryString.phone.trim() : false ;

  if(phone) {
    // looked the user
    _fileSystem.read('users', phone, (err, data)=>{
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
}


// Export get

module.exports = _get;