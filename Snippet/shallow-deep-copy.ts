 
/*
    * Object.assign() 和 展示开运算符 ... 一样，如果对象只有一层，即为深拷贝，否则就是浅拷贝
    * slice concat 等都是浅拷贝
    如何实现深拷贝？
    * 手动挨个复制
    * 先把对象序列化，再转成对象 JSON.parse(JSON.stringify(''))
*/

function deepClone(obj) {
    function isObject(o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
    
    if (!isObject(obj)) {
        throw new Error('非对象')
    }
    
    let isArray = Array.isArray(obj)
    let newObj = isArray ? [...obj] : { ...obj }
    Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })
    
    return newObj
}
/*
Reflect.ownKeys 和 Object.keys 区别：
    Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组。
    它的返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
    Object.keys 返回给定对象的自身可枚举属性。
*/

/*
可枚举属性是指那些内部“可枚举” 标志设置为 true 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true ，
对于通过Object. defineProperty 等定义的属性，该标识值默认为 false  
*/

let obj = {
a: [1, 2, 3],
b: {
    c: 2,
    d: 3
}
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2