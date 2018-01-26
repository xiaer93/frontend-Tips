'use strict'
/*
	面试试题大分析
*/

//函数和变量声明提升，new的运算优先级（执行构造函数，如果构造函数无返回对象则构建对象！），this作用域

function Foo() {
    getName = function () { alert (1); };//访问全局变量
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

//
function Foo() {
    var getName = function () { alert (1); };//定义私有变量
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();