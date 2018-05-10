/**
 * DELETE METHOD FOR USERS
 * 
 */
// -> Depedencies
const _data = require('../data'),
  helpers = require('../../helpers'),
  _tokensVerify = require('../token/tokens').verify;


// End Dependencies

const _delete = (objUrl, callback) => {
  // validate the phone send for query string
    var body = helpers.valid(objUrl);

  // Verify the If the token exists and if the ID match, so allow the user acess the service
  _tokensVerify(body.headers.token, body.queryString.phone, (tokenIsValid)=> {
    if(tokenIsValid) {

    /***************************GET DELETE SERVICE**************************************/ 
      if (body.queryString.phone) {
        // looked the user
        _data.read('users', body.queryString.phone, (err, data) => {
          if (!err && data) {
            // delete
            _data.delete('users', body.queryString.phone, () => {
              if (!err) {
                callback(200, { ok: 'User was deleted' });
              } else {
                callback(500, { 'Error': 'Could not delete the user' });
              }
            });
    
          } else {
            callback(400, { "Error": "Could not find the user" });
          }
        });
      } else {
        callback(400, { 'Error': 'phone does not exists' })
      }
    /************************************************************************************ */

    }else {
      callback(403, {Error: 'Missing require token and header'});
    }
  });

}

module.exports = _delete;

