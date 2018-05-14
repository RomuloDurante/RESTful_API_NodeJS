/**
 * 
 *  Worker realted tasks
 */

 // Dependencies
const _data = require('../services/data'),
      path = require('path'),
      fs = require('fs'),
      https = require('https'),
      http = require('http'),
      url = require('url'),
      helpers = require('../helpers');
 // end dependencies

 // Worker object
 const worker = {
   // init script
   init: ()=> { 
      // call the loop the checks will execute later on
      worker.loop(worker.getherAllChecks);

   },

    // Timer to execulte the worker process once per minute
    loop: (fn)=>{
      setInterval(()=>{
       fn();
      },1000 * 5);
    },

    //lookup all checks, get their data, send to a validator
    getherAllChecks: ()=> {
      // Get all the checks
      _data.list('checks', (err, checks)=>{
      
         if(!err && checks && checks.length > 0) {
            checks.forEach(check => {
               // Read in the check data
               _data.read('checks', check, (err, data)=>{
                  if(!err && data) {
                    //parse the data
                    var checkData = helpers.parseJson(data);
                    
                    // Pass the data to check validator, and let that function continue or not
                    worker.validateCheckData(checkData);
                  } else {
                    console.log('Error reading the checks');
                  }
               });   
            });

         } else {
           console.log('Error, could not find any check to process');
         }
      });
    },

    // Sanity check the check data
    validateCheckData: (checkData)=>{
      // validate the checks
          var validCheck = helpers.validateChecks(checkData);

          if(validCheck) {
            worker.performCheck(validCheck);
          } else {
            console.log('Error: One of the checks is not properly formatted.');
          }
      
    },

    // Perfom the check, send the validate check and outcome the check process  to the next step
    performCheck:(validCheck)=> {
      // Prepare the initial check outcome
      const checkOutcome = {
        error : false,
        responseCode: false
      };

      // Mark that the outcome has not been sent yet
      var outcomeSent = false;

      // Parse the url and the path out the original check data
      var parsedUrl = url.parse(validCheck.protocol+'://'+ validCheck.url, true);
      var hostName = parsedUrl.hostname;
      var path = parsedUrl.path; 

      // construct the request
      const requestDetails = {
        protocol : validCheck.protocol+':',
        hostname : hostName,
        method : validCheck.method.toUpperCase(),
        path : path,
        timeout : validCheck.timeOutSeconds * 1000
      };

      // Instantiate the request object (http or https)
      var _moduleToUse = validCheck.protocol === 'http' ? http : https;
      var req = _moduleToUse.request(requestDetails, (res)=>{
        // Grab the status of the sent request
        var status = res.statusCode;
        // Update the check outcome and pass the data along
        checkOutcome.responseCode = status;
        if(!outcomeSent) {
          worker.processCheckOutcome(validCheck, checkOutcome);
          outcomeSent = true;
        }
      });

      // Bind the error
      req.on('error', (err)=>{
        // // Update the check outcome and pass the data along
        checkOutcome.error = {
          'error': true,
          'value': err
        };
        if(!outcomeSent) {
          worker.processCheckOutcome(validCheck, checkOutcome);
          outcomeSent = true;
        }        
      });

      //Bind the timeout 
      req.on('timeout', (err)=>{
        // // Update the check outcome and pass the data along
        checkOutcome.error = {
          'error': true,
          'value': 'timeout'
        };
        if(!outcomeSent) {
          worker.processCheckOutcome(validCheck, checkOutcome);
          outcomeSent = true;
        }        
      });

      // End the request
      req.end();
    },

    // Process the outcome and update the check data, and trigger an alert tot the user
    processCheckOutcome: (validCheck, checkOutcome)=>{
      
      // // Decide if the check is UP or DOWN
      var state = !checkOutcome.error && checkOutcome.responseCode && validCheck.sucessCode.indexOf(checkOutcome.responseCode) > -1 ? 'up' : 'down';

      // Decide if the alert is warranted
      var alertWarranted = validCheck.lastChecked && validCheck.state !== state ? true : false;

      // Update the check data
      var newCheckData = validCheck;
      newCheckData.state = state;
      newCheckData.lastChecked = Date.now();


      // save the update
      _data.update('checks', newCheckData.id, newCheckData, (err)=>{
        if(!err) {
          // Send the data to the next phase in the process if needed
          if(alertWarranted) {
            worker.alertUser(newCheckData);
          } else {
            console.log('Check outcome has not changed, no alert needed');
          }
        } else {
          console.log('Try to save the updates checks');
        }
      });
    },

    alertUser: (newCheckData)=> {
      console.log(newCheckData + ' OKKK');
    }
 }

 // export
 module.exports = worker;