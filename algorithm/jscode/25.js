/*
	设计模式-装饰者模式
	- 装饰者提供比继承更有弹性的替代方案。 装饰者用用于包装同接口的对象，不仅允许你向方法添加行为，而且还可以将方法设置成原始对象调用（例如装饰者的构造函数）。
	- 装饰者用于通过重载方法的形式添加新功能，该模式可以在被装饰者前面或者后面加上自己的行为以达到特定的目的。
*/
//装饰者模式-原理
function Computor(){
	this.cost=function(){
		return 100;
	}
}
function MacBook(pc){
	this.cost=function(){
		return pc.cost()+100;
	}
}

function HuaShuo(pc){
	this.cost=function(){
		return pc.cost()+200;
	}
}

var pc=new Computor();
var mb=new MacBook(pc);
console.log(mb.cost());

//装饰者模式-升级
function ConcreteClass(){
	//原始类的行为
	this.performTask=function(){
		console.log('do something.');
	}
}
function Decorator(decorated){
	//装饰器行为
	this.performTask=function(){
		decorated.preTask();
		decorated.performTask();
		decorated.postTask();
	}
}
//获取实例decorated的装饰器类
function CreateClass(decorated){
	/*通过this调用base方法，等价于new base(decorated)
    this.base = Decorator;
    this.base(decorated);
	*/
	//var base=new Decorator(decorated);this=base出错！
	
	//继承performTask方法！
	Decorator.call(this,decorated);
	
	//装饰类拓展的行为
	decorated.preTask=function(){
		console.log('Pre-calling...');
	};
	decorated.postTask=function(){
		console.log('Post-calling...');
	}
}

var concrete=new ConcreteClass();
var decorator=new CreateClass(concrete);
decorator.performTask();

//真实案例
var tree={};
tree.decorate=function(){
	console.log('我是原始核心函数！！！');
};
tree.getDecorator=function(decoType){
	//将原型指向tree，从而可以运行原始函数！
	tree[decoType].prototype=this;
	//返回装饰器的实例！
	return new tree[decoType];
};
tree.RedBalls=function(){
	this.decorate=function(){
		this.RedBalls.prototype.decorate();
		console.log('添加红叶子');
	}
};
tree.BlueBalls=function(){
	this.decorate=function(){
		this.BlueBalls.prototype.decorate();
		console.log('添加蓝叶子');
	}
}
var tr1=tree.getDecorator('RedBalls');
var tr2=tree.getDecorator('BlueBalls');

tr1.decorate();
tr2.decorate();



//参考链接：http://www.cnblogs.com/TomXu