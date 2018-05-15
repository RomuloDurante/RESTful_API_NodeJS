 /**
  * save the log apps 
  * 
  */
 
 // Dependencies
const _logs = require('./_logs');

 /*** */

 const log = {
    // create the log Data object
    logData:(validCheck, checkOutcome, state, alertWanted, timeNow)=>{
          const data = {
            check : validCheck,
            outcome : checkOutcome,
            state : state,
            alert : alertWanted,
            time : timeNow
            
          }

          // Append the log string to the file
          _logs.append(data, (err)=>{
            if(!err) {
              console.log("Logging to the file succeded");
            } else {
              console.log("loggin to file FAILED");
            }
          });
          
      }
 }

 // Exports module

 module.exports = log;