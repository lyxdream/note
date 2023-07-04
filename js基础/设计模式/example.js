
// 1.鸭子类型
const duck = {
    duckSinging: function(){
        console.log( "嘎嘎嘎");
    }
    }

const chicken = {
    duckSinging: function(){
        console.log( "嘎嘎嘎" );
    }
};

const choir = [];    //合唱团

const joinChoir = function( animal ){
    if ( animal && typeof animal.duckSinging === 'function' ){
        choir.push( animal );
        console.log( "恭喜加入合唱团" );
        console.log( "合唱团已有成员数量：" + choir.length );
    }
};

joinChoir( duck );    //恭喜加入合唱团
joinChoir( chicken );    //恭喜加入合唱团

// 2、多态
// const makeSound = function( animal ){
//     if ( animal instanceof Duck ){
//         console.log( "嘎嘎嘎");
//     }else if ( animal instanceof Chicken ){
//       console.log( "咯咯咯");
//     }
// };
// const Duck = function(){};
// const Chicken = function(){};
// makeSound( new Duck() );      // 嘎嘎嘎
// makeSound( new Chicken() );   // 咯咯咯

//对象的多态性
const makeSound = function( animal ){
    animal.sound()
}
const Duck = function(){};
Duck.prototype.sound = function(){
    console.log( "嘎嘎嘎");
}
const Chicken = function(){}
Chicken.prototype.sound = function(){
    console.log( "咯咯咯");
}
makeSound(new Duck())
makeSound(new Chicken())

// 3. 使用克隆的原型模式
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


// 4. new操作符
function Person( name ){
    this.name = name;
};

Person.prototype.getName = function(){
    return this.name;
};

const objectFactory = function(){
    const obj = new Object(),    // 从Object.prototype上克隆一个空的对象
      Constructor = [].shift.call( arguments );    // 取得外部传入的构造器，此例是Person
    obj.__proto__ = Constructor.prototype;    // 指向正确的原型
    const ret = Constructor.apply( obj, arguments );    // 借用外部传入的构造器给obj设置属性

    return typeof ret === 'object' ? ret : obj;     // 确保构造器总是会返回一个对象
};

const a = objectFactory( Person, 'sven' );

console.log( a.name );    // 输出：sven
console.log( a.getName() );     // 输出：sven
console.log( Object.getPrototypeOf( a ) === Person.prototype );      // 输出：true

// 5.class
class Animal{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}

class Dog extends Animal{
    constructor(name){
        super(name)
    }
    speak(){
        return 'woof'
    }
}

const dog = new Dog('Tim')
console.log(dog.getName()+"says"+dog.speak())
