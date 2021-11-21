// 发布订阅模式是一种对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都会得到状态改变的通知。

// 订阅者 subscriber 把自己想订阅的事件注册到调度中心 EventChannel,  当发布者把事件 发布publish 到 调度中心，由调度中心统一处理事件。 需要注意的是，发布者和订阅者是全完解耦的，双方不知道对方的存在。

// 实现思路
/*
1. 创建一个对象，在对象上创建一个缓存列表
2. 实现 on 方法把函数添加到缓存列表
3. 实现 emit 方法取arguments第一个参数当event, 执行缓存列表中对应的函数
4. 实现 off取消订阅
5，实现once 实现一次订阅，调用一次之后从缓存列表清除
*/

class myEvent {
    public listenr;
    constructor(){
        this.listenr = {};
    }

    on(EventName,fn){
        // 如果缓存中有EventName,把fn添加到对应event缓存列表中 如果没有，添加EventName到缓存列表
        if(!this.listenr[EventName]){
            this.listenr[EventName] = []; 
        }
        this.listenr[EventName].push(fn);
    }

    emit(EventName,data){
        const callbacks = this.listenr[EventName];
        if(callbacks){
            callbacks.forEach(cb => cb(data))
        }
    }

    off(EventName,fn){
        let callbacks = this.listenr[EventName];
        if(callbacks){  
            let toDeleteIndex = callbacks.findIndex(cb => cb === fn);
            if(toDeleteIndex !== -1)  callbacks.splice(toDeleteIndex,1);
            if(callbacks.length === 0) delete this.listenr[EventName];
        }
    }

    once(EventName,fn){
        // 只执行一次就是在执行前从缓存列表删除，再执行
        const onceFn = () => {
            fn();
            this.off(EventName,fn);
        }
        this.on(EventName,onceFn)
    }

}

const events = new myEvent();

events.once('alert',(e)=> console.log(e));
events.emit('alert','name')

setTimeout(()=> events.emit('alert','name'),2000)


