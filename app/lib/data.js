/**
 * Library to store and editing data
 * 
 */

 //Dependencies
 const fs = require('fs');
 const path = require('path');

 //Container for the module (to be exported)
 const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir, file, data, callback) {
  //Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx', function(err, fileDescript) {

    if(!err && fileDescript) {
        // Convert data to string
        var stringData = JSON.stringify(data);
        console.log(fileDescript); //test
        // Write to file and close it
        fs.writeFile(fileDescript, stringData, function(err) {
            if(!err){
                fs.close(fileDescript, function() {
                    if(!err){
                      callback(false);
                    } else {
                    callback('error closing new file'); 
                    }
                });
            } else {
            callback('Error writing to new file'); 
            }
        });
    } else {
      callback('Cold not create new file, it may already exist !');
    }
  });
}

//Read data from the file
lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8', function(err, data) {
    callback(err, data);
  });
}

// Update the file already exists
lib.update = function(dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+', function(err, fileDescript){
    if(!err && fileDescript){
      var stringData = JSON.stringify(data); 
      // Truncate the content of the file
      fs.ftruncate(fileDescript, function(err) {
        if(!err && fileDescript){
          // Write the file and close it
          fs.writeFile(fileDescript, stringData, function(err) {
            if(!err) {
              fs.close(fileDescript, function(err) {
                if(!err){
                    callback(false);
                } else {
                    callback('Error closing the file')
                }
              });
            }else {
              callback('Error wrinting to existing file');
            }
          });
        }else {
          callback('Error truncating file');
        }
      });

    } else {
      callback('Cold not open the file for update, it may not exist yet !');
    }
  });
}

//Delete a file
lib.delete = function(dir, file, callback) {
  //Ulink
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err) {
    if(!err){
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
}

 // Export the module
 module.exports = lib;

