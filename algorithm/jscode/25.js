/*
	设计模式-装饰者模式
	- 装饰者提供比继承更有弹性的替代方案。 装饰者用用于包装同接口的对象，不仅允许你向方法添加行为，而且还可以将方法设置成原始对象调用（???）。
	- 装饰者用于通过重载方法的形式添加新功能，该模式可以在被装饰者前面或者后面加上自己的行为以达到特定的目的。
	
	代理模式强调一种关系（Proxy与它的实体之间的关系），这种关系可以静态的表达，也就是说，这种关系在一开始就可以被确定。而装饰者模式用于一开始不能确定对象的全部功能时。代理模式通常只有一层代理——本体的引用，而装饰者模式经常会形成一条长长的装饰链
*/

//0-装饰者模式是什么？
var homeCity={
	name:'wuhan',
	address:'武汉市'
};
//装饰者，homecity添加更具体的地理信息！
homeCity.address=homeCity.address+'新洲区';

//飞机武器---装饰者模式的应用！
//1-造衣架飞机发射子弹
function Plane(){}
Plane.prototype={
	constructor:Plane,
	fire:function(){
		console.log('发射子弹');
	}
}
//2-飞机换代，还可以发射导弹
function Plane2(plane){
	this.plane=plane;
}
Plane2.prototype={
	constructor:Plane2,
	fire:function(){
		this.plane.fire();
		console.log('发射导弹');
	}
}
//3-老式飞机加配导弹发射器！
planeOld={
	fire:function(){
		console.log('发射子弹');
	}
}
//新式武器
function missileDecorator(){
	console.log('发射导弹');
}
function atomDecorator(){
    console.log( '发射原子弹' );
}
//挂载武器
var oldFire=planeOld.fire;
var planeNew={};
planeNew.fire=function(){
	oldFire();
	missileDecorator();
}
//4-将挂载系统抽象出来研发
function aopAfter(oldFn,newFn){
	return function(){
		oldFn.apply(this,arguments);
		newFn.apply(this,arguments);
	}
}
//飞机实例
//接口一致都通过fire开火！它们对使用该对象的客户来说是透明的？？？
var p1=new Plane();		//第一代飞机
var p2=new Plane2(p1); //第二代飞机
var p1n=planeNew;		//第一代飞机升级版（武器系统升级）
p1.fire();console.log('---------');
p2.fire();console.log('---------');
p1n.fire();console.log('---------');
//通用武器挂载系统-挂载原子弹
p1n.fire=aopAfter(p1n.fire,atomDecorator);
p1n.fire();console.log('---------');

console.log('\n');

//问题：在进行代码维护时，若需要在window.onload中添加函数：alert(1);?
//1-直接添加代码，但是onload被老客户使用了吗？
window.onload=function(){
	//alert(1);
}
//2-通过装饰者模式
var _getElementById=document.getElementById;
document.getElementById=function(){
	alert(1);
	//此地的_getElementById执行环境为window，但是在函数内部this的期望是document！
	//return _getElementById;
	return _getElementById.applt(document,arguments);//修正后！
}
//3-提炼方法封装起来
Function.prototype.after=function(fn){
	var _self=this;
	return function(){
		var ret=_self.apply(this,arguments);
		fn.apply(this,arguments);
		return ret;//返回原始函数的执行结果
	}
};
Function.prototype.before=function(fn){
	var _self=this;
	return function(){
		fn.apply(this,arguments);
		var ret=_self.apply(this,arguments);
		return ret;
	}
};
//单击body时显示‘hello world’，同时上报数据！
var logger=(function(){
	var clickTime=0;
	return function(){
		console.log('你已经点击了',++clickTime,'次！');
	}
})();
var showLogin=function(){
	console.log('hello world!(这是一个浮层？)');
	//直接耦合在showLogin函数对象中？不符合单一功能原则！
	//logger();
};
showLogin=showLogin.after(logger);
document.body.onclick=showLogin;

console.log('\n');

//发起ajax之前，要求新增token请求！
var getToken=(function(){
	var sign='tk-';
	var id=0;
	return function(){
		return sign+(++id);
	}
})();
//请求ajax
function ajax(info){
	//info.token=getToken();又耦合了？
	for(var key in info){
		console.log(key,' - ',info[key]);
	}
}
//受到csrf攻击，请求一个token避免攻击
ajax=ajax.before(function(info){
	info.token=getToken();
});
ajax({name:'ajax',msg:'hello world'});

console.log('\n');

//表单验证应用装饰者模式拆分：验证数据和提交请求
var validata = function(){
    if ( username.value === '' ){
        alert ( '用户名不能为空' );
        return false;
    }
    if ( password.value === '' ){
        alert ( '密码不能为空' );
        return false;
    }
}
var formSubmit = function(){
	/*
	//不符合最少指示原则，要拆就拆到底？
	if(!validata()){
		return;
	}
	*/
	
    var param = {
        username: username.value,
        password: password.value
    }
    ajax( 'http://xx.com/login', param );
}
formSubmit = formSubmit.before( validata );

console.log('\n');

//给树添加叶子？
var tree={};
tree.decorate=function(){
	console.log('我是原始核心函数！！！');
};
//工厂模式+装饰者模式
tree.getDecorator=function(decoType){
	//将原型指向tree，从而可以运行原始函数！
	tree[decoType].prototype=this;
	//返回装饰器的实例！
	return new tree[decoType];
};
//装饰者-添加功能
tree.addDecorator=function(fn){
	var _decorate=this.decorate;
	this.decorate=function(){
		_decorate();
		fn();
	}
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
//给原始函数添加功能
tree.addDecorator(function(){
	console.log('我是原始装饰函数！！！');
});
var tr3=tree.getDecorator('BlueBalls');
tr3.decorate();

console.log('\n');

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

//参考链接：http://www.cnblogs.com/TomXu