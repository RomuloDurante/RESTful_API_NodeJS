//I know that require + module.exports return a secure object.
//But I prefer to set my code this way, I think it gets more organized if i use a IIFE.

/**
 * Configure the server
 */
 
((global)=>{

  // -> Depedencies
  const $http = require('http'),
        $url = require('url');


  //End Dependencies
//***************************************************** */
  // -> Handle URl
  const handleUrl = {
    //Get the url and parse it
    parsedUrl: (req) => { return $url.parse(req.url, true)}, //the true argument is for use with queryString

    //Send the response
    send: (res) => { res.end('Hello World !' + handleUrl.obj) },

    //Log the request Path

    //create the URL object
     obj: (parsedUrl, req) => {
       return {
        //Get the Path and trimmed it with replace
        path: parsedUrl.pathname.replace(/^\/+|\/+$/g,''),

        //Get the HTTP method
        method: req.method.toLowerCase(),

        //Get the queryString Object
        queryString: parsedUrl.query
       }
    }

  }

/***************************************************** */
  // ->Server Config
  const server = {
    //config http server
      http: () =>{
          return  $http.createServer( (req, res) =>{ 
          // get the parse url
          var parsedUrl = handleUrl.parsedUrl(req);

          // get the obj url 
           var obj = handleUrl.obj(parsedUrl, req);

            console.log(obj.queryString);

            handleUrl.send(res)
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