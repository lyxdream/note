

// 1
// function sum (arr) {
//   return arr.reduce((pre, curr) => {
//     return pre + curr
//   })
// }
// console.log(sum([1, 2, 3, 4, 5]))

/* 2 */
// const arr = [1, 2, 2, 3, 4, 2, 2]
// function remove (arr, item) {
//   return arr.filter(el => {
//     return el !== item
//   })
// }

/* 3 */
// function remove (arr, item) {
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] === item) {
//       arr.splice(i, 1)
//       i--
//     }
//   }
//   return arr
// }
// console.log(remove(arr, 2))

/* 4 */
// const arr = [1, 2, 3, 4]
// function append (arr, item) {
//   return [...arr, item]
// }
// console.log(append(arr, 10))

/* 5 */
// 删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组
// const arr = [1, 2, 3, 4]
// function truncate (arr) {
//   const newArr = []
//   const len = arr.length - 1
//   for (let i = 0; i < len; i++) {
//     newArr.push(arr[i])
//   }
//   return newArr
// }
// console.log(truncate(arr))

// function truncate (arr) {
//   return arr.slice(0, arr.length - 1)
// }

/* 6 */
// 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
// function prepend (arr, item) {
//   return [item, ...arr]
// }
// console.log(prepend([1, 2, 3, 4], 10))

// // function prepend2 (arr, item) {
// //   var arr1 = [item];
// //   [].push.apply(arr1, arr)
// //   return arr1
// // }

/* 7 */
// 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
// function curtail (arr) {
//   return arr.slice(1)
// }
// console.log(curtail([1, 2, 3, 4]))

/* 8 */
// 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
// function insert (arr, item, index) {
//   const newArr = [...arr]
//   newArr.splice(index, 0, item)
//   return newArr
// }
// console.log(insert([1, 2, 3, 4], 'z', 2))

/* 9 */
// 统计数组 arr 中值等于 item 的元素出现的次数
// function count(arr, item) { return arr.filter(p=>p === item).length; }

// function count (arr, item) {
//   return arr.reduce((count, curr) => count += Number(curr === item), 0)
// }

// function count (arr, item) {
//   let count = 0
//   arr.forEach(el => {
//     if (el === item) {
//       count++
//     }
//   })
//   return count
// }

// console.log(count([1, 2, 3, 2, 4], 2))

/* 10 */
// 找出数组 arr 中重复出现过的元素（不用考虑返回顺序）
// function duplicates (arr) {
//   const newArr = []
//   const duplicatesArr = []
//   arr.forEach(item => {
//     if (newArr.includes(item)) {
//       duplicatesArr.push(item)
//     } else {
//       newArr.push(item)
//     }
//   })
//   return [...new Set(duplicatesArr)]
// }
// console.log(duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]))

// 直接使用filter + index + lastIndexOf 去判断重复：
// function duplicates(arr) {
//     return arr.filter((el, i)=>arr.lastIndexOf(el) != i  &&  i == arr.indexOf(el))
// }

/* 11 */
// 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
// function square (arr) {
//   return arr.map(item => Math.pow(item, 2))
// }

// function square (arr) {
//   return arr.reduce((r, o, i) => {
//     r.push(o * o)
//     return r
//   }, [])
// }
// console.log(square([1, 2, 3, 4]))

/* 12 */
// 在数组 arr 中，查找值与 item 相等的元素出现的所有位置
// function findAllOccurrences (arr, target) {
//   const indexArr = []
//   arr.forEach((item, index) => {
//     if (item === target) {
//       indexArr.push(index)
//     }
//   })
//   return indexArr
// }

// console.log(findAllOccurrences(['a', 'b', 'c', 'd', 'e', 'f', 'a', 'b', 'c'], 'a'))

/* 13 */
// function parse2Int (num) {
//   // if (num.indexOf('0x') === 0) {
//   //   return num.slice(2)
//   // }
//   return parseInt(num, 10)
// }

// console.log(parse2Int('12px'))
// console.log(parse2Int('0x12'))

/*14*/
// JS45 判断是否符合 USD 格式

// function isUSD(str) {
//   return /^\$\d{1,3}(,\d{3})*(\.\d{2})*$/.test(str)
// }


/*15*/
// 判断是否符合指定格式
// function matchesPattern(str) {
//   return /^\d{3}\-\d{3}\-\d{4}$/.test(str)
// }
// console.log(matchesPattern('800-555-1212'))

/*16*/
// 判断是否符合指定格式
// function captureThreeNumbers(str) {
//   let nums =  str.match(/\d{3}/g)
//   return (nums && nums[0]) || false
// }
// console.log(captureThreeNumbers('looiuiii9876543'))

/*17*/
// 判断是否以元音字母结尾
// function endsWithVowel(str) {
//   const lastW = str.slice(-1)
//   const reg = new RegExp(/a|e|i|o|u/i)
//   return reg.test(lastW)
// }
// const res = endsWithVowel('gorilla')
// console.log(res,'---')

// function endsWithVowel(str) {
//   const lastW = str.slice(-1)
//   return ['a','e','i','o','u'].includes(lastW.toLowerCase())
// }
// const res = endsWithVowel('gorilla')
// console.log(res,'--')


/*18*/
// 检查重复字符串
// 给定字符串 str，检查其是否包含连续重复的字母（a-zA-Z），包含返回 true，否则返回 false
// \1表示对第一个圆括号内容的引用
// 此处相当于匹配 aa -- zz和AA -- ZZ 其中两个字母都一样
// \2表示对第一个圆括号内容的引用
  
// function containsRepeatingLetter(str) {
//   return /([a-zA-Z])\1/.test(str);
// }
// const res = containsRepeatingLetter('abcdkokkklo')
// console.log(res,'--')

// 19
// function containsNumber(str) {
//   return /\d+/g.test(str)
// }
// console.log(containsNumber('abc1222'))


/*20*/
// 属性遍历
// 找出对象 obj 不在原型链上的属性(注意这题测试例子的冒号后面也有一个空格~)
// 1、返回数组，格式为 key: value
// 2、结果数组不要求顺序
// function iterate(obj) {
//   const tempArr = []
//   for(let key in obj){
//     if(obj.hasOwnProperty(key)){
//       tempArr.push(`${key}:${obj[key]}`)
//     }
//   }
//   return tempArr
// }

// function iterate(obj) {
//   const tempArr = []
//    for(let key in obj){
//      if(obj.hasOwnProperty(key)){
//       //  tempArr.push(key + ": " + obj[key]);
//        tempArr.push(key.concat(': ',obj[key]))
//      }
//    }
//    return tempArr
//  }

// var C = function() {this.foo = 'bar'; this.baz = 'bim';}; 
// C.prototype.bop = 'bip'; 
// console.log(iterate(new C()));


/*21*/
// 给定一个构造函数 constructor，请完成 alterObjects 方法，将 constructor 的所有实例的 greeting 属性指向给定的 greeting 变量。
// function alterObjects(constructor, greeting) {
//   constructor.prototype.greeting = greeting
// }

// var C = function(name) {this.name = name; return this;}; 
// var obj1 = new C('Rebecca'); 
// alterObjects(C, 'What\'s up'); 
// obj1.greeting;
// console.log(obj1.greeting,'---obj1.greeting')


/*22*/
// 将函数 fn 的执行上下文改为 obj，返回 fn 执行后的值
// function alterContext(fn, obj) {
//   return fn.call(obj)
// }

// const res = alterContext(function() {return this.greeting + ', ' + this.name + '!'; }, {name: 'Rebecca', greeting: 'Yo' })
// console.log(res)

/*23*/
// 求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题
// function multiply(a, b) {
//   function getl(num) {
//     const l = num.toString().indexOf('.')
//     return l == -1 ? 0 : num.toString().length - l - 1
//   }
//   return (a*b).toFixed(getl(a) + getl(b))
// }
// const res = multiply(3,0.0001)
// console.log(res,'--res')


/*24*/
// 将给定数字转换成二进制字符串。如果字符串长度不足 8 位，则在前面补 0 到满8位。
// function convertToBinary(num) {
//   const str = num.toString(2);
//   return  str.length<8?(new Array(8-str.length).fill(0).join(''))+str:str
//   //  return parseInt(num, 16)   //十六进制转十进制
// }
// const res = convertToBinary(65)
// console.log(res,'--res')

/*25*/
// 给定二进制字符串，将其换算成对应的十进制数字
// function base10(str) {
//    return parseInt(str, 2)   //二进制转十进制
// }
// const res = base10(11000000)
// console.log(res,'--res')

/*26*/
// 获取数字 num 二进制形式第 bit 位的值。注意：
// function valueAtBit(num, bit) {
//   let str = num.toString(2);
//   str = str.slice(0,-(bit-1))
//   return str
// }
// const res = valueAtBit(128,8)
// console.log( res,'--res')


// &： 与 两个位都为1时，结果才为1
// |： 或 两个位都为0时，结果才为0
// ^： 异或 两个位相同为0，相异为1
// ~： 取反 0变1，1变0
// <<： 左移 各二进位全部左移若干位，高位丢弃，低位补0
// '>>： 右移各二进位全部右移若干位，对无符号数，高位补0，有符号数，各编译器处理方法不一样，有的补符号位（算术右移），有的补0（逻辑右移）

// 先将num右移bit-1位，拿到第bit位。如128二进制表示位10000000，右移7位得到00000001，1就是第bit位。要取得该位，&1即可

// function valueAtBit(num, bit) {
//     return (num >> (bit - 1)) & 1;
// }
// const res = valueAtBit(128,8)
// console.log( res,'--res')


// (3)
// function valueAtBit(num, bit) { 
//    let num2 = num.toString(2).split('').reverse();
//    return num2[bit-1]
// }
// const res = valueAtBit(128,8)
// console.log( res,'--res')



/*27*/
// 完成函数 createModule，调用之后满足如下要求：
// 1、返回一个对象
// 2、对象的 greeting 属性值等于 str1， name 属性值等于 str2
// 3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + ', ' + name属性值
// function createModule(str1, str2) {
//   const obj = {
//     'greeting':str1,
//     'name':str2,
//     sayIt:()=>{
//       return str1+', '+str2
//     }
//   }
//   return obj
// }
// const res = createModule('hahh','yx')
// console.log(res.sayIt(),'---sss')


// function createModule(str1, str2) {
//   class Obj{
//     constructor(){
//       this.greeting  = str1;
//       this.name = str2;
//     }
//     sayIt(){
//       return this.greeting+', '+this.name
//     }
//   }
//   let result = new Obj(str1, str2)
//   return result
// }
// const res = createModule('hahh','yx')
// console.log(res.sayIt(),'---sss')

/*保留小数*/

// function toFixed (num, d = 1) {
//   const digit = Math.pow(10, d)
//   let res = num * digit + 0.5
//   res = parseInt(res, 10) / digit
//   return res
// }

// function returnFloat (value, n) {
//   const num = String(toFixed(value, n))
//   console.log(String(num))
//   const fillZero = (n)=> (new Array(n).fill(0).join('')) //补n位零
//   const pointIndex = num.indexOf('.')
//   if (pointIndex > -1) {
//     //说明有小数
//     const zeroFillDigit = n - (num.length-pointIndex-1)
//     return num +  fillZero(zeroFillDigit)
//   } else {
//     //无小数
//     return num + '.'+ fillZero(n)
//   }
// }
// const res = returnFloat('0.1',2)
// console.log(res,'---res')




/*28*/
// 返回参数 a 和 b 的逻辑且运算结果
// function and(a, b) {
//  return a&&b
// }
// const res = and(false,true)
// console.log(res,'---res')


/*29*/
// 已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
// 1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
// 2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
// 3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
// 4、调用 c 之后，返回的结果与调用 fn 的返回值一致
// 5、fn 的参数依次为函数 a, b, c 的调用参数
// function curryIt(fn) {
 
// }
// var fn = function (a, b, c) {
//   return a + b + c
// }; 
// curryIt(fn)(1)(2)(3);


/*30*/
// 使用 apply 调用函数
// 实现函数 callIt，调用之后满足如下条件
// 1、返回的结果为调用 fn 之后的结果
// 2、fn 的调用参数为 callIt 的第一个参数之后的全部参数

// function callIt(fn) {    
//    return fn.apply(this,[...arguments].splice(1))
// }

/*31 函数 useArguments 可以接收 1 个及以上的参数。请实现函数 useArguments，返回所有调用参数相加后的结果。本题的测试参数全部为 Number 类型，不需考虑参数转换。*/
// function useArguments() {
//   let arr = [...arguments];
//   return arr.reduce((total, num)=> total += num)
// }

// function useArguments() {
//   let sum = 0;
//   for(let i = 0; i < arguments.length; i++){
//       sum += arguments[i];
//   }
//   return sum;
// }


/*32*/
// 已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
// 1、返回一个函数 result，该函数接受一个参数
// 2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致
// function partial(fn, str1, str2) {
//   return (str3)=>{
//     return fn(str1, str2,str3)
//   }
// }

// let sayIt = function(greeting, name, punctuation) {    
// return greeting + ', ' + name + (punctuation || '!');
// }; 

// console.log(partial(sayIt, 'Hello', 'Ellie')('!!!'));


/*33*/
// 实现函数 partialUsingArguments，调用之后满足如下条件：
// 1、返回一个函数 result
// 2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
// 3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数

function partialUsingArguments(fn) {
  return (str) =>{
    return fn.apply(this,[...arguments].splice(1))
  }
} 

/*34*/
//将函数 fn 的执行上下文改为 obj 对象：

// function speak(fn, obj) {
//   return fn.call(obj)
// }
// const fn = function () {
//   return this.greeting + ', ' + this.name + '!!!';
// }
// const obj = {greeting: 'Hello', name: 'Rebecca'}
// console.log(speak(fn,obj))

/*35*/
//将数组 arr 中的元素作为调用函数 fn 的参数
// 解法1：
// function argsAsArray(fn, arr) {
//   return fn(...arr)
// }
// function  fn(greeting, name, punctuation) {
//   return greeting + ', ' + name + (punctuation || '!')
// }
// const arr =['Hello', 'Ellie', '!']
// console.log(argsAsArray(fn,arr))

// 解法2：
// function argsAsArray(fn, arr) {
//   return fn.apply(this,arr)
// }


/*36*/
// 描述
// 实现函数 functionFunction，调用之后满足如下条件：
// 1、返回值为一个函数 f
// 2、调用返回的函数 f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即 ', '
// 3、所有函数的参数数量为 1，且均为 String 类型

// function functionFunction(str) {
//   return (childrenStr)=>{
//       return `${str}, ${childrenStr}`
//   }
// }

// function functionFunction(str) {
//   // 字符串拼接函数
//   function strAdd() {
//     return Array.prototype.join.call(arguments, ', ')
//   }
 
//   // 柯里化工具函数，argLength为目标函数的参数的长度
//   function curry(fn, argLength) {
//     return function curried(...args) {
//       if (args.length >= argLength) {
//         return fn.apply(this, args)
//       } else {
//         return function(...args2) {
//           return curried.apply(this, args.concat(args2))
//         }
//       }
//     }
//   }
 
//   // 将字符串函数柯里化，目标参数长度为2（也可以是其他长度）
//   // 并进行初次调用
//   return curry(strAdd, 2)(str)
// }

// console.log(functionFunction('Hello')('world'))


/*37*/
// 实现函数 partialUsingArguments，调用之后满足如下条件：
// 1、返回一个函数 result
// 2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
// 3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数



let  currying = (fn) =>{
  let len = fn.length;  //这里获取的是函数参数的个数
  let arr=[]
  return function curried (...args){  //每次执行传入的参数
      //高阶函数
      arr = [...arr, ...args] //合并上次传入的参数到arr数组
      if (arr.length < len) {
          return curried //递归不停的产生函数
      } else {
          return fn(...arr)
      }
  }
}

function add(a, b, c, d, e) {
  // console.log(a, b, c, d, e,'---a, b, c, d, e,f')
  return a + b + c + d + e
}
let sum = currying(add)
console.log(sum(1, 2)(3, 4)(5))



