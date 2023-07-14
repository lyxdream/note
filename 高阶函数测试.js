
// var currying = function(fn){
//   var args = []
//   var len = fn.length;
//   console.log(len,'==len')
//   return function(){
//     // Array.prototype.push.apply( args, arguments );    // args借用Array.prototype.push方法
//     [].push.apply(args,arguments ) //args借用[]的push方法
//     if(args.length<len){
//       return arguments.callee
//     }else{
//       return fn.apply(this,args)
//     }
//   }
// }
function currying(fn, args) {
  var args = args || [];//用来存储所有传入的参数
  var _this = this;
  var len = fn.length;
  return function () {
      var _args = Array.prototype.slice.call(arguments) //把arguments转换成数组  用来存放每次递归传过来的参数
       _args = args.concat(_args)
      // 如果参数个数小于fn.length，则递归调用，继续收集参数
      if (_args.length < len) {
          return currying.call(_this, fn, _args)
      } else {
          // 参数收集完毕，则执行fn
          return fn.apply(_this, _args)
      }
  }
}
var cost = (function(){
  var money = 0;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    money += arguments[ i ];
}
  return money;
})

// var costFn = currying( cost );    // 转化成currying函数

// (1)(3)两种使用方式
currying( cost )(100)(200)(300);    // 600