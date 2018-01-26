/*
	设计模式-观察者模式（订阅模式）
	- 它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
	- 如事件响应
*/
//初级形式
var pubsub={};
(function(q){
	//存放回调函数的对象
	var topics={};
	//每个回调函数的id，用于退订方法
	var subUid=-1;
	
	//发布方法，广播方法
	q.publish=function(topic,args){
		if(!topics[topic]){
			return false;
		}
		//异步调用事件。全部加入异步事件队列
		setTimeout(function(){
			var subTopics=topics[topic];
			var len=subTopics.length;
			
			for(var i=0;i<len;++i){
				subTopics[i].task(topic,args);
			}
		},0);
		//广播成功
		return true;
	};
	//订阅方法
	q.subscribe=function(topic,task){
		if(!topics[topic]){
			topics[topic]=[];
		}
		var id=(++subUid).toString();
		topics[topic].push({
			token:id,
			task:task
		});
		//返回被添加订阅函数的对应token
		return id;
	};
	//退订方法
	q.unsubscribe=function(token){
		for(var t in topics){
			if(topics[t]){
				for(var i=0,len=topics[t].length;i<len;++i){
					if(topics[t][i]===token){
						topics[t].splice(i,1);
						return token;
					}
				}
			}
		}
		return false
	};
	
})(pubsub);
//订阅任务
var taskID=pubsub.subscribe('example1',function(topic,args){
	console.log(topic+':'+args);
});
//发布通知
pubsub.publish('example1',['hello',' world!']);
//退订任务
pubsub.unsubscribe(taskID);

//自定义事件版本
function Event(){
	var tasks={};
}
Event.prototype={
	constructor:Event,
	subscribe:function(type,task){
		var taskSub=tasks[type];
		if(!taskSub){
			taskSub=[];
			tasks[type]=taskSub;
		}
		//注册事件
		taskSub.push(task);
	},
	unsubscribe:function(type,task){
		var taskSub=tasks[type];
		if(!taskSub){
			return false;
		}
		for(var i=0,len=taskSub.length;i<len;++i){
			//匿名函数无法注销
			if(taskSub[i]===task){
				taskSub.splice(i,1);
			}
		}
		
	}
}


//参考链接：http://www.cnblogs.com/TomXu