/*
	自定义事件：
		1、创建自定义事件的构造函数
		2、使用new Event、new customEvent、老版本document.createEvent()
*/

//自定义事件函数
var EventUtil=function(){
	
	this.handlers={};
}
EventUtil.prototype={
	constructor:EventUtil,
	addEvent:function(type,fn){
		var handler=[];
		if(typeof this.handlers[type]==="undefined"){
			handler.push(fn);
			this.handlers[type]=handler;
		}else{
			handler=this.handlers[type];
			handler.push(fn);
		}
	},
	triggEvent:function(event){
		if(event.target===null){
			event.target=this;//添加函数时，如果传入元素，则可以用target进行比较
		}
		var handler=this.handlers[event.type];
		var i,
			len=handler.length;
		for(i=0;i<len;++i){
			handler[i].call(this.event);//this是干嘛的？
		}
	},
	deleteEvent:function(type,fn){
		var handler=[];
		if(this.handlers[type]!==undefined){
			handler=this.handlers[type];
			var index=handler.indexOf(fn);
			handler.splice(index,1);
		}
	}
}

var myEvent=function(){
	EventUtil.call(this);
}
myEvent.prototype=Object.create(EventUtil.prototype);

var ev=new myEvent();
ev.addEvent("click",function(){console.log("自定义事件原型！")});
ev.triggEvent({type:"click"});

//删除事件removeEventListener，与addEventListener对应
//dispatchEvent触发事件，当该事件是可取消的(cancleable为true)并且至少一个该事件的事件处理方法 调用了Event.preventDefault()，则返回值为false；否则返回true。

//新建event对象
var nev=new Event("showa")
document.body.addEventListener("showa",function(){console.log("a")},false)//false为冒泡
document.body.dispatchEvent(nev);

//新建CustomEvent对象
var cev=new CustomEvent("showb",{detail:"b",bubbles:true,cancelable:true});
document.body.addEventListener("showb",function(event){console.log(event.detail)},false);
document.body.dispatchEvent(cev);

//老方法,不再推荐使用
var oev=document.createEvent("Event");
oev.initEvent("showc",true,true);
document.body.addEventListener("showc",function(){console.log("c");},false)
document.body.dispatchEvent(oev);

//在span上触发oev事件
document.getElementsByTagName("span")[0].dispatchEvent(oev);

//追踪冒泡事件流,目标事件先执行！
document.getElementsByTagName("span")[0].addEventListener("click",function(event){console.log(event.currentTarget);},false);
window.addEventListener("click",function(event){console.log(event.currentTarget);},false);
document.addEventListener("click",function(event){console.log(event.currentTarget);},false);
document.documentElement.addEventListener("click",function(event){console.log(event.currentTarget);},false);
document.body.addEventListener("click",function(event){console.log(event.currentTarget);},false);