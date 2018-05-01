//I know that require + module.exports return a secure object.
//But I prefer to set my code this way, I think it gets more organized if i use a IIFE.

/**
 * Configure the server
 */
 
((global)=>{

  // -> Depedencies
  const _http = require('http'),
        _url = require('url');


  //End Dependencies
//***************************************************** */
  // -> Handle URl
  const url = {
    //Get the url and parse it
    parsedUrl: (req) => { return _url.parse(req.url, true)},

    //Send the response
    send: (res) => { res.end('Hello World !' + url.obj) },

    //Log the request Path

    //create the URL object
     obj: (parsedUrl) => {
       return {
        //Get the Path and trimmed it with replace
        path: parsedUrl.pathname.replace(/^\/+|\/+$/g,'')
       }
    }

  }

/***************************************************** */
  // ->Server Config
  const server = {
    //config http server
      http: () =>{
          return  _http.createServer( (req, res) =>{ 
          // get the obj url 
           var obj = url.obj(url.parsedUrl(req));

            console.log(obj.path);

            url.send(res)
           } 

        ).listen(3000, () => console.log('Server Start PORT-> 3000'));
      }
  }
/******************************************************** */
  //expose the server to 'global' object
  global.server = server;

})(global);

//Export server
module.exports = server;