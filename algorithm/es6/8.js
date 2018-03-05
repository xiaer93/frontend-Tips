/* *
 * Created by winack on 2018/3/5 
 */
/*
* 对象的拓展
* */

//简洁的属性表示
const foo1='foo';
const bar1={foo1};
//等价于
const bar2={foo1:foo1};
console.log(bar1,bar2);

//方法简写
const obj1={
    method(){
        console.log('hello');
    }
};
const obj2={
    method:function () {
        console.log('world');
    }
};

//应用
const car={
    _wheels:4,
    get wheels(){
        return this._wheels;
    },
    set wheels(value){
        this._wheels=value;
    }
};

//新增字面量对象定义方法
let propKey='foo';
let obj3={
    [propKey]:true,//方括号内可以放表达式
    [propKey+'2']:false
};
console.log(obj3[propKey]);//true

//对象的方法的name属性，返回方法名称！

//新增比较方法，Object.is()
//==会发生类型转换，===中NAN不等于自身（+0等于-0）
//Object.is类似与===，但是修正了上面不足
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true

//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
//如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
//至拷贝对象自身可枚举属性！
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
console.log(target);//{a:1, b:2, c:3}

//报错
//Object.assign(undefined); // 报错
//Object.assign(null); // 报错

//v1/v2/v3首先会转为对象，可枚举将被拷贝。否则忽略！
const v1 = 'abc';
const v2 = true;
const v3 = 10;
const obj4 = Object.assign({}, v1, v2, v3);
console.log(obj4); // { "0": "a", "1": "b", "2": "c" }

//Object.addign()。1.浅拷贝；2.同名属性替换；3.数组当作对象处理；4.取值函数的处理？
console.log(Object.assign([1, 2, 3], [4, 5]));

//常见用途
//为对象添加属性方法
let h2='hello';
let hi=()=>{console.log('world')};
let obj6={};
Object.assign(obj6,{h2,hi});
//合并多个对象
const merge = (...sources) => Object.assign({}, ...sources);
//为属性指定默认值！

//获取对象属性的描述信息
console.log(Object.getOwnPropertyDescriptor(obj6,'hi'));

//下面四个操作会忽略enumerable为false的属性。
// for...in循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：只串行化对象自身的可枚举的属性。
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

//对象的遍历
// （1）for...in
// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
// （2）Object.keys(obj)【兄弟方法：values、entries】
// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
// （3）Object.getOwnPropertyNames(obj)
// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
// （4）Object.getOwnPropertySymbols(obj)
// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
// （5）Reflect.ownKeys(obj)
// Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

//ES2017 引入了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象。
//1. object.assign无法正确拷贝get和set属性，通过上述方法解决！
const shallowMerge = (target, source) => Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));


//浏览器都有__proto__属性，通过Object.setPrototypeOf()，Object.getPrototypeOf()操作_proto_原型！

//引入super关键字，指向当前对象的原型对象。
//this指向当前对象！
const proto = {
    foo: 'hello'
};
const obj = {
    foo: 'world',
    find() {
        return super.foo;
    }
};
Object.setPrototypeOf(obj, proto);//向obj的原型拷贝属性！
console.log(obj.find()); // "hello"
console.log(obj);

//对象的解构运算符。解构z必须是最后一项！
//let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
//console.log(x,y,z);//

//对象的拓展运算符
let a={x:3,y:4};
//let aClone = { ...a };
// 等同于
//let aClone = Object.assign({}, a);
//完整的拷贝一个对象，属性+原型！
// 写法二
const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj
);
// 写法三
const clone3 = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
);

/*
* 1. 字面量对象属性的简写，方法的简写。
* 2. Object.assign的拷贝！
* 3. 原型的操作函数Object.setPrototypeOf()，Object.getPrototypeOf()和super关键字！
* 4. 解构和拓展运算符！
* */