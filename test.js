// function fn2(){
//   console.log(a)
// }
// function fn1(){
// 	const a = 1
//   fn2()
// }
// const a = 2
// function fn2(){
//   console.log(a)
// }
// function fn3(f){
//   const a = 4;
//   f()
// }
// fn1()
// fn3(fn2)

// function fn3(){
//   const a = 4;
//   console.log(a)
// }
// fn3()
// var cache = {};

// var mult = function(){
//   console.log(arguments,'==arguments')
//     var args = Array.prototype.join.call( arguments, ', ' );
//     console.log(args,'==args')
//     if ( cache[ args ] ){
//       return cache[ args ];
//     }
//     var a = 1;
//     for ( var i = 0, l = arguments.length; i < l; i++ ){
//         a = a * arguments[i];
//     }

//     return cache[ args ] = a;
// };

// console.log ( cache,mult( 1,2,3 ) );     // 输出：6



// function  fn1() {
//   let num = 1;
//   return function () {
//       /*fn1=>num*/
//       num++;
//       console.log(num)
//   }
// }
// let fn2 = fn1(); 
// fn2();//2
// fn2();//3

// let fn3 = fn1();
// fn3()//2
// var num = 1;
// function  fn1() {
//   let  num = 5;
//     return function () {
//       console.log(num);
//       num++
//     }
// }

// var fn2 =fn1();
// num = 2;
// fn2()   



// let mult = function(){
   
// };



// let mult = (function(){
//   let cache = {};
//   return function(){
//     const args = Array.prototype.join.call( arguments, ', ' );  //1, 2, 3
//     if ( cache[ args ] ){
//       return cache[ args ];
//     }
//     let a = 1;
//     for ( let i = 0, l = arguments.length; i < l; i++ ){
//         a = a * arguments[i];
//     }
//     return cache[ args ] = a;
//   }
// })()
// console.log ( mult( 1,2,3 ) );     // 输出：6
// console.log ( mult( 1,2,3 ) );     // 输出：6



// let mult = (function(){
//   let cache = {};
//   const calculate = function(){
//     let a = 1;
//     for ( let i = 0, l = arguments.length; i < l; i++ ){
//         a = a * arguments[i];
//     }
//     return a
//   }
//   return function(){
//     const args = Array.prototype.join.call( arguments, ', ' );  //1, 2, 3
//     if ( cache[ args ] ){
//       return cache[ args ];
//     }
//     return cache[ args ] = calculate.apply(null,arguments);
//   }
// })()
// console.log ( mult( 1,2,3 ) );     // 输出：6


// let report = (function(){
//   let imgs = [];
//   return function( src ){
//       let img = new Image();
//       imgs.push( img );
//       img.src = src;
//       console.log(img,imgs,'==imgs')
//   }
// })();
// report('https://bkimg.cdn.bcebos.com/pic/8cb1cb134954092302ddef229b58d109b3de4932?x-bce-process=image/resize,m_lfit,w_536,limit_1/format,f_auto')


// const extent = {
//   value:0,
//   call:function(){
//     this.value++;
//     console.log(this.value)
//   }
// }
// extent.call();     // 输出：1
// extent.call();     // 输出：2
// extent.call();     // 输出：3

// const extent = function(){
//   let value = 0;
//   return {
//     call: function(){
//         value++;
//         console.log( value );
//     }
//   }
// };
// const extent1 = extent();
// extent1.call();     // 输出：1
// extent1.call();     // 输出：2
// extent1.call();     // 输出：3


const Extent = function(){
  this.value = 0;
};

Extent.prototype.call = function(){
  this.value++;
  console.log( this.value );
};

const extent = new Extent();

extent.call();
extent.call();
extent.call();