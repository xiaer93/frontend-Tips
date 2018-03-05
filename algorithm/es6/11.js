/* *
 * Created by winack on 2018/3/5 
 */
/*
* Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
* */
//Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
var obj=new Proxy({},{
    get(target,key,receiver){
        console.log(`getting ${key}`);
        return Reflect.get(target,key,receiver);
    },
    set(target,key,value,receiver){
        console.log(`setting ${key}`);
        return Reflect.set(target,key,value,receiver);
    }
});
obj.count=1;
obj.count++;//2

var obj2=Object.create(obj);
console.log(obj2.count);
obj2.times=9;//在原型链上查找，被set拦截
console.log(obj2.times);//在自身属性，所以未被拦截

//proxy对象提供的拦截方法！
//如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。

//get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
// ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
// defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

//1、get拦截，参数依次为目标对象、属性名、proxy实例！
function createArray(...elements) {
    let handler={
        get(target,propKey,receiver){
            let index=Number(propKey);
            if(index<0){
                propKey=String(target.length+index);
            }
            return Reflect.get(target,propKey,receiver);
        }
    };
    let target=[];
    target.push(...elements);
    return new Proxy(target,handler);
}
let arr=createArray('a','b','c');
console.log(arr[-1]);//c

var pipe=(function () {
    return function (value) {
        let fnStack=[];
        let oproxy=new Proxy({},{
            get:function (pipeObject,fnName) {
                if(fnName==='get'){
                    return fnStack.reduce((val,fn)=>{return fn(val)},value);
                }
                fnStack.push(window[fnName]);
                return oproxy;
            }
        });
        return oproxy;
    }
})();
window.double = n => n * 2;
window.pow    = n => n * n;
window.reverseInt = n => n.toString().split("").reverse().join("") | 0;
console.log(pipe(3).double.pow.reverseInt.get);//63

//2、set拦截，参数依次为目标对象、属性名、属性值、proxy实例！
function createObj() {
    const handler={
        get(target,key){
            invariant(key,'get');
            return target[key];
        },
        set(target,key,value){
            invariant(key,'set');
            target[key]=value;
            return true;
        }
    };
    function invariant(key,action) {
        if(key[0]==='_'){
            throw new Error(`Invalid attempt to ${action} private "${key}" property`);
        }
    }
    return new Proxy({},handler);
}
let proxy=createObj();
//proxy._prop=1;//Invalid attempt to set private "_prop" property

//2、apply拦截函数的调用，参数依次为目标对象、上下文对象（this）、目标对象的参数数组
function createTwice() {
    let handler={
        apply(target,ctx,args){
            return Reflect.apply(...arguments)*2;
        }
    };
    function sum(a,b) {
        return a+b;
    }
    return new Proxy(sum,handler);
}
let proxy2=createTwice();
console.log(proxy2(1,2));//6
console.log(proxy2.call(null,2,3));//10

//proxy返回的代理对象不是透明代理，会改变this指针！
{
    const target = {
        m: function () {
            console.log(this === proxy);//代理对象改变了this指针，若有方法则需要绑定>>>.bind(target)
        }
    };
    const handler = {};
    const proxy = new Proxy(target, handler);
    target.m(); // false
    proxy.m();  // true
}