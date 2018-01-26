/*this指针*/
function A(){
	if(!(this instanceof A))return new A();
	
	var show=function(){
		console.log(this)
	};
	this.log=function(){
		console.log(this)
	};
	show();
}

d=A();//输出window，返回A对象
d.log();//输出A对象！

d=new A();//输出window，返回A对象
d.log();//输出A对象！

/*声明提升，new和()比较！*/

function Foo() {
    getName = function () { alert (1); };
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
