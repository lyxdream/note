# this

> JavaScript的this总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

this的指向大致可以分为以下4种。
 - 作为对象的方法调用。
 - 作为普通函数调用。
 - 构造器调用。
 - Function.prototype.call或Function.prototype.apply调用。

## 1．作为对象的方法调用
当函数作为对象的方法被调用时，this指向该对象：

```js
  const obj = {
      a: 1,
      getA: function(){
        alert ( this === obj );    // 输出：true
        alert ( this.a );    // 输出： 1
      }
  };
  obj.getA();
```
## 2．作为普通函数调用

此时的this总是指向全局对象。在浏览器的JavaScript里，这个全局对象是window对象。
```js
  window.name = 'globalName';
  const getName = function(){
      return this.name;
  };
  console.log( getName() );    // 输出：globalName
```

<!-- 或者 -->

```js
  window.name = 'globalName';

  const myObject = {
      name: 'sven',
      getName: function(){
        return this.name;
      }
  };

  const getName = myObject.getName;
  console.log( getName() );    // globalName
```

## 3．构造器调用
构造器的外表跟普通函数一模一样，它们的区别在于被调用的方式。
> 当用new运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的this就指向返回的这个对象

```js
const MyClass = function(){
    this.name = 'sven';
};
const obj = new MyClass();
alert ( obj.name );     // 输出：sven
```
> 但用new调用构造器时，还要注意一个问题，如果构造器显式地返回了一个object类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的this：

```js
const MyClass = function(){
  this.name = 'sven'
  return {
    name:"anne"
  }
}
const obj = new MyClass();
console.log(obj.name)  //anne
```
> 如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述问题：
```js
const MyClass = function(){
  this.name = 'sven'
  return "anne"
}
const obj = new MyClass();
console.log(obj.name)  //sven
```
## 4. Function.prototype.call或Function.prototype.apply调用

> 跟普通的函数调用相比，用Function.prototype.call或Function.prototype.apply可以动态地改变传入函数的this：

```js
  const obj1 = {
      name: 'sven',
      getName: function(){
        return this.name;
      }
  };

  const obj2 = {
      name: 'anne'
  };

  console.log( obj1.getName() );     // 输出： sven
  console.log( obj1.getName.call( obj2 ) );    // 输出：anne
```
