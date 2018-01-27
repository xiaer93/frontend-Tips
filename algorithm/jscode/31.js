/*
	设计模式-适配器模式
	- 外观模式主要是封装接口，如绑定事件；适配器模式主要是数据或接口转换，使之符合使用要求！
	- 适配异类框架
	- 参数适配
	- 前后端数据视频
*/
//如果更换框架，且框架相似可以通过修改原框架代码实现适配
var A={};
A.g=function(selectorText,context){
	context=context || document;
	return context.querySelectorAll(selectorText);
};
//前移jquery框架
A.g=function(selectorText,context){
	return $(selectorText,context);
};

//默认参数设置
function doSomething(obj){
	var _default={
		name:'a',
		age:18
	};
	for(var key in _default){
		_default[key]=obj[key] || _default[key];
	}
	//...
}

//前后端数据适配，通过适配器转换后端数据为所需数据对象！
