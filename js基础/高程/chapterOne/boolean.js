function testTruthy(val) { 
  return val ? console.log('truthy') : console.log('falsy'); 
 } 
 testTruthy(true); // true 
 testTruthy(false); // false 
 testTruthy(new Boolean(false)); // true (对象始终为 true) 
 testTruthy(''); // false 


 testTruthy('Packt'); // true 
 testTruthy(new String('')); // true (对象始终为 true) 
 testTruthy(1); // true 
 testTruthy(-1); // true 
 testTruthy(NaN); // false 
 testTruthy(new Number(NaN)); // true (对象始终为 true) 
 testTruthy({}); // true (对象始终为 true) 
 var obj = { name: 'John' }; 
 testTruthy(obj); // true 
 testTruthy(obj.name); // true 
 testTruthy(obj.age); // age (属性不存在)