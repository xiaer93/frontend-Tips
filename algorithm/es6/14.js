/* *
 * Created by winack on 2018/3/5 
 */
/*
* Iterator和for...of
* */

//遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
//Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

//模拟遍历器
function makeIterator(array) {
    let nextIndex=0;
    return {
        next:function () {
            return nextIndex<array.length?
                {value:array[nextIndex++],done:false}:
                {value:undefined,done:true}
        }
    }
}
let it=makeIterator(['a','b']);
console.log(it.next());
console.log(it.next());
console.log(it.next());

//ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。
//定义可遍历的对象
class RangeIterator{
    constructor(start,stop){
        this.value=start;
        this.stop=stop;
    }
    [Symbol.iterator](){
        return this;
    }
    next(){
        let value=this.value;
        if(value<this.stop){
            this.value++;
            return{done:false,value};
        }
        return {done:true,value:undefined};
    }
}
function range(start,stop) {
    return new RangeIterator(start,stop);
}
for(let value of range(0,3)){
    console.log('自定义Iterator接口：',value);
}
//原生具备 Iterator 接口的数据结构如下。
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象

let arr=[1,2,3];
let itAr=arr[Symbol.iterator]();
console.log(itAr.next());
console.log(itAr.next());
console.log(itAr.next());

//类似数组调用数组的Array.prototype[Symbol.iterator]！
{
    let iterable = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
    };
    for (let item of iterable) {
        console.log(item); // 'a', 'b', 'c'
    }
}
//会调用iterator接口的场合
//解构赋值、扩展运算符、yield*、for...of、Array.from()、Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）、Promise.all()、Promise.race()

//Symbol.iterator最简单的实现
{
    let myIterable = {
        [Symbol.iterator]: function* () {
            yield 1;
            yield 2;
            yield 3;
        }
    };
    console.log([...myIterable]);//[1,2,3]
    let obj={
        *[Symbol.iterator](){
            yield 'hello';
            yield 'world';
        }
    };
    for(let x of obj){
        console.log(x);//hello world
    }
}
//遍历器对象还具有return方法和throw方法。
//在for...of提前退出循环时调用return方法，（break、continue、错误）等状态下！
{
    function readLineSync(file) {
        return {
            [Symbol.iterator](){
                return {
                    next(){
                        return {done:false}
                    },
                    return(){
                        file.close();
                        return {done:true}
                    }
                }
            }
        }
    }
}
//只要对象有Symbol.iterator接口，就可以使用for...of循环！

//有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。
//entries、keys、values

//对于普通的对象，for...in循环可以遍历键名，for...of循环会报错。（对象必须具备iterator接口才能for...of）
//for...in循环主要是为遍历对象而设计的，不适用于遍历数组。for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
//不同于forEach方法，for...of可以与break、continue和return配合使用。

/*
* 1. 具有iterator接口（Symbol.iterator），可以使用for...of语句。iterator接口具有next、return、throw等方法！
* 2. for...in主要用于对象，forEach不能配合break语句使用，for...of只要有iterator接口的数据结构都可以使用！
* 3. entries、keys、values是计算生成的遍历结构！
* */