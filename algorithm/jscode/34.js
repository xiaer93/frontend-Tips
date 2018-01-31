/*
	设计模式-职责链模式
	- 职责链模式的最大优点就是解耦了请求发送者和N个接收者之间的复杂关系，由于不知道链中的哪个节点可以处理发出的请求，所以只需把请求传递给第一个节点即可!!!
	- 职责链可以灵活的添加删除节点，同时可以使用任意节点作为首节点！
	- 解耦 一对多 的复杂关系！
	- 
*/

//1-
//产品销售：预订金500则优惠100元(且已经支付定金)，预订金200则优惠50元(且已经支付定金)，无预定用户普通渠道购买且不保证有足够库存！
//orderType为定金类型，pay为是否支付，stock为当前库存量
function order(orderType,pay,stock){
	if(orderType===1){
		if(pay){
			console.log('优惠200');
		}else{
			if(stock>0){
				console.log('普通购买')
			}else{
				console.log('库存不足')
			}
		}
	}else if(orderType===2){
		if(pay){
			console.log('优惠50');
		}else{
			if(stock>0){
				console.log('普通购买')
			}else{
				console.log('库存不足')
			}
		}
	}else{
		if(stock>0){
			console.log('普通购买')
		}else{
			console.log('库存不足')
		}
	}
}
//实例
order(2,true,10);

//2-提炼程多个函数
//去掉了许多嵌套的分支结构，但是多个函数耦合在一起了！
//如果需要增加，订金300优惠100，则需要重新修改函数！
function order500(orderType,pay,stock){
	if(orderType===1 && pay){
		console.log('优惠500')
	}else{
		order200(orderType,pay,stock);
	}
}
function order200(orderType,pay,stock){
	if(orderType===2 && pay){
		console.log('优惠50')
	}else{
		orderNormal(orderType,pay,stock)
	}
}
function orderNormal(orderType,pay,stock){
	if(stock>0){
		console.log('普通购买')
	}else{
		console.log('库存不足')
	}
}
//实例
order500(2,true,10);

//3-职责链模式
var CHAIN_NEXT='nextFN'
function o500(orderType,pay,stock){
	if(orderType===1 && pay){
		console.log('优惠500')
	}else{
		return CHAIN_NEXT;
	}
}
function o200(orderType,pay,stock){
	if(orderType===2 && pay){
		console.log('优惠50')
	}else{
		return CHAIN_NEXT;
	}
}
function oNormal(orderType,pay,stock){
	if(stock>0){
		console.log('普通购买')
	}else{
		console.log('库存不足')
	}
}
//职责链管理函数
function Chain(fn){
	this.fn=fn;
	this.next=null;
}
Chain.prototype={
	constructor:Chain,
	setNext:function(nextFN){
		this.next=nextFN
	},
	order:function(orderType,pay,stock){
		var ret=this.fn.apply(this,arguments);
		if(ret===CHAIN_NEXT){
			return this.next && this.next.order.apply(this.next,arguments);//绑定对象为this.next
		}
		//将结果返回！
		return ret;
	}
}
var o500Chain=new Chain(o500);
var o200Chain=new Chain(o200);
var oNormalChain=new Chain(oNormal);
o500Chain.setNext(o200Chain);
o200Chain.setNext(oNormal);

o500Chain.order(2,true,10);


//4-异步职责链如何管理？
function ChainAsync(fn){
	this.fn=fn;
	this.next=null;
}
ChainAsync.prototype={
	constructor:ChainAsync,
	setNext:function(nextFN){
		this.next=nextFN;
		return this.next;
	},
	start:function(){
		var ret=this.fn.apply(this,arguments);
		if(ret===CHAIN_NEXT){
			return this.next && this.next.start.apply(this.next,arguments);//绑定对象为this.next
		}
		//将结果返回！
		return ret;
	},
	nextAsync:function(){
		return this.next && this.next.start.apply(this.next,arguments);//绑定对象为this.next
	}
}

var f1=new ChainAsync(function(){
	console.log('f1');
	return CHAIN_NEXT;
});
var f2=new ChainAsync(function(){
	var _self=this;
	setTimeout(function(){
		console.log('f2');
		//异步任务原理
		_self.nextAsync();
	},1000)
});
var f3=new ChainAsync(function(){
	console.log('f3');
	return CHAIN_NEXT;
});
f1.setNext(f2).setNext(f3);
f1.start();

//4-同步任务和异步任务，任务管理链
var TASK_SYNC=1;
var TASK_ASYNC=2;
function ChainSuper(){
	this.methods=[];
	this.index=0;
}
ChainSuper.prototype={
	constructor:ChainSuper,
	_sync:function(fn){
		var _self=this;
		function _next(){
			_self.index++;
			_self.run();
		}
		
		function taskFn(){
			fn(_self.index);
			_next();
		}
		this.methods.push(taskFn);
	},
	_async:function(fn){
		var _self=this;
		function _next(){
			_self.index++;
			_self.run();
		}
		
		function taskFn(){
			fn(_self.index,_next);
		}
		this.methods.push(taskFn);
	},
	add:function(fn,type){
		if(type===TASK_SYNC){
			this._sync(fn);
		}else{
			this._async(fn);
		}
		return this;
	},
	run:function(){
		if(this.index===this.methods.length){
			return;
		}
		//执行函数
		this.methods[this.index]();
	},
	start:function(){
		this.run();
	}
}
var c=new ChainSuper();
c.add(function(index){
	console.log(index);
},TASK_SYNC).add(function(index,next){
	setTimeout(function(){
		console.log(index);
		next();//next函数内的this指向window!!!
	},2000)
},TASK_ASYNC).add(function(index){
	console.log(index);
},TASK_SYNC);
c.start();

//ajax请求信息！
//绑定事件---请求模块---数据处理---数据显示
document.body.onclick=ajax;
function ajax(){
	var xhr=new XMLHTTPRequest();
	xhr.open('GET','');
	xhr.send();
	xhr.onload=function(){
		//数据处理
		//数据显示
		show();
	}
}
function show(){
	console.log('click');
}