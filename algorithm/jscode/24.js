/*
	设计模式-工厂模式
	- 该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。
	- 切勿滥用工厂模式，增加代码复杂度，同时增加测试难度！
	- 工厂模式是创建型的设计模式，它接受指令，创建出符合要求的实例；它主要解决的是资源的统一分发，将对象的创建完全独立出来，让对象的创建和具体的使用客户无关。主要应用在多数据库选择，类库文件加载等。 
	- 策略模式是为了解决的是策略的切换与扩展，更简洁的说是定义策略族，分别封装起来，让他们之间可以相互替换，策略模式让策略的变化独立于使用策略的客户。
	- 工厂模式相当于点餐，策略模式相当于自助餐（菜、烤架、配料已经准备，具体菜名温度配料细节由用户定义！）
*/
//将构造函数模式改为工厂模式
var Person=(function(){
	function Person(name,age){
		this.name=name;
		this.age=age;
	}
	return function(name,age){
		return new Person(name,age);
	}
})();

//简单工厂模式
var factoryManager={};
factoryManager.createProductA=function(){
	console.log('productA');
}
factoryManager.createProductB=function(){
	console.log('productB');
}
factoryManager.createProductC=function(){
	console.log('productC');
}

factoryManager.factory=function(type){
	if(factoryManager[type]){
		factoryManager[type]();
	}
}

//抽象工厂模式
//向页面插入内容，可能为文字、链接、图片。
var page=page || {};
page.dom=page.dom || {};

//插入文字节点
page.dom.Text=function(){
	//接口统一
	this.insert=function(where){
		var t=document.createTextNode(this.url);
		where.appendChild(t);
	}
};
//插入链接
page.dom.Link=function(){
	this.insert=function(where){
		var a=document.createElement('a');
		a.href=this.url;
		a.appendChild(document.createTextNode(this.url));
		where.appendChild(a);
	}
};
//插入图片
page.dom.Image=function(){
	this.insert=function(where){
		var img=document.createElement('img');
		img.src=this.url;
		where.appendChild(img);
	}
}
//工厂
page.dom.factory=function(type){
	if(page.dom[type]){
		return new page.dom[type];
	}
}
var im=page.dom.factory('Image');
im.url='https://images.cnblogs.com/cnblogs_com/TomXu/339203/o_jsdp.jpg';
im.insert(document.body);

//抽象工厂模式
var BallFactory=(function(){
	//产品球类
	function Ball(){
	}
	Ball.prototype={
		constructor:Ball,
		//抽象类！如果子类未重定义次方法，则主动抛出错误！
		getName:function(){
			return new Error('抽象函数不能调用');
		},
		what:function(){
			console.log(this.type);
		}
	};
	
	//篮球
	Ball.basketball=function(){
		this.type='basketball';
	};
	inherit(Ball.basketball,Ball);
	Ball.basketball.prototype.getName=function(){
		console.log('basketball');
	};
	//足球
	Ball.football=function(){
		this.type='football'
	};
	inherit(Ball.football,Ball);
	Ball.football.prototype.getName=function(){
		console.log('football');
	};
	//羽毛球
	Ball.feather=function(){
		this.type='feather';
	};
	inherit(Ball.feather,Ball);
	
	
	//继承Ball，但是不能影响各自定义的方法呀？
	function inherit(sub,sup){
		var p=Object.create(sup.prototype);
		p.constructor=sub;
		sub.prototype=p;
	};
	//初始化
	this.init=function(){

	};
	
	//工厂
	return function(type){
		if(!Ball[type]){
			return;
		}
		return new Ball[type]();
	}
})();
var ft=BallFactory('football');
ft.getName();
ft.what();

//抽象工厂可以形成多层次结构！

//参考链接：http://www.cnblogs.com/TomXu