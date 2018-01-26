/*
	编程实践
		- 使用Object和Array创建对象或数组
		- 避免重复工作，别做无关紧要的工作、别重复做已经完成的工作
*/
//创建字面量对象、创建数组推荐方案
var myObject={
	"name":"xiaer93"
};
var myArray=["xiaer93"]

//事件绑定
function addHandler1(target,eventType,handler){
	if(target.addEventListener){
		target.addEventListener(eventType,handler,false);
	}else{
		target.attachEvent("on"+eventType,handler);
	}
}
//改进，使用延迟加载
function addHandler2(target,eventType,handler){
	if(target.addEventListener){
		addHandler2=function(target,eventType,handler){
			target.addEventListener(eventType,handler,false);
		}
	}else{
		addHandler2=function(target,eventType,handler){
			target.attachEvent("on"+eventType,handler);
		}
	}
}
//改进，使用条件预载
var addHandler3=document.body.addEventListener?
	function(target,eventType,handler){
		target.addEventListener(eventType,handler,false);
	}:
	function(target,eventType,handler){
		target.attachEvent("on"+eventType,handler);
	};

/*
	使用内置速度较快的方法
		-二进制：
			-判断奇偶性
			-位掩码，条件判断
		-原生数学公式
		-原生querySelectorAll选择器！
*/