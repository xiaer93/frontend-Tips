/* *
 * Created by winack on 2018/3/6 
 */
/*
* ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
* async 函数是什么？一句话，它就是 Generator 函数的语法糖。
* */
let fs={
    readFile:function (url,callback) {
        let err=null;
        setTimeout(function () {
            callback(err,url);
        },1000)
    }
};
const readFile=function (fileName) {
    return new Promise(function (resolve,reject) {
        fs.readFile(fileName,function (error,data) {
            resolve(data);
        })
    })
};
//Generator异步读取2个文件
{
    const gen=function* () {
        const f1=yield readFile('Generator:file1');
        const f2=yield readFile('Generator:file2');
        console.log(f1,f2);
    };
    //同步读取2个文件
    let g1=gen();
    while (true){
        let f1=g1.next();
        if(f1.done) break;
        f1.value.then(function (data) {
            console.log('同步：',data);
        });
    }
    //异步读取2个文件（文件1读取完成后，读取文件2）
    let g2=gen();
    let f2=g2.next();
    f2.value.then(function (data) {//异步：Generator:file1 异步：Generator:file2
        f2=g2.next('异步：'+data);
        f2.value.then(function (data) {
            f2=g2.next('异步：'+data);
        })
    })
}
//async函数对Generator的改进
{
    const asyncReadFile=async function () {
        const f1=await readFile('Async:file1');
        const f2=await readFile('Async:file2');
        console.log(f1,f2);
    };
    asyncReadFile();//Async:file1 Async:file2
}
//async函数内置执行器！不需要调用co模块！
//更好的语义化，async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
//更广的适用性。co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
//返回对象为promise对象，async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

//一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
{
    async function getStockPriceByName(name) {
        const symbol = await getStockSymbol(name);
        const stockPrice = await getStockPrice(symbol);
        return stockPrice;
    }

    getStockPriceByName('goog').then(function (result) {
        console.log(result);
    });
}

//async函数内部return语句返回到值，会成为then方法回调函数的参数
async function f() {
    return 'hello china';
}
f().then((v)=>console.log(v));
//async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

//async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
//await命令后面是一个 Promise 对象，如果不是，则会转为resolve的promise对象！
//await命令后面的 Promise 对象如果变为reject状态（promise对象内部抛出错误会影响状态），则reject的参数会被catch方法的回调函数接收到。并且整个async函数都会中断执行！！！
//如果想要异步操作失败不影响后方的，必须捕获错误。借助try..catch或者promise.catch捕获错误！
{
    async function ff() {
        await Promise.reject('出错了');
    }
    ff()
        .then(v => console.log(v))
        .catch(e => console.log(e))
// 出错了
}

//第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
//第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

//继发关系
// let foo = await getFoo();
// let bar = await getBar();

//同发关系
// // 写法一
// let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// // 写法二
// let fooPromise = getFoo();
// let barPromise = getBar();
// let foo = await fooPromise;
// let bar = await barPromise;

//第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。

//异步处理3兄弟： async 函数与 Promise、Generator 函数的比较。

{
    async function logInOrder(urls) {
        // 并发读取远程URL
        const textPromises = urls.map(async url => {
            const response = await fetch(url);
            return response.text();
        });

        // 按次序输出
        for (const textPromise of textPromises) {
            console.log(await textPromise);
        }
    }
}

//异步遍历Symbol.asyncIterator
/*
{
    //异步Generator函数！
    async function *createAsyncIterable(array) {
        for (let value of array){
            yield value;
        }
    }
    async function fff() {
        const asyncIterable = createAsyncIterable(['a', 'b']);
        const asyncIterator = asyncIterable[Symbol.asyncIterator]();
        console.log(await asyncIterator.next());
        // { value: 'a', done: false }
        console.log(await asyncIterator.next());
        // { value: 'b', done: false }
        console.log(await asyncIterator.next());
        // { value: undefined, done: true }
    }
    fff();
}*/
