// instanceOf 用于检测构造函数的 prototype 属性是否存在与某个实例的原型链上
// 实现原理就是 左表达式的  __proto__  是不是强等于 右表达式的 prototype，不等于再找  左表达式.__proto__ .__proto__  直到 __proto__ 为 null

function _instanceof(left,right): boolean{
    left = left.__proto__;
    while(true){
        if(left === null){
            return false;
        }
        if(left === right.prototype) {
            return true;
        }
        left = left.__proto__;
    }
}

function instanceOf(father, child) {
    const fp = father.prototype
    var cp = child.__proto__

    while (cp) {
        if (cp === fp) {
            return true
        }
        cp = cp.__proto__
    }

    return false
}

function A(){
    //
}
const instanceA = new A();

console.log(instanceOf(A,instanceA))
