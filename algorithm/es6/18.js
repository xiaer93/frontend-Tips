/* *
 * Created by winack on 2018/3/6 
 */
//es6引入类Class的概念，使创建类更接近传统语言！
function Point1(x,y) {
    this.x=x;
    this.y=y;
}
Point1.prototype.toString=function () {
    return `(${this.x},${this.y})`;
};
//新的class声明
//类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这点与es5不相同！
class Point2{
    //constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    //原型上的方法
    toString(){
        return `(${this.x},${this.y})`;
    }
}
//类可以使用表达式形式
const MyClass=class {
    constructor(){}
    getClassName(){
        return MyClass.name;
    }
};
console.log(new MyClass().getClassName());

//类不存在变量提升（hoist），这一点与 ES5 完全不同。
//只能先声明，后使用！否则报错！

//私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。
//1. 通过命名区别；2、利用Symbol的唯一性！

//类的方法内部this指向实例，但是一旦方法提出来，将指向运行环境！
//解决方案：1、通过bind显示绑定，2、通过使用箭头函数！
class Logger {
    constructor(){
        //this.printName = this.printName.bind(this);
    }
    print(text) {
        console.log(text);
    }
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }
}
const logger = new Logger();
const { printName } = logger;
//printName(); // TypeError: Cannot read property 'print' of undefined

//class声明中可以使用get和set
class CustomHTML{
    constructor(ele){
        this.ele=ele;
    }
    get html(){
        return this.ele.innerHTML;
    }
    set html(value){
        this.ele.innerHTML=value;
    }
}

//类的Generator方法
class Foo{
    constructor(...args){
        this.args=args;
    }
    *[Symbol.iterator](){
        for(let val of this.args){
            yield val;
        }
    }
}
for (let x of new Foo('hello', 'world')) {
    console.log(x);//hello world!
}

//如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo2{
    constructor(){}
    static hi(){
        console.log('hi');
    }
}
Foo2.hi();//静态方法，直接在类上调用，而不是实例。如果静态方法中使用到this，this指向类！

class Bar extends Foo2{
    static hiCha(){
        console.log('Bar');
        super.hi();
    }
}
Bar.hi();//父类的静态方法可以被子类继承，也可以通过super指针调用！
//在class内部，借助static可以声明静态方法和属性，但是声明方式有点不同！
//若想声明类静态属性，还可以通过下述方法
Bar.msg='abc';//静态属性

//类的实例的属性有2中定义方式，1、通过constructor；2、直接在class中声明
/*
class InstanceClass{
    myProp = 20;               //实例的属性
    static myStaticProp = 42;//类的静态属性
    constructor(){
        console.log(this.myProp);
    }
}
new InstanceClass();//20*/

//new命令新增target属性。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
//class必须通过new指令调用！
//子类继承父类时，new.target会返回子类。
function Person(name) {
    if(new.target===Person){
        this.name=name;
    }else{
        throw new Error('必须使用new命令生成实例！')
    }
}
//var notAPerson = Person.call(person, '张三');  // 报错

class Shape {
    constructor() {
        //必须通过子类继承使用，不能直接使用！
        if (new.target === Shape) {
            throw new Error('本类不能实例化');
        }
    }
}
//类的继承！
class Rectangle extends Shape {
    constructor(length, width) {
        super();//子类必须调用super方法，否则会报错！
                //super还可以作为对象时，在普通方法中，指向父类的原型对象！（指向原型！通过super调用父类的方法时，方法内部的this指向子类）。如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
        // ...
    }
}

//子类__proto__属性
class A {
}

class B extends A {
}
// B.__proto__ === A // true
// B.prototype.__proto__ === A.prototype // true

class C extends null {
}

// C.__proto__ === Function.prototype // true
// C.prototype.__proto__ === undefined // true

class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    hi(){
        console.log('hi');
    }
}
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);
        this.color=color;
    }
    hello(){
        console.log('hello')
    }
}
let p1 = new Point(2, 3);
let  p2 = new ColorPoint(2, 3, 'red');
console.log(p1,p2);
// p2.__proto__ === p1.__proto__ // false
// p2.__proto__.__proto__ === p1.__proto__ // true

//原生构造函数，es5中原生构造函数是无法继承的，es6中允许继承原生构造函数定义子类
// Boolean()
// Number()
// String()
// Array()
// Date()
// Function()
// RegExp()
// Error()
// Object()
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

//将多个类的接口混合为一个类
function mix(...mixins) {
    class Mix {}

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝实例属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if ( key !== "constructor"
            && key !== "prototype"
            && key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}