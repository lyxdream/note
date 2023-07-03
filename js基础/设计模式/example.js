
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
const makeSound = function( animal ){
    if ( animal instanceof Duck ){
        console.log( "嘎嘎嘎");
    }else if ( animal instanceof Chicken ){
      console.log( "咯咯咯");
    }
};
const Duck = function(){};
const Chicken = function(){};
makeSound( new Duck() );      // 嘎嘎嘎
makeSound( new Chicken() );   // 咯咯咯

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
