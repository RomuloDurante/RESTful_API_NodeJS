/**
 * 
 *  Worker realted tasks
 */

 // Dependencies
const gatherAllChecks = require('./gatherAllChecks');
 // end dependencies
 

 // Worker object
 const worker = {
   // init script
   init: ()=> { 
      // call the loop the checks will execute later on
      worker.loop(gatherAllChecks);

   },

    // Timer to execulte the worker process once per minute
    loop: (fn)=>{
      setInterval(()=>{
       fn();
      },1000 * 5);
    },

 }

 // export
 module.exports = worker;