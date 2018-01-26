/*
	高性能js之快速响应页面
	- js是单线程语言，通过队列机制依次执行！
	- 浏览器对js运行时间有限制，推荐限制为50-100ms之内
	- 通过定时器拆分长时间任务，避免长时间运行js脚本报错！
	- setInterval与setTimeout区别：setInterval是重复定时，但是当队列中有其添加的任务时，后续任务不会被添加进去！
	- 通过定时器处理的数据程序必须有：1、处理过程可以是异步；2、数据可以不按顺序处理！
	- webworkers使代码独立运行，不挤占浏览器uI线程的时间

*/

/*
	定时器优化.
	- 总的运行时间延长了，但是避免浏览器被锁死带来糟糕用户体验！
*/

var items=[1,2,3,4,5,6];
var todo=items.concat();
setTimeout(function(){
	console.log(todo.shift());
	if(todo.length>0){
		setTimeout(arguments.callee,25);
	}else{
		console.log("处理完成！");
	}
},25);
//封装
function processArray(items,process,callback){
	var todo=items.concat();
	
	setTimeout(function(){
		console.log(todo.shift());
		if(todo.length>0){
			setTimeout(arguments.callee,25);
		}else{
			console.log("处理完成！");//callback
		}
	},25);
	
}

//延伸，分割任务

function mutistep(steps,args,task){
	var tasks=steps.concat();
	setTimeout(function(){
		var task=tasks.shift();
		task.apply(null,args||[]);
		
		if(tasks.length>0){
			setTimeout(arguments.callee,25);
		}else{
			callback();
		}
	},25);
}

//优化，加入每次处理数据只有1ms，则不划算。因为最大处理时长可以为100ms！
function timedProcessArray(items,process,callback){
	var todo=items.concat();
	setTimeout(function(){
		var start=new Date();
		do{
			process(todo.shift());
		}while(todo.length>0 && (new Date()-start<50));
		if(todo.length>0){
			setTimeout(arguments.callee,25);
		}else{
			callback();
		}
	},25);
}

/*
	webworkers
	- 不能在外部线程中修改DOM
	- 不会影响js主线程！
	- 属性
		-navigator：appName、appVersion、usersAgent、platform
		-location，只读window.location
		-self，指向全局worker对象
		-importScripts，加载webwork所用到的外部js文件
		-所有ECMAScript对象，如Object、Array、Date
		-XMLHttpRequest构造器
		-setTimeout和setInterval
		-close方法，立刻停止worker运行！
	- 引用
		- 编码、解析大字符串
		- 复杂数学运算（包括图像或视频处理）
		- 大数组排序
*/
var worker=new Worker("workercode.js");
worker.onmessage=function(event){
	console.log(event.data);
};
worker.postMessage(JSON.stringify({"name":"xiaer93"}));