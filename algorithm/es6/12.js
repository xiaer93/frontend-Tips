/* *
 * Created by winack on 2018/3/5 
 */
/*
* Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。
* 1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
* 2. 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false
* 3. 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
* 4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。
* */

function createLogObj(obj) {
    let loggedObj = new Proxy(obj, {
        get(target, name) {
            console.log('get', target, name);
            return Reflect.get(target, name);
        },
        deleteProperty(target, name) {
            console.log('delete' + name);
            return Reflect.deleteProperty(target, name);
        },
        has(target, name) {
            console.log('has' + name);
            return Reflect.has(target, name);
        }
    });
    return loggedObj;
}

//Reflect对象共有13个静态方法，与proxy对象一一对应！
// Reflect.apply(target, thisArg, args)
// Reflect.construct(target, args)
// Reflect.get(target, name, receiver)
// Reflect.set(target, name, value, receiver)
// Reflect.defineProperty(target, name, desc)
// Reflect.deleteProperty(target, name)
// Reflect.has(target, name)
// Reflect.ownKeys(target)
// Reflect.isExtensible(target)
// Reflect.preventExtensions(target)
// Reflect.getOwnPropertyDescriptor(target, name)
// Reflect.getPrototypeOf(target)
// Reflect.setPrototypeOf(target, prototype)

//Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
{
    var myObject = {
        foo: 1,
        bar: 2,
        get baz() {
            return this.foo + this.bar;
        },
    };
    var myReceiverObject = {
        foo: 4,
        bar: 4,
    };
    //读取getter函数结果！
    Reflect.get(myObject, 'baz', myReceiverObject) // 8
}

//Reflect.set方法设置target对象的name属性等于value。

//实现观察者模式
{
    const queueObservers=new Set();
    const observer=fn=>queueObservers.add(fn);
    const observable=obj=>new Proxy(obj,{set});
    function set(target,key,value,receiver) {
        const result=Reflect.set(target,key,value,receiver);
        queueObservers.forEach(observer=>observer(target,key,value));
        return result;
    }

    let model=observable({
        name:'cjw',
        age:18
    });
    observer((target,key,value)=>console.log(`属性${key}被修改，新值为:${value}`));
    model.age=20;//当age被修改，触发queueObservers中的观察者！
}