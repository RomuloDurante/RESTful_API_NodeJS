/**
 * 
 *  Checks PUT
 */

// Dependencies
const helpers = require('../../helpers'),
        _data = require('../data'),
        _tokensVerify = require('../token/tokens').verify;
// end dependencies

const _put = (objUrl, callback)=> {
  // validate the id
  var loadData = helpers.valid(objUrl);
  // get the id
  var id = loadData.body.id;

  if(id) {
    // check make sure the optional data has been sent
    if(loadData.protocol || loadData.url || loadData.method || loadData.sucessCode || loadData.timeOutSeconds) {
      // read the checks
      _data.read('checks', id, (err, data)=> {
        if(!err && data) {
          //parse the data
          var checkData = helpers.parseJson(data);

          //verify the token and belongs to the user who create the check
          _tokensVerify(loadData.headers.token, checkData.phone, (tokenIsValid)=> {         
            if(tokenIsValid) {
              // Update the checkObjet
              loadData.protocol ? checkData.protocol = loadData.protocol : '';
              loadData.url ? checkData.url= loadData.url : '';
              loadData.method ? checkData.method = loadData.method : '';
              loadData.sucessCode ? checkData.sucessCode = loadData.sucessCode : '';
              loadData.timeOutSeconds ? checkData.timeOutSeconds = loadData.timeOutSeconds : '';

              // store the updates
              _data.update('checks', id, checkData, (err)=> {
                if(!err) {
                  callback(200);
                } else {
                  callback(500, {Error : "could not update the check"});
                }
              });
            }else {
              callback(403);
            }
          });

        } else {
          callback(400, {Error : 'check ID did not exist'});
        }
      });

    }else {
      callback(400, {Error : 'Missing fields to update'});
    }
  } else {
    callback(400, {Error : "Missing required field"});
  }
}

module.exports = _put;