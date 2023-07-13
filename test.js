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





// const Tv = {
//   open(){
//     console.log( '打开电视机' );
//   },
//   close(){
//     console.log( '关上电视机' );
//   }
// }

// class OpenTvCommand{
//   constructor(receiver){
//     this.receiver = receiver
//   }
//   execute(){
//     this.receiver.open()   //执行命令，打开电视机
//   }
//   undo(){
//     this.receiver.close()  //执行命令，关闭电视机
//   }
// }
// const setCommand = (command)=>{
//   document.getElementById( 'execute' ).onclick = function(){
//     command.execute()  // 输出：打开电视机
//   }
//   document.getElementById( 'undo' ).onclick = function(){
//     command.undo()  // 输出：关闭电视机
//   }
// }

// setCommand( new OpenTvCommand( Tv) );


// const Tv = {
//   open(){
//     console.log( '打开电视机' );
//   },
//   close(){
//     console.log( '关上电视机' );
//   }
// }

// const createCommand = function(receiver){
//   const execute =()=>{
//    return receiver.open()
//   }
//   const undo = ()=>{
//     return receiver.close()
//   }
//   return {
//     execute:execute,
//     undo:undo
//   }
// }
// const setCommand = (command)=>{
//   document.getElementById( 'execute' ).onclick = function(){
//     command.execute()  // 输出：打开电视机
//   }
//   document.getElementById( 'undo' ).onclick = function(){
//     command.undo()  // 输出：关闭电视机
//   }
// }
// setCommand(createCommand(Tv))

// const isType = function( type ){
//   return function( obj ){
//     return Object.prototype.toString.call( obj ) === '[object '+ type +']';
//   }
// };


// let func = function(a){
//   console.log( a+2 ); //7
// };
// Function.prototype.before = function( beforefn ){
//   const __self = this;    // 保存原函数的引用
//   return function(){    // 返回包含了原函数和新函数的"代理"函数
//     beforefn.apply( this, arguments );     // 执行新函数，修正this
//      __self.apply( this, arguments );    // 执行原函数
//   }
// };
// Function.prototype.after = function(afterfn){
//   const __self = this
//   return function(){
//     const ret = __self.apply(this,arguments);
//     afterfn()
//     return ret
//   }
// }

// func = func.before(function(){
//   console.log( 1 );
// }).after(function(){
//   console.log( 3 );
// });
// func(5)





// const currying = function(fn){
//   const args = []
//   return function(){
//     if(arguments.length==0){
//       return fn.apply(this,args)
//     }else{
//       [].push.apply(args,arguments)
//       return arguments.callee
//     }
//   }
// }

// const cost = (function(){
//   let money = 0;

//   return function(){
//     for ( let i = 0, l = arguments.length; i < l; i++ ){
//         money += arguments[ i ];
//     }
//     return money;
//   }

// })();

// let costFn = currying( cost )(100)(200)();    // 转化成currying函数

// costFn( 100 );    // 未真正求值
// costFn( 200 );    // 未真正求值
// costFn( 300 );    // 未真正求值
// console.log ( costFn() );     // 求值并输出：600


// var first = Array.shift( obj );    // 截取第一个元素
// console.log( first );     // 输出：1
// console.log( obj );    // 输出：{0: 2, 1: 3, 2: 4, length: 3}

// Array.forEach( obj, function( i, n ){
//   console.log( n );      // 分别输出：0, 1, 2
// });


Function.prototype.uncurrying = function(){
   const __self = this;
   return function(){
      const obj = Array.prototype.shift.call(arguments);  //arguments的首位为传入的对象
      return __self.apply(obj,arguments)
   }
}

for(let i=0,fn,arr = ['push', 'shift', 'forEach'];fn=arr[i++];){
    Array[fn] = Array.prototype[fn].uncurrying()
}