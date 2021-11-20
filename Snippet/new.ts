 // new关键字用来创建一个自定义的对象类型的实例 或 具有构造函数的内置对象的实例
/* 实现原理
1. 创建一个新的空对象
2. 将空对象的原型对象__proto__指向构造函数的原型属性prototype,从而继承原型上的方法
3. 将this指向这个对象，执行构造函数中的方法，获取私有属性
4. 如果构造函数返回对象，就返回该对象，否则返回新创建的对象
*/
 function _new(ctor,...other){
    if(typeof ctor !== 'function'){
        throw '第一个参数必须是function'
    }
    // es6 new.target 指向构造函数
    ctor.target = ctor;
    // 创建一个新对象, 把对象的 __proto__ 指向构造函数prototype
    var obj = Object.create(ctor.prototype);
    // 等同于
    // var obj = {};
    // (obj as any).__proto__ = ctor.prototype;
    var args = Array.prototype.slice.call(arguments,1)
    // 获取ctor函数的返回值
    var ctorReturnResult = ctor.apply(obj, args);
    // 防止ctor函数返回null
    return typeof ctorReturnResult === 'object' ? ctorReturnResult || obj : obj;
 }

function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = _new(Otaku,'Kevin','game');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName();