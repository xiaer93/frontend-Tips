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

//对象内部立即执行函数，this指向window
var myObj={
	foo:'bar',
	func:function(){
		var self=this;
		console.log(this.foo,self.foo);
		(function(){
			console.log(this.foo,self.foo);//this指向window。函数的执行环境为window！定义环境为myObj！
		})()
	}
};
myObj.func();

//使用变量作为对象的值，为浅拷贝。！！对象为引用，基本量为拷贝
function test(){
	var n=666;
	function add(){
		console.log(n++);
	}
	return {n:n,add:add};
}
var t1=test();
var t2=test();
console.log(t1.add(),t1.add(),t1.n,t2.add());//t1和t2的闭包变量n，是在两个不同作用域中创建的！

//html5拖放事件

