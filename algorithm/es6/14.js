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