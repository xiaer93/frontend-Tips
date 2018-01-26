/*
	设计模式---单例设计模式
	- 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
	- 创建实例时，需要进行判断。如果实例不存在则新建，否则直接返回！
	- 应用：模块间的通信、系统中某个类的实例只能有一个（多台电脑控制一台打印机）、命名空间、静态变量
	- 注意this的环境、注意闭包容易造成内存泄漏（及时清除）、注意new继承的成本！
*/

//最简单的单例
var Singleton1={
	property:'hello world',
	method:function(){
		console.log('hello world');
	}
}
//升级版本单例
var  Singleton2=function(){
	var privateVar='hello world';
	function showPrivate(){
		console.log(privateVar);
	}
	
	return {
		publicMethod:function(){
			showPrivate();
		},
		publicProperty:'hello world'
	}
};
//其他实现.必须通过new创建实例！
//--1/对实例进行判断；2/重写构造函数
function Singleton3(){
	/*
	//非闭包，需要通过Singleton3.instance变量访问！
	if(instance){
		return instance;
	}
	*/
	
	var instance=this;
	this.hi='hello';
	
	//重写构造函数
	Singleton3=function(){
		return instance;
	}
}
//可拓展属性的单例
function Singleton4(){
	var instance;
	//重写构造函数
	Singleton4=function (){
		return instance;
	}
	Singleton4.prototype=this;
	instance=new Singleton4();
	
	instance.constructor=Singleton4;
	
	instance.hi='hello';
	
	return instance;
}
var un4=new Singleton4();
var un4cp=new Singleton4();
Singleton4.prototype.nothing=true;



//标准版本单例
var Singleton=(function(){
	var instance;
	function _init(){
		return {
			publicMethod:function(){
				console.log('hello');
			},
			publicProperty:'world'
		}
	}
	
	return {
		getInstance:function(){
			//判断是否已经有这个单例，如果有则返回，如果没有则创建。（返回的对象为访问点！）
			if(!instance){
				instance=_init();
			}
			return instance;
		}
	}
})();

console.log(Singleton);



/*
	单例应用：模块间的通信！
*/
var xiaoWang=(function(){
	var door;
	
	var setDoor=function(msg){
		this.doorName=msg;
	};
	
	var obj={
		sendMsg:function(msg){
			if(!door){
				//door指向getDoor创建的对象，对象储存doorName共有属性！
				door=new setDoor(msg);
			}
			return door;
		},
		getHello:function(){
			console.log('hello world');
		}
	};
	
	return obj;
	
})();

var xiaohong=(function(){
	var obj={
		callWang:function(msg){
			var xw=xiaoWang.sendMsg(msg);
			console.log(xw.doorName);
			
			xw=null;
			xiaoWang.getHello();
		}
	};
	
	return obj;
})();

xiaohong.callWang('didi');
xiaohong.callWang('abc');

/*
	命名空间和模块管理
*/
var util={
	ajax:{
		getJson:function(){
			console.log(json);
		}
	},
	animation:{
		
	}
}

/*
	静态变量
*/
var Conf=(function(){
	var conf={
		MAX_NUM:100,
		MIN_NUM:0
	};
	return {
		get:function(name){
			return conf[name]?conf[name]:undefined;
		}
	}
})();

/*
	惰性单例
	- 加载即运行
	- 使用时运行
*/
//加载即运行
var lazySingle1=(function(){
	return {
		msg:'hello world'
	}
})();
//运行时创建
var lazySingle2=(function(){
	var instance=null;
	function Single(msg){
		this.msg=msg;
	}
	//通过闭包存储instance，还可以同lazySingle2.instance存储！
	return function(msg){
		if(!instance){
			instance=new Single(msg);
		}
		return instance;
	}
})();