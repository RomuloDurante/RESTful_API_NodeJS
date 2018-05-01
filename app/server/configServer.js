/**
 * Configure the server
 * 
 *I know that require + module.exports return a secure object. But I prefer to set my code this way, I *think it gets more organized if i use a IIFE.
 */

((global)=>{
  //Depedencies
  const http = require('http');

  // -> End Dependencies











  //Server Config
  const server = {
    //config http server
      http: () =>{
          return  http.createServer( (req, res) =>{ res.end('Hello World !')} ).listen(3000, () => console.log('Server Start PORT-> 3000'));
      }
  }

  //expose the server to 'global' object
  global.server = server;

})(global);

//Export server
module.exports = server;