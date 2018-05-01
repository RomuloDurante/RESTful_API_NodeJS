/**
 * Configure the server
 */

((global)=>{
  //Depedencies
  const http = require('http');

  // -> End Dependencies











  //Server Config
  const server = {
  http: () =>{
      return  http.createServer( (req, res) =>{ res.end('Hello World !')} ).listen(3000, () => console.log('Server Start PORT-> 3000'));
  } 
  }

  //expose the server to 'global' object
  global.server = server;

})(global);

//Export server
module.exports = server;