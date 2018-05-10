/**
 *  Tokens - DELETE
 * 
 */

// -> Depedencies
const helpers = require('../../helpers'),
  _data = require('../data');

// End Dependencies


//Required data : ID
//Optional data: None
const _delete = (objUrl, callback) => {
  //validate the id send for query string
  var body = helpers.valid(objUrl);

  if (body.queryString.id) {
    // looked the user
    _data.read('tokens', body.queryString.id, (err, data) => {
      if (!err && data) {
        // delete
        _data.delete('tokens', body.queryString.id, () => {
          if (!err) {
            callback(200, { ok: 'User token was deleted' });
          } else {
            callback(500, { 'Error': 'Could not delete the user token' });
          }
        });

      } else {
        callback(400, { "Error": "Could not find the user token" });
      }
    });
  } else {
    callback(400, { 'Error': 'ID does not exists' })
  }
}


module.exports = _delete;