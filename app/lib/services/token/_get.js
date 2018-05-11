/**
 *  Tokens - GET
 * 
 */

// -> Depedencies
const helpers = require('../../helpers'),
  _data = require('../data');

// End Dependencies

// require data: id
//optional data : none
const _get = (objUrl, callback) => {
// validate the id
  var loadData = helpers.valid(objUrl);

  if (loadData.queryString.id) {
    // looked the token
    _data.read('tokens', loadData.queryString.id, (err, tokenData) => {
      if (!err && tokenData) {
        //parse the data
        parseData = helpers.parseJson(tokenData);

        callback(200, parseData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { 'Error': 'ID-> does not math !' })
  }
}


module.exports = _get;