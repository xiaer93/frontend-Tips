/* *
 * Created by winack on 2018/3/5 
 */
/*
* 函数的拓展
* */

//支持参数设置默认值
function log(x,y='world') {
    console.log(x,y);
}
log('hello ');//hello  world
log('hello ','china');//hello  china

//函数内部不能声明同名变量（与参数同名）
//函数参数变量是惰性求值
let p=99;
function foo(x=p+1) {
    console.log(x);
}
foo();//100
p=100;
foo();//101

//函数参数可以与解构联合使用！
//如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
function bar(x=1,y) {
    console.log(x,y);
}
bar(1);//1 undefined

//一旦参数设置了默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。
var x2 = 1;
function f(x2, y = x2) {
    console.log(y);
}
f(2); // 2

let x3 = 1;
function f(y = x3) {
    let x3 = 2;
    console.log(y);
}
f(); // 1

//利用默认形参，可以实现指定某个参数不能省略
function throwIfMissing() {
    throw new Error('Missing parameter');
}

function yy(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
}
//yy();

//新增rest参数，用于获取函数的多余参数
function sum(...values) {
    let s = 0;
    for (let val of values) {
        s += val;
    }
    console.log(s)
}
sum(2,5,3);// 10

//只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
//新增name属性，返回函数的函数名

//新增箭头函数
var sum1=(a,b)=>a+b;
var sum2=(a,b)=>{return a+b;};
var sum3=function (a,b) {
    return a+b;
};
//如果箭头函数不需要返回值
let fn = () => void doesNotReturn();

//箭头函数可以混用解构
let fulla=({first,last})=>first+' '+last;
let fullb=function (person) {
    return person.first+' '+person.last;
};
//箭头函数的注意点
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);//this指向Timer
    // 普通函数
    setInterval(function () {
        this.s2++;//this指向window
    }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
//箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）
function foo3() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}
var f3 = foo3.call({id: 1});
var t1 = f3.call({id: 2})()(); // id: 1
var t2 = f3().call({id: 3})(); // id: 1
var t3 = f3()().call({id: 4}); // id: 1

//尾调用优化
//函数调用栈，如果没有使用到外层函数数据，则进行优化！
function f6(x){
    return g6(x);//最后一步调用函数g6，并返回！
}

function Fibonacci1 (n) {
    if ( n <= 1 ) {return 1};
    return Fibonacci1(n - 1) + Fibonacci1(n - 2);
}
Fibonacci1(10); // 89
//Fibonacci1(100); // 堆栈溢出
//Fibonacci1(500); // 堆栈溢出
//尾递归优化，将所有用到的数据转为参数传入!
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
    if( n <= 1 ) {return ac2}
    return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100); // 573147844013817200000
Fibonacci2(1000); // 7.0330367711422765e+208
Fibonacci2(10000); // Infinity


// func.arguments：返回调用时函数的参数。
// func.caller：返回调用当前函数的那个函数。
//尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

//尾递归优化，将计算量转为空间，进行优化！


/*
* 1. 支持默认参数值功能，支持与解构同时运用！
* 2. 支持rest参数，用于获取多余的参数
* 3. 新增箭头函数，箭头函数的this固化为定义时的环境！
* 4. 对尾调用函数进行优化，对递归函数进行优化非常有用！a.以参数形式传入；b.以空间换速度！
* */