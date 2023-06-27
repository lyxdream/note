var myVariable = 'global'; 
myOtherVariable = 'global'; 
function myFunction() { 
 var myVariable = 'local'; 
 return myVariable; 
} 
function myOtherFunction() { 
 myOtherVariable = 'local'; 
 return myOtherVariable; 
} 
console.log(myVariable); // {1}   //global
console.log(myFunction()); // {2}  //local
console.log(myOtherVariable); // {3}  //global 
console.log(myOtherFunction()); // {4}  //local
console.log(myOtherVariable); // {5}  //local