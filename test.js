var token = '';

for (let i = 0; i < 20; i++) {

  var randon1 = Math.floor(Math.random() * 25);
  var randon2 = Math.floor(Math.random() * 25);
  var randon3 = Math.floor(Math.random() * 10);

 // ASCII char 
 if( i % 2 === 0){
  token += String.fromCharCode(97 + randon1) + String.fromCharCode(65 + randon2) + randon3;
 } else {
  token += String.fromCharCode(65 + randon2) + String.fromCharCode(97 + randon1) + randon3;
 }
  
}

console.log(token);