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
    var loadData = helpers.valid(objUrl);

  // Verify the If the token exists and if the ID match, so allow the user acess the service
  _tokensVerify(loadData.headers.token, loadData.queryString.phone, (tokenIsValid)=> {
    if(tokenIsValid) {

    /***************************GET DELETE SERVICE**************************************/ 
      if (loadData.queryString.phone) {
        // looked the user
        _data.read('users', loadData.queryString.phone, (err, data) => {
          if (!err && data) {
            // parse the data
            var userData = helpers.parseJson(data);

            // delete
            _data.delete('users', loadData.queryString.phone, (err) => {
              if (!err) {

                // delete each of the checks associate with the user
                var userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];    
                var checksToDelete = userChecks.length;
                if(checksToDelete > 0) {
                    var checkDeleted = 0;
                    var deletionErros = false;
                    // loop througth the cheks
                    userChecks.forEach( (checkId) => {
                      // Delete the check
                     _data.delete('checks', checkId, (err)=> {
                      if(err) {
                        deletionErros = true;
                      } 
                        checkDeleted++;
                        if(checkDeleted === checksToDelete){
                          if(!deletionErros){
                            callback(200);
                          } else {
                            callback(500, {Error : 'Erros encoutered while delete the user checks'});
                          }
                        }                      
                     });
                                  
                    });
                } else {
                  callback(200);
                }
                
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

