/*
	设计模式-js面向对象编程！
*/
'use strict';

//输入框数据检查
var v='12345678909';

//抽象方法
var check=function(pattern,value){
	if(pattern.test(value)){
		console.log('ok');
	}else{
		console.log('error');
	}
}

//1-原始函数
//数字检测
var checkNumber=function(value){
	check(/^\d+$/,value.toString());
};
//电话号码检测
var checkIphone=function(value){
	check(/^\d{11}$/,value.toString());
};

//上面方案在全局中注册了过多的变量，不利于维护！
//2-对象版本
var checkObject={
	checkNumber:checkNumber,
	checkIphone:checkIphone
}

//上面方案无法通过new生成实例对象，上面就为对象！。
//3-构造函数版本
function CheckValue1(){
	this.checkNumber=checkNumber,
	this.checkIphone=checkIphone
}
var c3=new CheckValue1();

//上面方案无法共享，每个实例都创建了一个独有的函数！
//4-定义在原型上公有方法和属性！
function CheckValue2(){
	//。。。
}
CheckValue2.prototype={
	constructor:CheckValue2,
	checkNumber:checkNumber,
	checkIphone:checkIphone
};

//上面方案不支持链式调用，通过return返回this实现链式！
//5-链式调用版本
function CheckValue3(){}
//类函数默认会创建Prototype，即是不进行下述操作！
CheckValue3.prototype={
	constructor:CheckValue3,
	checkNumber:function(value){
		//装饰者模式
		checkNumber(value);
		return this;
	},
	checkIphone:function(value){
		checkIphone(value);
		return this;
	}
};
//new的过程：1、var c3={}；2、c3.__proto__=CheckValue3.prototype；3、CheckValue3.call(c3)。
var c3=new CheckValue3();
c3.checkNumber(v).checkIphone(v);

/*
	技巧--给类添加方法函数
	- 需求：1、可以给原型和实例添加方法；2、支持链式调用；3、支持同时添加多个方法！（多态）
	- 使用形式：》》》构造函数.addMethod('show':function(msg){console.log(msg)}).addMethod...
*/

//CheckValue3继承方法
Function.prototype.addMethod=function(fnName,fn,flag){
	flag=(flag===undefined)?false:flag;
	if(flag){
		//flag为true时添加CheckValue3静态方法！；
		this[fnName]=fn;
	}else{
		//flag为false时添加为原型公有方法；
		this.prototype[fnName]=fn;
	}
	return this;
};
CheckValue3.addMethod('showp',function(){console.log('Prototype')}).addMethod('showi',function(){console.log('Instance')},true);
var c4=new CheckValue3();
//c3和c4均含有原型公有方法。当且仅当checkValue3.prototype={}时，才遵循原型修改原则！

/*
	技巧--公有、私有、特有、静态方法和属性
*/
function Book(name,price){
	//私有属性
	var price=price;
	//私有方法
	var sellPrice=function(){
		return price*1.2;
	};
	
	//对象共有属性
	this.name=name;
	//对象特权方法
	this.getPrice=function(){
		return sellPrice();
	}
}
//对象静态属性
Book.isdn='123456789';
//对象静态方法
Book.getISDN=function(){
	return this.isdn;
};

//原型公有属性和方法
Book.prototype={
	constructor:Book,
	showName:function(){
		return this.name;
	}
};
var book1=new Book('js',99);

/*
	技巧--闭包的应用
*/
var getKey=(function(){
	//静态私有变量
	var keyIcon='key-';
	var index=0;
	return function(){
		return keyIcon+(index++);
	}
})();
//输出：key-0/key-1/key-2
console.log(getKey());
console.log(getKey());
console.log(getKey());

/*
	强制使用new，避免遗忘使用new操作符！
*/
function ForceNew(info){
	if(!(this instanceof ForceNew)){
		return new ForceNew(info);
	}
	this.info=info;
}
var f1=new ForceNew('a');
var f2=ForceNew('b');
console.log(f1.info,f2.info);

/*
	继承：
	- 类继承（new）》构造函数继承（call）》组合继承
	- 原型链继承》寄生继承》寄生组合继承
	- 共享原型继承（B4.prototype=A.prototype）
	- 继承自多个对象！
*/
//原型继承函数，等价于es5的object.create函数
function inherit(obj){
	function F(){};
	F.prototype=obj;
	return new F();
}
//寄生继承函数。将原型继承再次封装
function inheritPara(sub,sup){
	var p=inherit(sup.prototype);
	p.constructor=sub;
	sub.prototype=p;
}

//原始基类A
function A(){
	var inner='hello';
	this.id='objA';
}
A.prototype={
	constructor:A,
	getID:function(){
		return this.id;
	}
}
//组合继承
function B1(){
	A.call(this);
}
B1.prototype=new A();
B1.prototype.constructor=B1;//修正B1的constructor
B1.prototype.one=function(){
	console.log('one');
}
//原型组合继承
function B2(){
	A.call(this);
}
B2.prototype=inherit(A);
B2.prototype.constructor=B2;
B2.prototype.two=function(){
	console.log('two');
}
//寄生组合继承
function B3(){
	A.call(this);
}
inheritPara(B3,A);
B3.prototype.thr=function(){
	console.log('three');
}

//B1/B2/B3各个原型互不影响！各自可以添加独有的原型方法！
var o=new A();
//缺点：存在多个id属性！（A被执行了2次！）
var o1=new B1();
//
var o2=new B2();
//优点：A只被执行1次
var o3=new B3();

//共享原型的继承。几乎与A等价了！
function B4(){
	A.call(this);
}
B4.prototype=A.prototype;
B4.prototype.fou=function(){
	console.log('four');
}
var o4=new B4();

//继承自多个对象！(多重继承)
//mix也可以注册在Object.prototype上！
function mix(){
	//arguments的应用！
	var dest=arguments[0];
	var arg;
	for(var i=1,len=arguments.length;i<len;++i){
		arg=arguments[i];
		for(var property in arg){
			dest[property]=arg[property];
		}
	}
	return dest;
}
var m1={
	name:'m1'
}
var m2={
	msg:'hello m2'
}
var m={};
mix(m,m1,m2);
//默认参数混合
function extend(options){
	var op={
		name:'extend',
		info:'hello'
	};
	for(var key in op){
		op[key]=options[key] || op[key];
	}
	return op;
}
var option={
	info:'world'
};
var e=extend(option);
//深度复制
function deepCopy(src,dest){
	
	var _get=function(obj){
		return ((Object.prototype.toString.call(obj)==='[object Array]')?[]:{});
	}
	
	dest=dest || _get(src);
	for(var key in src){
		if(!src.hasOwnProperty(key)){
			continue;
		}
		if(typeof src[key]==='object'){
			dest[key]=_get(src[key]);
			deepCopy(src[key],dest[key]);
		}else{
			dest[key]=src[key];
		}
	}
	return dest;
}
var d=[1,[2]];
var dc=deepCopy(d);
dc[1][0]=3;