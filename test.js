
var token = '';
for (let i = 0; i < 20; i++) {
  var randon = Math.floor(Math.random() * 25);
 
  token += String.fromCharCode(97 + i) + String.fromCharCode(65 + i) + Math.floor(Math.random() * 10);
}




console.log(token);