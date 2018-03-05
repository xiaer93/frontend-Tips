/* *
 * Created by winack on 2018/3/4 
 */
/*
* 1.新增let和const命令
* */
var a1=[];
for(var i=0;i<3;i++){
    a1[i]=function () {
        console.log(i);
    }
}
a1[2]();//输出为3，输出始终为变量i！

//块级变量j，所以会有不同！
var a2=[];
for(let j=0;j<3;j++){
    a2[j]=function () {
        console.log(j);
    }
}
a2[2]();//输出为2，输出为不同的局部变量j！

//var声明的变量存在“变量提升”，而let、const不存在！（变量提升，即可以先使用后声明！）
console.log(b1);//输出为undefined
var b1='abc';

console.log(b2);//ReferenceError: b2 is not defined
let b2='bac';

//ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
{
    console.log(b1);//ReferenceError: b1 is not defined
    let b1='cab';
}
//y暂未声明，所以暂时不能使用变量y
function bar(x = y, y = 2) {
    console.log([x,y]);
}
//let和const中，未声明的变量不能使用！
var F1=F1 || {};
let F2=F2 || {};//ReferenceError: F2 is not defined

//同一个作用域内，let不允许重复声明变量
{
    let a=1;
    //let a=2;//SyntaxError: Identifier 'a' has already been declared
}
//为什么需要块级作用域？如for循环，循环变量结束后不会消失！导致泄漏！
//在块级作用域中声明函数，es6类似于let变量，但是函数声明还是会被提升！

//const声明一个只读的常量。一旦声明，常量的值就不能改变。
//const作用域与let相同，为块级作用域！
const PI=3.14;
//PI=3;// "PI" is read-only

//const指向对象时，只保证指向的地址不变
const mock={};
mock.a=1;//可以添加属性！
mock.b=2;
//mock={c:3};//"mock" is read-only

//let和const声明的变量将不再与window绑定！
var mocha1=1;
console.log(window.mocha1);

let mocha2=2;
console.log(window.mocha2);//undefined

/*
* 1. let和const声明的变量为块级变量，并且不会发生变量声明提升。因此，在es6中，块级变量存在死区概念！
* 2. const声明常量，当为对象时，指示所指向的对象地址不变，但是依旧可以添加属性！
* 3. let和const声明的变量与window解绑，不再可以通过window对象读取信息！
* 4. for循环中，循环体中比较特殊，let声明的变量，可以为独立的块级作用域。
* */


