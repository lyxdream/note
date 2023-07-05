// const MyClass = function(){
//   this.name = 'sven'
//   this.age = 111
//   return 'anne'
//   // return {
//   //   name:"anne"
//   // }
// }
// const obj = new MyClass();
// console.log(obj,obj.age)  //anne


// Function.prototype.bind = function(context){
//   return ()=>{
//     return this.apply(context,arguments)
//   }
// }

// const obj = {
//   name:'sven'
// }
// const func = function(){
//   console.log(this.name)
// }.bind(obj)

// func()


// Function.prototype.bind = function(){
//   const self = this,
//   context = [].shift.call( arguments ), //需要绑定的this上下文
//   args = [].slice.call( arguments ); //剩余参数转换成数组
//   // console.log(arguments,'==args')
//   return function(){
//       //执行新的函数的时候，会把之前传入的context当作新函数体内的this,并且组合两次分别传入的参数，作为新函数的参数
//       return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) );
//   }
// }
// const obj = {
// name:'sven'
// }

// const func = function( a, b, c, d ){
//   console.log ( this.name );        // 输出：sven
//   console.log ( [ a, b, c, d ] )    // 输出：[ 1, 2, 3, 4 ]
// }.bind( obj, 1, 2 );

// func(3,4)
