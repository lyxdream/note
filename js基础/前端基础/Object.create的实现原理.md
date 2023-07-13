# Object.create的实现原理

Object.create()是 JavaScript 中用于创建一个新对象的方法。它的实现原理可以简单地描述为：

- 创建一个空的构造函数（ObjectCreate）。
- 将传入的原型对象作为 ObjectCreate 的原型。
- 返回通过 new ObjectCreate() 创建的新对象。

下面是一个实现 Object.create() 的示例代码：

```js
function createObject(proto) {
  function ObjectCreate() {}
  ObjectCreate.prototype = proto;
  return new ObjectCreate();
}
// 使用示例
var obj = createObject({ foo: 'bar' });
console.log(obj.foo); // 输出 'bar'
```
在这个示例中，createObject 函数接受一个原型对象作为参数，然后创建一个空的构造函数 ObjectCreate。接下来，将原型对象赋值给 ObjectCreate 的原型属性。最后，通过使用 new ObjectCreate() 创建一个新对象，并将其返回。

请注意，这只是 Object.create() 的一种简化实现方式，实际的规范中还会考虑到更多的细节和边界情况。但是这个简化版本可以帮助你理解 Object.create() 的大致实现原理。


在不支持Object.create方法的浏览器中，则可以使用以下代码：
```js
  Object.create = Object.create || function( obj ){
      const F = function(){};
      F.prototype = obj;

      return new F();
  }
```

> 通过设置构造器的prototype来实现原型继承的时候，除了根对象Object.prototype本身之外，任何对象都会有一个原型。而通过Object.create( null )可以创建出没有原型的对象。