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

// Function.prototype.uncurrying = function(){
//    const __self = this;
//    return function(){
//       const obj = Array.prototype.shift.call(arguments);  //arguments的首位为传入的对象
//       return __self.apply(obj,arguments)
//    }
// }

// for(let i=0,fn,arr = ['push', 'shift', 'forEach'];fn=arr[i++];){
//     Array[fn] = Array.prototype[fn].uncurrying()
// }

// const currying = function(fn,_args  = []){
//   return (...args)=>{
//     _args = [..._args,...args]
//     if(args.length===0){
//       return fn(..._args)
//     }else{
//       return currying(fn,_args)
//     }
//   }
// }

// const currying = function(fn,_args  = []){
//   const len = fn.length
//   return (...args)=>{
//     _args = [..._args,...args]
//     if(_args.length<len){
//       return currying(fn,_args)
//     }else{
//       return fn(..._args)
//     }
//   }
// }


// function isType(type, value) {
//   return Object.prototype.toString.call(value) === `[object ${type}]`
// }
// var isArray = currying(isType)('Array');
// // (1)(3)两种使用方式
// console.log(isArray([])) //true

// var cost = (function(a,b,c){
//   var money = 0;
//   return function(a,b,c){
//     for ( var i = 0, l = arguments.length; i < l; i++ ){
//         money += arguments[ i ];
//     }
//     return money;
//   }
// })();

// const costFn = currying( cost )(100)(200)(300);    // 600
// console.log(costFn,'===costFn')


// function multi() {
//   var args = Array.prototype.slice.call(arguments);
//   var fn = function() {
//     var newArgs = args.concat(Array.prototype.slice.call(arguments));
//         return multi.apply(this, newArgs);
//     }
//     fn.toString = function() {
//         return args.reduce(function(a, b) {
//             return a * b;
//         })
//     }
//   return fn;
// }

// console.log(multi(2)(3)(4)(5));


// function test(c){
//   console.log(c,'==c')
//   return (a)=>{
//     console.log(a,'==a')
//     return (b)=>{
//       console.log(b,'==b')
//     }
//   }
// }
// console.log(test(1)(2)(3))

// var throttle = function ( fn, interval ) {

//   var __self = fn,    // 保存需要被延迟执行的函数引用
//     timer,      // 定时器
//     firstTime = true;    // 是否是第一次调用

//   return function () {
//     var args = arguments,
//         __me = this;

//     if ( firstTime ) {    // 如果是第一次调用，不需延迟执行
//         __self.apply(__me, args);
//         return firstTime = false;
//     }

//     if ( timer ) {    // 如果定时器还在，说明前一次延迟执行还没有完成
//         return false;
//     }

//     timer = setTimeout(function () {  // 延迟一段时间执行
//         clearTimeout(timer);
//         timer = null;
//         __self.apply(__me, args);

//     }, interval || 500 );

// };

// };



// const throttle = (fn, interval)=> {
//   let timer = null,
//   firstTime = false
//   return (...args)=>{
//     if(firstTime){
//       fn(...args)
//       return firstTime = false
//     }
//     if(timer){
//       return false
//     }
//     timer = setTimeout(() => {
//         clearTimeout(timer);
//         timer = null;
//         fn(...args)
//     }, interval || 500);
//   }
// }
// window.onresize = throttle(function(){
//   console.log( 1 );
//   }, 1000 );
  



// var addEvent = function( elem, type, handler ){
//     if ( window.addEventListener ){
//         addEvent = function( elem, type, handler ){
//             elem.addEventListener( type, handler, false );
//         }
//     }else if ( window.attachEvent ){
//         addEvent = function( elem, type, handler ){
//             elem.attachEvent( 'on' + type, handler );
//         }
//     }
//     addEvent( elem, type, handler );
// };
// var div = document.getElementById( 'div1' );
// addEvent( div, 'click', function(){
//     alert (1);
// });
// addEvent( div, 'click', function(){
//     alert (2);
// });


// const timeChunk = function(ary,fn,count){
//  let timer = null;
//   const start = ()=>{
//     for(let i=0;i<Math.min(count || 1 ,ary.length);i++){
//         const obj = ary.shift()
//         fn(obj)
//     }
//   }
//   return ()=>{
//     timer = setInterval(() => {
//       if(ary.length===0){
//         return clearInterval(timer)
//       }
//       start()
//     }, 200);
//   }
// }

// const ary = []

// for(let i=1;i<=1000;i++){
//   ary.push(i)
// }

// const renderFriendList = timeChunk(ary,function( n ){
//   var div = document.createElement( 'div' );
//   div.innerHTML = n;
//   document.body.appendChild( div );
// },8)

// renderFriendList();


// var MyApp = {
// };
// MyApp.namespace = function( name ){
//     var parts = name.split( '.' );
//     var current = MyApp;
//     for ( let i in parts ){
//       if ( ! current[ parts[ i ] ] ){
//           current[ parts[ i ] ] = {};
//       }
//       current = current[ parts[ i ] ];
//     }
// };

// MyApp.namespace( 'event' );
// MyApp.namespace( 'dom.style' );
// console.dir( MyApp );

// 上述代码等价于：

// var MyApp = {
//      event: {},
//      dom: {
//         style: {}
//      }
// };


// var Singleton = function( name ){
//   this.name = name;
//   this.instance = null;
// };

// Singleton.prototype.getName = function(){
//   console.log  ( this.name );
// };

// Singleton.getInstance = function( name ){
//   if ( ! this.instance ){
//     this.instance = new Singleton( name );
//   }
//   return this.instance;
// };
// var a = Singleton.getInstance( 'sven1' );
// var b = Singleton.getInstance( 'sven2' );

// console.log ( a,b,a === b );    // true


// class Singleton{
//   constructor(name){
//     this.name = name;
//     this.instance = null;
//   }
//   getName(){
//     console.log  ( this.name );
//   }
//   static getInstance(name){
//     if ( ! this.instance ){
//       this.instance = new Singleton( name );
//     }
//     return this.instance;
//   }
// }
// let a = Singleton.getInstance( 'sven1' );
// let b = Singleton.getInstance( 'sven2' );

// console.log ( a,b,a === b );    // true


// var Singleton = function( name ){
//   this.name = name;
// };
// Singleton.prototype.sayName = function(){
//   console.log  ( this.name );
// } 
// Singleton.getInstance = (function(){
//   var instance = null
//   return function(name){
//     if(!instance){
//       instance = new Singleton(name)
//     }
//     return instance
//   }
// })()
// let a = Singleton.getInstance( 'sven1' );
// let b = Singleton.getInstance( 'sven2' );

// console.log ( a,b,a === b );    // true


// var MyApp = {};

// MyApp.namespace = function( name ){
//   const parts = name.split('.')
//   let current = MyApp
//   for(let key in parts){
//     if(!current[parts[key]]){
//       current[parts[key]] = {}
//     }
//     current = current[parts[key]]
//   }
// };

// MyApp.namespace( 'event' );
// MyApp.namespace( 'dom.style' );

// console.dir( MyApp );

// // 上述代码等价于：

// var MyApp = {
//      event: {},
//      dom: {
//         style: {}
//      }
// };


// const getSingle = function(fn){
//   let result;
//   return function(){
//     return result || (result = fn.apply(this,arguments))
//   }
// }


// const bindEvent = getSingle(function(){
//   // document.getElementById( 'div1' ).onclick = function(){
//   //   alert ( 'click' );
//   // }
//   console.log('click')
//   return true;
// });

// const render = function(){
//   console.log( '开始渲染列表' );
//   bindEvent();
// };

// render();
// render();
// render();

// const getSingle = function(fn){
//   let result;
//   return function(){
//     console.log(result,'==result')
//     return result || (result = fn.apply(this,arguments))
//   }
// }

// const createDiv = function(){
//  // document.getElementById( 'div1' ).onclick = function(){
//   //   alert ( 'click' );
//   // }
//   console.log('click')
//   return true;
// };

// const bindEvent = getSingle(createDiv);

// const render = function(){
//   console.log( '开始渲染列表' );
//   bindEvent();
// };

// render();
// render();
// render();





// const performanceS = function(){};

// performanceS.prototype.calculate = function( salary ){
//     return salary * 4;
// };

// const performanceA = function(){};

// performanceA.prototype.calculate = function( salary ){
//     return salary * 3;
// };

// const performanceB = function(){};

// performanceB.prototype.calculate = function( salary ){
//     return salary * 2;
// };


// class Bonus{
//   constructor(){
//     this.salary = null;      // 原始工资
//     this.strategy = null;    // 绩效等级对应的策略对象
//   }
//   setSalary(salary){
//     this.salary = salary
//   }
//   setStrategy(strategy){
//     this.strategy = strategy
//   }
//   getBonus(){
//     return this.strategy.calculate( this.salary)
//   }
// }
// const bonus = new Bonus()
// bonus.setSalary(10000)
// bonus.setStrategy(new performanceS())
// console.log(bonus.getBonus())



const strategies = {
  "S":function(salary){
    return salary*4
  },
  "A":function(salary){
    return salary*3
  },
  "B":function(salary){
    return salary*2
  }
}

const calculateBonus = function(level,salary){
  return strategies[level](salary)
}

console.log(calculateBonus('S',10000))