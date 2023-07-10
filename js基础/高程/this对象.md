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

## 闭包中使用this

```js
window.identity = 'The Window'; 
let object = { 
    identity: 'My Object', 
    getIdentityFunc() { 
        return function() { 
        return this.identity; 
    }; 
 } 
}; 
console.log(object.getIdentityFunc()()); // 'The Window'
```

匿名函数返回 this.identity。因为getIdentityFunc()返回函数，所以 object.getIdentityFunc()()会立即调用这个返回的函数，从而得到一个字符串。可是，此时返回的字符串是"The Winodw"，即全局变量 identity 的值。么匿名函数没有使用其包含作用域（getIdentityFunc()）的 this 对象呢？


> 原因：每个函数在被调用时都会自动创建两个特殊变量：this 和arguments。内部函数永远不可能直接访问外部函数的这两个变量。
但是，如果把 this 保存到闭包可以访问的另一个变量中，
则是行得通的。

```js
window.identity = 'The Window'; 
let object = { 
 identity: 'My Object', 
 getIdentityFunc() { 
    let that = this; 
    return function() { 
        return that.identity; 
    }; 
 } 
}; 
console.log(object.getIdentityFunc()()); // 'My Object'
```
> 即使在外部函数返回之后，that 仍然指向 object，所以调用 object.getIdentityFunc()()就会返回"My Obj

> 注意 this 和 arguments 都是不能直接在内部函数中访问的。如果想访问包含作用域中的 arguments 对象，则同样需要将其引用先保存到闭包能访问的另一个变量中。