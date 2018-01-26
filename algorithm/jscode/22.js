/*
	设计模式-构造函数
	- 构造函数用于创建特定类型的对象
	- 应用：1、用于创建特定类型的对象；2、第一次声明的时候给对象赋值；3、声明构造函数，赋予属性和方法
*/
//常规形式
function Person1(name,age){
	this.name=name;
	this.age=age;
	this.say=function(){
		console.log('hi, ',this.name);
	}
}
//升级版本，避免每个实例新建一个say函数！
function Person2(name,age){
	this.name=name;
	this.age=age;
	this.say=sayHi;//通过对象调用函数时，函数作用域this为Person2
}
function sayHi(){
	console.log('hi, ',this.name);
}
//更优方式，使用原型方法
function Person3(name,age){
	//公有属性
	this.name=name;
	this.age=age;
}
Person3.prototype.say=function(){
	//公有方法
	console.log('hi, ',this.name);
}


var n1=new Person1('a',18);
var n2=new Person2('b',18);
var n3=new Person3('c',18);

//new创建对象的过程。1、创建对象A，2、在A中调用构造函数，3、如果函数无对象返回则返回对象A！
//当直接使用Person时，构造函数的this指向window。
var n4=Person1('d',18);//此时n4为undefined，在全局window中注册了name和age属性，注册了say方法！

//如何强制使用new？---检查this
function Person4(name,age){
	if(!(this instanceof Person4)){
		return new Person4(name,age);
	}
	
	this.name=name;
	this.age=age;
	this.say=function(){
		console.log('hi, ',this.name);
	}
}
var n5=Person4('e',18);

//构造函数模式的具体应用？


//参考链接：http://www.cnblogs.com/TomXu