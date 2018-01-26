/*
	设计模式-工厂模式
	- 该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。
	- 应用：1、对象的构建十分复杂；2、需要依赖具体环境创建不同实例；3、处理大量具有相同属性的小对象
	- 切勿滥用工厂模式，增加代码复杂度，同时增加测试难度！
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
var BallFactory=function(city){
	
	function Ball(){
	}
	Ball.prototype={
		constructor:Ball,
		city:city,
		//抽象类！如果子类未重定义次方法，则主动抛出错误！
		getName:function(){
			return new Error('抽象函数不能调用');
		}
	};

	var ball=new Ball();
	
	//篮球
	ball.basketball=function(){};
	ball.basketball.prototype.getName=function(){
		console.log('basketball');
	};
	//足球
	ball.football=function(){};
	ball.football.prototype.getName=function(){
		console.log('football');
	};
	//羽毛球
	ball.feather=function(){};
	
	
	//继承Ball，但是不能影响各自定义的方法呀？
	var inherit=function(sub,sup){
		var p=Object.create(sup.prototype);
		p.constructor=sub;
		//子类已经定义的函数要添加进来！
		for(var key in sub.prototype){
			p[key]=sub.prototype[key];
		}
		sub.prototype=p;
		
	};
	//初始化
	this.init=function(){

	};
	
	//工厂
	this.factory=function(type){
		if(!ball[type]){
			return;
		}
		inherit(ball[type],Ball);
		return new ball[type];
	}

};
var f=new BallFactory('wh');
var ft=f.factory('football');
ft.getName();

//参考链接：http://www.cnblogs.com/TomXu