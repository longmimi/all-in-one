const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function PromiseSimple(fn){
    const _this = this;
    _this.state = PENDING; //初始状态是pending
    _this.value = null; //存储 reslove reject 中传入的值
    _this.resolvedCallbacks = []; //存储then中的回调，当执行完Promise可能还是pending,此时应该把then中的回调保存起来等到状态改变时使用
    _this.rejectedCallbacks = [];
    

    // 首先判断当前是否出在等待状态，规范规定只有在等待过程才可以改变状态
    // 改变状态，将传入的值赋值给value 并且遍历执行回调函数数组
    function resolve(value){
        if(_this.state === PENDING){
            _this.state = RESOLVED;
            _this.value = value;
            _this.resolvedCallbacks.forEach(cb => cb(_this.value));
        }
    }

    function reject(value){
        if(_this.state === PENDING){
            _this.state = REJECTED;
            _this.value = value;
            _this.rejectedCallbacks.forEach(cb => cb(_this.value));
        }
    }

    try{
        fn(resolve,reject);
    }catch(e){
        reject(e);
    }
}

PromiseSimple.prototype.then = function (onFulfilled, onRejected){
    const _this = this;
    //onFulfilled 和 onRejected 是可选参数，因此判断是不是函数给个默认函数，返回函数值
    onFulfilled = typeof  onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err} ;
    if(_this.state === PENDING){
        _this.resolvedCallbacks.push(onFulfilled)
        _this.rejectedCallbacks.push(onRejected)
    }
    if(_this.state === RESOLVED){
        onFulfilled(_this.value)
    }
    if(_this.state === REJECTED){
        onRejected(_this.value)
    }
}

