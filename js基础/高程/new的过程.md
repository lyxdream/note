# new的过程

- 创建一个空对象
- 使该对象proto指向构造函数的原型对象
- 使用构造函数为其初始化属性（将构造函数的this指向新对象）
- 返回这个对象

```js
const objectFactory = function(){
  const obj = new Object();
  Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  const ret = Constructor.apply( obj, arguments );    // 借用外部传入的构造器给obj设置属性
  return typeof ret === 'object' ? ret : obj;     // 确保构造器总是会返回一个对象
}
  function Person( name ){
      this.name = name;
  };

  Person.prototype.getName = function(){
      return this.name;
  };
const a = objectFactory( Person, 'sven' );
  console.log( a.name );    // 输出：sven
  console.log( a.getName() );     // 输出：sven
  console.log( Object.getPrototypeOf( a ) === Person.prototype );      // 输出：true
```