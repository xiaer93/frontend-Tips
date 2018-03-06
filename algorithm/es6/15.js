/* *
 * Created by winack on 2018/3/6 
 */
/*
* Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
* 执行 Generator 函数会返回一个遍历器对象
* Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
* */

//声明Generator函数
{
    function* helloGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
    }
    let hw=helloGenerator();
    console.log(hw.next());//{value: "hello", done: false}
    console.log(hw.next());//{value: "world", done: false}
    console.log(hw.next());//{value: "ending", done: true}
}
//yield只能用在Generator函数中；还可以作为函数参数、可以作为表达式一部分！
{
    function *demo() {
        console.log('hello',(yield ));
        console.log('world',(yield 1314));
    }
    let d=demo();
    console.log(d.next());//hello undefined
    console.log(d.next());//{value: 1314, done: false}..world没有输出？？？
}

//任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
{
    let myIterator={};
    myIterator[Symbol.iterator]=function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    console.log([...myIterator]);//[1,2,3]
}
{
    //Generator函数生成一个遍历对象，该遍历对象自身也有iterator接口，调用返回自身！
    function* gen(){
        // some code
    }
    let g = gen();
    console.log(g[Symbol.iterator]() === g);//true
}

//yield默认返回值为undefined，可以通过next方法向Yield传递值！
{
    //由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
    function* data() {
        console.log('Start');
        console.log(`1.${yield }`);
        console.log(`2.${yield }`);
        return 'result';
    }
    let g=data();
    console.log(g.next());//start   {value: undefined, done: false}
    console.log(g.next('a'));//1.a  {value: undefined, done: false}
    console.log(g.next('b'));//2.b  {value: "result", done: true}
}

//除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。
{
    //原生对象不具有iterator接口，通过Generator函数生成！
    function* objectEntries(obj) {
        let propKeys=Reflect.ownKeys(obj);
        for(let propKey of propKeys){
            yield [propKey,obj[propKey]];
        }
    }
    let jane={first:'Jane',last:'Doe'};
    for(let [key,value] of objectEntries(jane)){
        console.log(`${key}:${value}`);//
    }
}

//Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
//一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了！！！
{
    let g=function* () {
        try {
            yield 'abc';
        }catch (e){
            console.log('内部捕获',e);
        }
        yield  'cba';
    };
    let i=g();
    console.log(i.next());//{value: "abc", done: false}

    try{
        //第一次错误被内部捕获；第二次错误被外部捕获！
        //throw方法在内部被捕获以后，会附带执行下一条yield表达式。
        //函数体内抛出的错误可以被函数体外捕获！
        console.log(i.throw('a'));//内部捕获 a; {value: "cba", done: false}
        console.log(i.throw('b'));//外部捕获 b
    }catch (e){
        console.log('外部捕获',e);
    }
}

//Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
{
    function* geng() {
        yield 1;
        yield 2;
        yield 3;
    }
    let g = geng();
    g.next();        // { value: 1, done: false }
    g.return('foo'); // { value: "foo", done: true }
    g.next();       // { value: undefined, done: true }
}

//如果想在一个Generator函数中调用另外一个Generator函数，就必须使用yield*
{
    function* foo() {
        yield 1;
        yield 2
    }
    function *bar() {
        yield 3;
        yield* foo();//等同于部署了一个for...of语句
        yield 5;
    }
    let b=bar();
    console.log([...b]);//[3, 1, 2, 5]
}
//Yield*可以用于任何有iterator接口的数据结构
{
    function* bb() {
        yield* [1,2,3];
    }
    let b=bb();
    console.log(b.next());//{value: 1, done: false}
}

{
    function* foof() {
        yield 2;
        yield 3;
        return "foo";//return语句配合yield*使用！
    }
    function* barb() {
        yield 1;
        let v = yield* foof();
        console.log("v: " + v);
        yield 4;
    }

   let it = barb();

    console.log(it.next());
// {value: 1, done: false}
    console.log(it.next());
// {value: 2, done: false}
    console.log(it.next());
// {value: 3, done: false}
    console.log(it.next());
// "v: foo"
// {value: 4, done: false}
    console.log(it.next());
// {value: undefined, done: true}

    let t=foof();
    console.log(t.next());//{value: 2, done: false}
    console.log(t.next());//{value: 3, done: false}
    console.log(t.next());//{value: "foo", done: true}
}

//如果一个对象的属性是Generator函数
{
    let obj={
        *myGenerator(){
            //Generator函数！
        }
    }
}
//Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
//但是Generator函数中this.a的变量，其实例是无法获取到的！
//Generator函数无法使用new命令，否则报错！
{
    //特殊方法实现！
    function* F() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }
    let f = F.call(F.prototype);

    f.next();  // Object {value: 2, done: false}
    f.next();  // Object {value: 3, done: false}
    f.next();  // Object {value: undefined, done: true}
    console.log(f.a,f.b,f.c);//1,2,3
}

//通过Generator实现状态机。与es5相比较，少了闭包变量！
{
    let clock = function* () {
        while (true) {
            console.log('Tick!');
            yield;
            console.log('Tock!');
            yield;
        }
    };
}

//异步操作同步化表达！（改写回调函数，改为同步化表达）
//Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。
{
    function* main() {
        let result = yield request("http://some.url");
        let resp = JSON.parse(result);//回调函数部分，通过迭代器next方法调用！
        console.log(resp.value);
    }

    function request(url) {
        makeAjaxCall(url, function(response){
            it.next(response);//回调函数的同步化表达！
        });
    }
    let it = main();
    it.next();
}

//流程控制，依次执行多个程序！（只适用同步操作！）
//1. 回调函数；2、promise处理；3、Generator函数
{
    let steps = [step1Func, step2Func, step3Func];
    function* iterateSteps(steps){
        for (let i=0; i< steps.length; i++){
            let step = steps[i];
            yield step();
        }
    }
}

//部署iterator接口

//作为数据解构！

/*
* 1. Generator是异步编程解决方案，通过*标明。Generator不支持new命令，其实例继承了Proto原型，但是没有继承this.a属性！
* 2. next方法可以向Generator内部传入数据，第一个next的参数值无效！
* 3. throw方法可以通过实例在外部抛出错误，内部捕获错误！；Generator内部触发的错误，可以在外部捕获！（如果在外部被捕获，则Generator被认为运行结束！）
* 4. return方法可以终止Generator函数，并将参数作为最后的返回对象{value:参数,done:true}
* 5. 在Generator内部可以通过yiedl*调用其他Generator函数！
* */