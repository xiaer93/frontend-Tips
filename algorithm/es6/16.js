/* *
 * Created by winack on 2018/3/6 
 */
let thunkify = require('thunkify');
/*
* 异步编程对 JavaScript 语言太重要。Javascript 语言的执行环境是“单线程”的，如果没有异步编程，根本没法用，非卡死不可。
* es6诞生之前，实现异步编程的方法：1、回调函数；2、事件监听；3、发布/订阅；4、promise对象。
* Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。
* */

//异步任务的传统实现
function getData(url,callback) {
    //任务一：获取数据
    console.log('任务一：获取数据');
    setTimeout(function () {
        callback(null,url);
    },2000)
}
//通过回调函数
getData('传统方式实现异步任务',function (err,data) {
    //任务二：处理数据
    console.log('任务二：处理数据');
    if(err) throw err;
    console.log(data);
});
console.log('我是打酱油的代码！');


//通过promise对象
let getDataP=function (url) {
    return new Promise(function (resolve,reject) {
        //任务一：获取数据
        console.log('任务1：获取数据');
        setTimeout(function () {
            resolve(url);
        },4000)
    });
};
getDataP('传统Promise实现异步任务').then(function (data) {
    //任务二：处理数据
    console.log('任务2：处理数据');
    console.log(data);
});

//回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。
//Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。

//Generator的暂停执行和恢复执行，数据交换和错误处理，是他能封装异步任务的根本原因！
{
    function* gen(x){
        let y;
        try{
            y = yield x + 2;
        }catch (e){
            console.log(e);
        }
        return y;
    }

    let g = gen(1);
    g.next(); // { value: 3, done: false }
    //g.next(2); // { value: 2, done: true }
    g.throw('出错啦！');
}
//Generator执行异步任务封装
function readFile(url) {
    return new Promise(function (resolve,reject) {
        setTimeout(function () {
            resolve(url);
        },2000)
    })
}
{
    function* geng() {
        let url='Generator封装异步任务';
        let result=yield readFile(url);//任务1：读取数据
        console.log(result);//任务2：处理数据
    }
    let g=geng();
    let result=g.next();
    result.value.then(function (data) {
        console.log('Generator:第1次数据处理');
        return data+'>第1次数据处理';//promise的链式调用返回的promise状态与then的返回值有关系！
    }).then(function (data) {
        console.log('Generator:将处理完成的数据返回');
        g.next(data);//数据处理完成，通过next将数据返回！
    })
}

//thunk方案！
//函数参数处理策略分2种：1、传值调用（进入函数体前先进行计算）；2、传名调用
{
    let x = 5;
    let thunk = function () {
        return x + 5
    };

    function f1(m) {
        return m * 2;
    }

    function f2(m) {
        return m() * 2;
    }

    console.log(f1(x + 5));//20   传值策略
    console.log(f2(thunk));//20 传名策略

    function print(msg, callback) {
        callback.call(null, msg);
    }

    function TunkMsg(fn) {
        return function (...args) {
            return function (callback) {
                return fn.call(null, ...args, callback);
            }
        }
    }
    let tm = TunkMsg(print);
    tm('hello')(function (msg) {
        console.log(msg, ' world');
    })
}
{
    //thunk通过回调函数实现的异步任务！
    function readFileCB(url,callback) {
        setTimeout(function () {
            callback(url);
        },2000)
    }
    let readFileTunk=thunkify(readFileCB);
    function* tunkGen() {
        console.log(yield readFileTunk('Tunk:文件1'));
        console.log(yield readFileTunk('Tunk:文件2'));
        console.log(yield readFileTunk('Tunk:文件3'));
    }
    function run(fn) {
        let gen=fn();
        function next(data) {
            let result=gen.next(data);//回调函数，执行下一个异步任务！
            if(result.done){
                return;
            }
            result.value(next);
        }
        next();
    }
    run(tunkGen);
}

//co模块！
//co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，详见后文的例子。