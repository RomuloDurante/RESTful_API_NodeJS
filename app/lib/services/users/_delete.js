/**
 * 
 * 
 */
 // -> Depedencies
 const  _data = require('../data');


 // End Dependencies

 const _delete = (objUrl, callback)=>{
  //check the phone number
  
  var phone = typeof(objUrl.queryString.phone) === 'string' && objUrl.queryString.phone.trim().length === 10 ?objUrl.queryString.phone.trim() : false ;

  if(phone) {
    // looked the user
    _data.read('users', phone, (err, data)=>{
      if(!err && data) {
          // delete
          _data.delete('users', phone, ()=> {
            if(!err){
              callback(200, {ok : 'User was deleted'}); 
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
}

module.exports = _delete;