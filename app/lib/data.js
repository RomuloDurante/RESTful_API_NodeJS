/**
 *  lIbrary use to store and handle data
 */

 // -> Dependencies
  const $fs = require('fs'),
       path = require('path');

 // End Dependencies

 // create a base directory
 const baseDir = path.join(__dirname, '/../.data/');


 //Data object
const data = {
  // write data and create a new file
  create: (dir, fileName, data, callback)=> {
      // Open the file for writing
      $fs.open(baseDir + dir + '/' + fileName + '.json','wx', (err, fileDescriptor)=> {
        if(!err && fileDescriptor){
          // Convert data to string
          var stringData = JSON.stringify(data);
            // Write to file and close it
             $fs.writeFile(fileDescriptor, stringData, (err)=> {
                if(!err){
                  //close the file if not error
                  $fs.close(fileDescriptor, (err)=> {
                    if(!err) {
                        callback(false);
                    } else {
                      callback('Error closing new file');
                    }
                  }); 
              } else {
                callback('Error to write new file!');
              }              
            });
        } else {
          callback('Cold not create a new file, it may already exist !');
        }
      });
    },

    // Read data from the file
    read: (dir, fileName, callback)=> {
      $fs.readFile(baseDir + dir + '/' + fileName + '.json', 'utf-8', (err, data)=> {
        callback(err, data);
      });
    },

    // Upadate new file
    update: (dir, fileName, data, callback)=> {
      $fs.open(baseDir + dir + '/' + fileName + '.json','r+', (err, fileDescriptor)=> {
        if(!err && fileDescriptor){
          // Convert data to string
          var stringData = JSON.stringify(data);
            // Trucate the file
            $fs.ftruncate(fileDescriptor, (err)=> {
              if(!err) {
                 // Write the file
                 $fs.write(fileDescriptor, stringData, (err)=> {
                    if(!err) {
                      // Close the file
                      $fs.close(fileDescriptor, (err)=> {
                        if(!err) {
                          callback(false);
                        } else {
                          callback('Error closing new file');
                        }
                      });
                    }else {
                      callback('Error writing exist file !');
                    }
                 });
              }else {
                callback('Error truncate file !');
              }
            });
        } else {
          callback('Cold not open the file for update it !');
        }
      });
    },

    // Delete a file
    delete: (dir, fileName, callback)=> {
      $fs.unlink(baseDir + dir + '/' + fileName + '.json', (err)=> {
        if(!err) {
          callback(false);
        }else {
          callback('Error deleting file!');
        }
      });
    }



}

 // Export module

 module.exports = data;