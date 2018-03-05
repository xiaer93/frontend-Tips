/* *
 * Created by winack on 2018/3/5 
 */
/*
* symbol的引入。
* 对象的属性名均为字符串，容易冲突。引入symbol，从根本上防止属性名冲突！
* */
//symbol是一种类似字符串的数据类型，不是对象，不能添加属性！
let s=Symbol();
console.log(s);//Symbol()

let s1=Symbol('foo');
let s2=Symbol('bar');
console.log(s1,s2.toString());//Symbol(foo) "Symbol(bar)"

//symbol的参数只是描述作用
let s3=Symbol('foo');
console.log(s1===s3);//false

//symbol值不能与其他数据类型进行计算，可以显示的转为字符串！可以转为布尔值，但是不能转为数值！

//作为属性名的symbol（不能通过点号设置！）
let mySym=Symbol('key');
let a={};
a[mySym]='hello world';
console.log(a[mySym]);
//symbol还可以定义一组常量，每个都是独一无二！

//魔术字符串
const shapeType = {
    triangle: Symbol('Triangle')
};

function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}
getArea(shapeType.triangle, { width: 100, height: 100 });

//Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
let obj={
    [Symbol('key')]:1,
    enum:2
};
console.log(Object.getOwnPropertySymbols(obj));//[Symbol(key)]
console.log(Reflect.ownKeys(obj));//["enum", Symbol(key)]

//有时，我们希望重新使用同一个 Symbol 值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
//symbol.for是在全局环境下登记
let s4 = Symbol.for('f');
let s5 = Symbol.for('f');
console.log(s4===s5);//true

//keyfor返回登记的名字
let s6 = Symbol.for("f");
console.log(Symbol.keyFor(s6)); // "foo"
let s7 = Symbol("f");
console.log(Symbol.keyFor(s7)); // undefined

//单例模式指的是调用一个类，任何时候返回的都是同一个实例。
//通过symbol实现单例。当其他文件导入后，无法通过修改global[FOO_KEY]对象影响单例！
/*
const FOO_KEY = Symbol.for('foo');
function A() {
    this.foo = 'hello';
}
if (!global[FOO_KEY]) {
    global[FOO_KEY] = new A();
}
module.exports = global[FOO_KEY];*/


//es6还提供了11个内置的 Symbol 值

/*
* 1. 对象属性名有可能冲突，从而引入symbol
* 2. symbol不是对象，只能转为布尔值，不能参与计算！
* 3. symbol独一无二，可以有Symbol.for和Symbol.keyfor方法！
* 4. es6内置了11个symbol值！
* */