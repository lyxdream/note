#  call和apply


## 1.call和apply的区别

> apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply方法把这个集合中的元素作为参数传递给被调用的函数：
```js
  const func = function( a, b, c ){
      alert ( [ a, b, c ] );    // 输出 [ 1, 2, 3 ]
  };
  func.apply( null, [ 1, 2, 3 ] );
//在这段代码中，参数1、2、3被放在数组中一起传入func函数，它们分别对应func参数列表中的a、b、c。
```
> call传入的参数数量不固定，跟apply相同的是，第一个参数也是代表函数体内的this指向，从第二个参数开始往后，每个参数被依次传入函数：

```js
const func = function( a, b, c ){
    alert ( [ a, b, c ] );    // 输出 [ 1, 2, 3 ]
};
func.call( null, 1, 2, 3 );
```
> 当使用call或者apply的时候，如果我们传入的第一个参数为null，函数体内的this会指向默认的宿主对象，在浏览器中则是window：

有时候我们使用call或者apply的目的不在于指定this指向，而是另有用途，比如借用其他对象的方法。那么我们可以传入null来代替某个具体的对象：

```js
Math.max.apply( null, [ 1, 2, 5, 3, 4 ] )    // 输出：5
```
## 2.call和apply的用途

- 改变this指向

call和apply最常见的用途是改变函数内部的this指向

```js
  const obj1 = {
      name: 'sven'
  };

  const obj2 = {
      name: 'anne'
  };

  window.name = 'window';

  const getName = function(){
      alert ( this.name );
  };

  getName();    // 输出： window
  getName.call( obj1 );    // 输出： sven
  getName.call( obj2 );    // 输出： anne
  // 当执行getName.call( obj1 )这句代码时，getName函数体内的this就指向obj1对象
```

- Function.prototype.bind

**模拟bind**

```js
Function.prototype.bind = function(context){
  return ()=>{
    return this.apply(context,arguments)
  }
}

const obj = {
  name:'sven'
}
const func = function(){
  console.log(this.name)
}.bind(obj)

func()
```
> 在Function.prototype.bind的内部实现中，我们先把func函数的引用保存起来，然后返回一个新的函数。当我们在将来执行func函数时，实际上先执行的是这个刚刚返回的新函数。在新函数内部，self.apply( context, arguments )这句代码才是执行原来的func函数，并且指定context对象为func函数体内的this。

**复杂版**

```js
Function.prototype.bind = function(){
  const self = this,
  context = [].shift.call( arguments ), //需要绑定的this上下文
  args = [].slice.call( arguments ); //剩余参数转换成数组
  // console.log(arguments,'==args')
  return function(){
      //执行新的函数的时候，会把之前传入的context当作新函数体内的this,并且组合两次分别传入的参数，作为新函数的参数
      return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) );
  }
}
const obj = {
name:'sven'
}

const func = function( a, b, c, d ){
  console.log ( this.name );        // 输出：sven
  console.log ( [ a, b, c, d ] )    // 输出：[ 1, 2, 3, 4 ]
}.bind( obj, 1, 2 );

func(3,4)

```
- 借用其他对象的方法

(1)借用构造函数

```js
  const A = function( name ){
      this.name = name;
  };

  const B = function(){
      A.apply( this, arguments );
  };

  B.prototype.getName = function(){
      return this.name;
  };

  const b = new B( 'sven' );
  console.log( b.getName() );  // 输出： 'sven'
```
(2)函数的参数列表arguments是一个类数组对象，虽然它也有“下标”，但它并非真正的数组，所以也不能像数组一样，进行排序操作或者往集合里添加一个新的元素。

这种情况下，我们常常会借用Array.prototype对象上的方法。比如想往arguments中添加一个新的元素，通常会借用Array.prototype.push：

```js
  (function(){
      Array.prototype.push.call( arguments, 3 );
      console.log ( arguments );    // 输出[1,2,3]
  })( 1, 2 );
```
> 想把arguments转成真正的数组的时候，可以借用Array.prototype.slice方法；想截去arguments列表中的头一个元素时，又可以借用Array.prototype.shift方法

借用Array.prototype.push方法的对象还要满足以下两个条件

  (1)对象本身要可以存取属性；

  (2)对象的length属性可读写。

如果借用Array.prototype.push方法的不是一个object类型的数据，而是一个number类型的数据呢？我们无法在number身上存取其他数据

```js
  const a = 1;
  Array.prototype.push.call( a, 'first' );
  alert ( a.length );      // 输出：undefined
  alert ( a[ 0 ] );    // 输出：undefined
```
函数的length属性就是一个只读的属性，表示形参的个数，我们尝试把一个函数当作this传入Array.prototype.push：

```js
const func = function(){};
Array.prototype.push.call( func, 'first' );

alert ( func.length );
// 报错：cannot assign to read only property ‘length' of function(){}
```