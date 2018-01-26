/*
	常用是数据结构，队列、栈、链表、集合、字典/散列表
*/
'use strict'

var util={}

/*
	堆栈，应用：大数相加、字符匹配、算术表达式计算，回归等
*/
function Stack(){
	var stack=[];
	
	//获取栈的长度
	this.len=function(){
		return stack.length;
	}
	
	
	//入栈
	this.push=function(data){
		stack.push(data);
	},
	//出栈
	this.pop=function(){
		if(stack.length===0){
			throw new Error("栈中没有元素！");
		}
		return stack.pop();
	},
	//获取栈顶元素
	this.top=function(){
		if(stack.length===0){
			throw new Error("栈中没有元素！");
		}
		return stack[stack.length-1];
	},
	//清空栈
	this.clear=function(){
		stack.length=0;
	},
	this.isEmpty=function(){
		return stack.length===0;
	}
	
}

//公有方法无法访问私有属性
Stack.prototype={
	constructor:Stack,
}

/*
	栈的应用-大数相加（如果大数相乘，则可以先依次计算每一次乘法结果，在将所有结果相加！）
*/
function addLargeNumber(num1,num2){
	//对于num为指数表示形式不适用！
	num1=num1.toString();
	num2=num2.toString();
	
	var results=new Stack();
	var s1=new Stack(),
		s2=new Stack();
	var i,
		len;
	//将num1入栈
	for(i=0,len=num1.length;i<len;++i){
		s1.push(num1[i]);
	}
	//将num2入栈
	for(i=0,len=num2.length;i<len;++i){
		s2.push(num2[i]);
	}
	
	//计算
	var tmp1,
		tmp2,
		retTmp=0;
	while(s1.len()>0 || s2.len()>0){
		tmp1=(s1.len()>0)?Number(s1.pop()):0;
		tmp2=(s2.len()>0)?Number(s2.pop()):0;
		retTmp=tmp1+tmp2+retTmp;
		
		results.push((retTmp%10).toString());
		retTmp=Math.floor(retTmp/10);
		
	}
	
	//返回结果
	var ret="";
	while(results.len()>0){
		ret=ret+results.pop();
	}
	
	return ret;
}

/*
	栈还常应用于回归问题，递归也常应用于回归问题！
	//若为迷宫问题，则不需要将标记字符重新复原；若为寻找字符串路径，则需要将标记字符复原！
	//寻找匹配字符串路径，从2d网格中寻找匹配路径，只能上下左右4ge方向移动；如果成功，则返回true！
	//使用栈，需要记录父元素；使用递归不需要记录父元素！
	Given board =
	
	[
	  ['A','B','C','E'],
	  ['S','F','C','S'],
	  ['A','D','E','E']
	]
	
	word = "ABCCED", -> returns true,
	word = "SEE", -> returns true,
	word = "ABCB", -> returns false.   
*/
function Cell(x,y,px,py){
	this.x=x;
	this.y=y;
	//pxpy为该节点的父元素，通过父元素坐标识别是否需要将父元素复原！
	this.px=px;
	this.py=py;
}

var existByStack=function(str){
	//xy不越界，且没有被占用
	var pushUnvisited=function(x,y,px,py){
		if(0<=x && x<iLen && 0<=y && y<jLen && store[x][y]===0){
			cellStack.push(new Cell(x,y,px,py));
		}
	}
	//2d矩阵
	var board =
		[
		  ['A','B','C','E'],
		  ['S','F','C','S'],
		  ['A','D','E','E']
		];
	
	var i,
		j,
		iLen=board.length,
		jLen=board[0].length,
		index;
	
	//构建相同的矩阵，记录路径
	var store=new Array();
	for(i=0;i<iLen;++i){
		store.push((new Array(jLen)).fill(0));
	}
	//正式代码
	var cellStack=new Stack();
	for(i=0;i<iLen;++i){
		for(j=0;j<jLen;++j){
			
			//首元素的父元素为自身
			var px=i,
				py=j;
			pushUnvisited(i,j,px,py);
			index=0;
			//栈中存储上下左右的待搜寻的cell！
			while(!cellStack.isEmpty()){
				var tmp=cellStack.pop();
				var x=tmp["x"],
					y=tmp["y"],
					px=tmp["px"],
					py=tmp["py"];
					
				//如果当前坐标xy，与index对应的字符相等
				if(str[index]===board[x][y]){
					
					px=x;
					py=y;
					store[x][y]=1;
					index+=1;
					
					//如果index等于str.length，则说明找到路径
					if(index===str.length){
						console.log(store);
						return true;;
					}
					
					pushUnvisited(x+1,y,px,py);
					pushUnvisited(x-1,y,px,py);
					pushUnvisited(x,y+1,px,py);
					pushUnvisited(x,y-1,px,py);
	
				}else{
					//如果栈为空，则退出当前循环，并且store和index回退！
					if(cellStack.isEmpty()){
						index-=1;
						store[px][py]=0;
						break;
					}
					//如果栈顶元素的父元素与当前元素父元素不相同，则说明需要回退1步
					//index回退,store回退
					if(px!==cellStack.top()["px"] && px!==cellStack.top()["py"]){
						index-=1;
						store[px][py]=0;
					}
				}
			}
		}
	}
	//如果没有找到则返回false
	return false;
}

var existByRecursive=function(str){
	//检查函数，检测xy坐标是否可以使用！
	var check=function(x,y){
		if(0<=x && x<iLen && 0<=y && y<jLen && store[x][y]===0){
			return true;
		}else{
			return false;
		}
	}
	//递归函数，当当前坐标字符等于对应的str字符，则递归！
	function _go(x,y,index){
		if(check(x,y) && flag===false){
			if(str[index]===board[x][y]){
				//标记xy坐标已经被占用！
				store[x][y]=1;
				
				_go(x+1,y,index+1);
				_go(x-1,y,index+1);
				_go(x,y+1,index+1);
				_go(x,y-1,index+1);
				//如果递归没有结束，则xy坐标复原
				
				//判断是否结束函数
				if(index===(str.length-1)){
					console.log(store.toString());
					flag=true;
					return true;
				}
				store[x][y]=0;
			}
		}
	}
	
	//2d矩阵
	var board =
		[
		  ['A','B','C','E'],
		  ['S','F','C','S'],
		  ['A','D','E','E']
		];
		
	var i,
		iLen=board.length,
		j,
		jLen=board[0].length;
	//构建相同的矩阵，记录路径
	var store=new Array();
	for(i=0;i<iLen;++i){
		store.push((new Array(jLen)).fill(0));
	}
	
	//遍历2d矩阵中每一个元素！
	var index=0;
	var flag=false;
	for(i=0;i<iLen;++i){
		for(j=0;j<jLen;++j){
			_go(i,j,index);
		}
	}
	
	//如果递归后程序没有结束，则返回false
	return flag;
}


/*
	队列,常用于模拟排队论！
*/
function Queue(){
	var queue=[];
	
	this.clear=function(){
		queue.length=0;
	},
	this.isEmpty=function(){
		return queue.length===0;
	},
	this.enqueue=function(data){
		queue.push(data);
	},
	this.dequeue=function(){
		if(this.isEmpty()){
			throw new Error("队列为空！");
		}
		return queue.shift();
	},
	this.front=function(){
		if(this.isEmpty()){
			throw new Error("队列为空！");
		}
		return queue[0];
	},
	this.len=function(){
		return queue.length;
	}
}

/*
	优先队列
*/
function PriorityQueue(){
	var queue=[];
	this.enqueue=function(data,priority){
		var item={'data':data,'priority':priority};
		var i=0,
			len=queue.length,
			added=false;
		for(;i<len;++i){
			if(queue[i].priority<priority){
				queue.splice(i,0,item);
				added=true;
				break;
			}
		}
		if(!added){
			queue.push(item);
		}
	};
	this.dequeue=function(){
		if(queue.length){
			return queue.shift();
		}
	};
	this.front=function(){
		if(queue.length){
			return queue[0];
		}
	};
	this.clear=function(){
		queue.length=0;
	};
	this.isEmpty=function(){
		return !!queue.length;
	}
}

/*
	队列应用，排队问题
	1、每分钟出现个人，0人-0.1，1人-0.3，3人-0.4，4人-0.2（人数-概率）
	2、所需要服务的时间，15秒-0.2，50秒-0.5，70秒-0.2，110秒-0.1（服务时间-概率）
	3、客服人员有空闲时间则立即服务
	//4、总共服务近100人（大于等于100），求3、4、5、6位客服各个最大等待时间
	4.总共服务30分钟，求3、4、5、6位客服各个最大等待时间
*/
function bank(numOfClerk){
	
	var people=[0,1,1,1,3,3,3,3,4,4];
	var times=[15,15,50,50,50,50,50,70,70,110];
	
	//顾客队列，队列元素为每位顾客所需要的时间
	var customers=new Queue();
	
	var i,
		cntCustormer,
		currentWait=0,
		maxWait=currentWait,
		totalTime=30,
		thereIsLine=0;
	
	//定义clerks服务员
	var clerks=new Array(numOfClerk);
	clerks.fill(0);
	
	for(i=1;i<=totalTime;++i){
		
		//添加客户
		cntCustormer=people[Math.floor(Math.random()*10)];
		for(var j=0;j<cntCustormer;++j){
			var tmp;
			tmp=times[Math.floor(Math.random()*10)];
			customers.enqueue(tmp);
			currentWait+=tmp;
		}
		
		//服务员服务
		//修正服务员服务时间
		clerks=clerks.map(function(item,index,array){return item+60;});
		
		while(!customers.isEmpty() && clerks.some(function(item){return item>0;})){
			for(var j=0;j<numOfClerk;++j){
				if(clerks[j]>0 && !customers.isEmpty()){
					var tmp=customers.dequeue();
					clerks[j]-=tmp;
					currentWait-=tmp;
				}
			}
			//排序，剩余时间多的先接客（代表先完成）
			clerks.sort(function(m,n){return m<n;});
		}
		//修正服务员服务时间,如果大于0则清零，如果小于0则保留
		clerks=clerks.map(function(item,index,array){return item>0?0:item});

		//记录排队的时长
		if(!customers.isEmpty()){
			thereIsLine+=1;
		}
		//记录最长等待时间！
		if(maxWait<currentWait){
			maxWait=currentWait;
		}
	}
	
	return {
			percent:Math.floor((thereIsLine/totalTime*100)),
			maxWait:maxWait
		};
}

/*
	优先队列，对入队列元素进行优先级判断，并放在合适位置！
	双端队列
*/

/*
	链表
*/
/*
	单向链表，单向链表使用2个指针，一个指向头部、一个指向尾部;(方便头尾操作)
*/


function oneWayList(){
	
	var Node=function (data,next){
		this.data=data;
		this.next=next;
	};
	
	var head=tail=null;
	
	this.addTohead=function(data){
		if(head===null){
			head=tail=new Node(data,null);
		}else{
			head=new Node(data,head);
		}
	};
	this.addToTail=function(data){
		if(tail===null){
			head=tail=new Node(data,null)
		}else{
			tail.next=new Node(data,null);
			tail=tail.next;
		}
		
	};
	this.deleteFromHead=function(){
		if(head===null){
			throw new Error("链表为空！");
		}else if(head===tail){
			head=tail=null;
		}else{
			head=head.next;
		}
	};
	this.deleteFromTail=function(){
		if(tail===null){
			throw new Error("链表为空！");
		}else if(head===tail){
			head=tail=null;
		}else{
			var node=head;
			while(node.next!==tail){
				node=node.next;
			}
			node.next=null;
			tail=node;
		}
	};
	this.deleteNode=function(data){
		if(head===null){
			throw new Error("链表为空！");
		}else if(head.data===data){
			this.deleteFromHead();
		}else if(tail.data===data){
			this.deleteFromTail();
		}else{
			var node=head.next,
				prev=head;
			while(node!==null && node.data!==data){
				prev=node;
				node=node.next;
			}
			if(node===null){
				throw new Error("没有找到元素！")
			}else{
				prev.next=node.next;
			}
		}
	};
	this.first=function(){
		if(head!==null){
			return head.data;
		}else{
			return ;
		}
	};
	this.last=function(){
		if(tail!==null){
			return tail.data;
		}else{
			return ;
		}
	};
	this.show=function(){
		var node=head;
		while(node!==null){
			console.log(node.data);
			node=node.next;
		}
	};
	this.getHead=function(){
		return head;
	};
	//是否为空链表
	function isEmpty(){
		return head===null;
	}
}

/*
	双向链表,节点中增加指向父节点的指针！
*/
function NodeTwo(data,prev,next){
	this.data=data;
	this.prev=prev;
	this.next=next;
}
function twoWayList(){
	var head=null;
	var tail=null;
	
	this.addToTail=function(data){
		if(tail===null){
			head=tail=new NodeTwo(data,null,null);
		}else{
			var node=new NodeTwo(data,tail,null);
			tail.next=node;
			tail=node;
		}
	};
	this.addTohead=function(data){
		if(head===null){
			head=tail=new NodeTwo(data,null,null);
		}else{
			var node=new NodeTwo(data,null,head);
			head.prev=node;
			head=node;
		}
	};
	this.deleteFromHead=function(){
		if(head!==null){
			if(head===tail){
				head=tail=null;
			}else{
				head=head.next;
				head.prev=null;
			}
		}
	};
	this.deleteFromTail=function(){
		if(tail!==null){
			if(head===tail){
				head=tail=null;
			}else{
				tail=tail.prev;
				tail.next.prev=null;
				tail.next=null;
			}
		}
	};
	this.showFisrt=function(){
		if(head!==null){
			var node=head;
			while(node!==null){
				console.log(node.data);
				node=node.next;
			}
		}
	};
	this.showLast=function(){
		if(tail!==null){
			var node=tail;
			while(node!==null){
				console.log(node.data);
				node=node.prev;
			}
		}
	}
}

/*
	循环链表，尾部指向首部；可以使用单向链表和双向链表实现（单向链表再删除尾节点会很耗时，以颠倒顺序处理数据效率也不高！）
*/

function NodeCircle(data,prev,next){
	this.data=data;
	this.prev=prev;
	this.next=next;
}
function circleList(){
	var tail=null;			//只使用一个指针
	
	this.addToTail=function(data){
		if(tail===null){
			tail=new NodeCircle(data,null,null);
			tail.next=tail;
			tail.prev=tail;
		}else{
			var node=new NodeCircle(data,tail,tail.next);
			tail.next.prev=node;
			tail.next=node;
			tail=node;
		}
	};
	this.deleteFromTail=function(){
		if(tail!==null){
			if(tail.next===tail){
				tail=null;
			}else{
				var node=tail;
				tail.prev.next=tail.next;
				tail.next.prev=tail.prev;
				tail=tail.prev;
				
				node.next=null;
				node.prev=null
			}
		}
	};
	this.show=function(){
		if(tail!==null){
			if(tail.next===tail){
				console.log(tail.data);
			}else{
				var node=tail.next;
				while(node!==tail){
					console.log(node.data);
					node=node.next;
				}
				//show tail.data
				console.log(node.data);
			}
		}
	}
}

/*
	查找效率提升：1、使用跳跃链表法；2、前移法（将找到的元素放在链表的开头）【还有换位法、计数法、排序法】【对于中等大小链表，使用普通链表就行了；前移法和计数法性能较好，在尾部插入节点性能较好！】
*/
/*
	链表的重要应用，稀疏表
	//每位学生为一个链表，没门课程为一个链表，指向共有的节点
*/
var json={
	"students":[
				{
					"id":"110",
					"grades":[{"name":"chinese","total":90},{"name":"english","total":88}]
				},
				{
					"id":"120",
					"grades":[{"name":"chinese","total":70},{"name":"english","total":60}]
				}
			]
}
var chjson={};
var deljson={
	"students":[
		{
			"id":"110"
		}
	]
};

//信息节点，由于是对象，所以为引用！
function StuInfo(id,course,grade){
	this.data={
		id:id,			//关键信息，不可重复
		course:course,	//关键信息，不可重复
		grade:grade
	};
	//信息节点仅保存信息
	//this.nextCourse=nextCourse;
	//this.nextId=nextId;
}
//学生或课程的加点
function NodeStu(data,prev,next){
	this.data=data;
	this.next=next;
	this.prev=prev;
}
function StuList(name){
	//首节点为空间点,永久存在；不参与正常的链表操作！
	var head=new NodeStu(name,null,null);
	
	this.addToTail=function(data){
		if(head.next===null){
			head.next=new NodeStu(data,head,null);
		}else{
			var node=head.next;
			while(node.next!==null){
				node=node.next;
			}
			node.next=new NodeStu(data,node,null);
		}
	};
	//删除节点，根据传入信息id和course，删除对应的节点！
	this.deleteNode=function(id,course){
		if(head.next!==null){

			var node=head;
			//node.next不为null，且node.next.data.data包含的信息id和course--至少有1条不满足！
			while(node.next!=null && (node.next.data.data.id!==id || node.next.data.data.course!==course)){
				node=node.next;
			}
			if(node.next!==null){
				var del=node.next;
				if(del.next===null){
					node.next=null;
					del.prev=null;
				}else{
					del.next.prev=node;
					node.next=del.next;
					
					del.next=null;
					del.prev=null
				}
			}
			
		}
	};
	this.getItem=function(){
		//getItem的指针，每次获取1个数据，依次递增！
		var point=head;
		var next=function(){
			point=point.next;
			if(point!==null)
				return point;
			else{
				return ;
			}
		};
		//此处的point并没有随着上面的point移动！（指针并不会随着其他移动而移动）
		var ret={point:point,next:next};
		return ret;
	}
	this.show=function(){
		var node=head.next;
		while(node!=null){
			for(var key in node.data.data){
				console.log(key+":"+node.data.data[key],"<>");
			}
			node=node.next;
		}
	}
	
}

function SparseTable(){
	var students={};
	var classes={};
	
	//通过json添加数据
	this.addStu=function(json){
		var data=json.students;
		var i,
			len=data.length;
		for(i=0;i<len;++i){
			var studentTmp=data[i];
			var id=studentTmp.id;
			
			if(!students.hasOwnProperty(id)){
				students[id]=new StuList(id);
			}
			var stu=students[id];
			
			var grades=studentTmp.grades;
			var j,
				len=grades.length;
				
			
			for(j=0;j<len;++j){
				var stunode=new StuInfo(id,grades[j].name,grades[j].total);
				
				if(!classes.hasOwnProperty(grades[j].name)){
					classes[grades[j].name]=new StuList(grades[j].name);
				}
				var cla=classes[grades[j].name];
				
				//学生表students，对应的学生stu添加信息节点（节点的data包含姓名、课程名、分数等信息）
				stu.addToTail(stunode);
				//课程表classes，对应的课程cla添加信息节点
				cla.addToTail(stunode);

			}
		}
	}
	
	//删除学生
	this.delStu=function(id){
		if(students.hasOwnProperty(id)){
			var stu=students[id];
			var iterator=stu.getItem();
			while(true){
				var node=iterator.next();
				//如果node返回undefined，则退出循环
				if(typeof node === "undefined")
					break;
				//获取节点的id和course，调用对应的课程链表删除
				var course=node.data.data["course"];
				if(classes.hasOwnProperty(course)){
					var cla=classes[course];
					cla.deleteNode(id,course);
				}
				
				/*
				//对应课程删除该节点!【思路有问题：node.prev指向对应学生的首节点，而不是课程节点！】
				node.prev.next=node.next;
				if(node.next!==null)
					node.next.prev=node.prev;
				//
				//node.next=null;
				//node.prev=null;
				*/
			}
			//删除学生节点
			delete(students[id]);
		}
	}
	//删除课程
	//垃圾回收机制之一，引用标记法；当对一个对象的引用计数为0，则程序自动清理；所以链表清空可以直接零首节点为null！！
	this.delCla=function(course){
		if(classes.hasOwnProperty(course)){
			var cla=classes[course];
			var iterator=cla.getItem();
			while(true){
				var node=iterator.next();
				//如果node返回undefined，则退出循环
				if(typeof node === "undefined")
					break;
				//获取节点的id和course，调用对应的课程链表删除
				var id=node.data.data["id"];
				if(students.hasOwnProperty(id)){
					var stu=students[id];
					stu.deleteNode(id,course);
				}
				
				/*
				//对应课程删除该节点
				node.prev.next=node.next;
				node.next.prev=node.prev;
				//
				node.next=null;	
				node.prev=null;
				*/
			}
			//删除学生节点
			delete(classes[course]);
		}
	}
	//删除学生某门课程
	this.delClaOfStu=function(id,course){
		var stu,cla;
		
		if(classes.hasOwnProperty(course)){
			cla=classes[course];
			cla.deleteNode(id,course);
		}
		if(students.hasOwnProperty(id)){
			stu=students[id];
			stu.deleteNode(id,course);
		}
	}
	
	//添加信息，如学生选课！
	this.addClaOfStu=function(id,course,grade){
		
		if(!students.hasOwnProperty(id)){
			students[id]=new StuList(id);
		}
		
		if(!classes.hasOwnProperty(course)){
			classes[course]=new StuList(course);
		}
		
		var stu=students[id];
		var cla=classes[course];
		
		var stunode=new StuInfo(id,course,grade);

		//学生表students，对应的学生stu添加信息节点（节点的data包含姓名、课程名、分数等信息）
		stu.addToTail(stunode);
		//课程表classes，对应的课程cla添加信息节点（节点的data包含姓名、课程名、分数等信息）
		cla.addToTail(stunode);
	}
	//查看信息
	this.show=function(){
		return {students:students,classes:classes};
	}
}

var sp=new SparseTable();
sp.addStu(json);


/*
	集合set、ECMAScript6原生支持set
*/
//本案例使用对象实现集合
function Set(){
	var set={};
	
	this.has=function(value){
		return set.hasOwnProperty(value);
	};
	this.add=function(value){
		if(!this.has(value)){
			set[value]=value;
			return true;
		}
		return false;
	};
	this.remove=function(value){
		if(this.has(value)){
			delete set[value];
			return true;
		}
		return false;
	};
	this.clear=function(){
		set={};
	};
	this.size=function(){
		return Object.keys(set).length;
	};
	this.values=function(){
		var ret=[];
		for(var key in set){
			if(set.hasOwnProperty(key)){
				ret.push(key);
			}
		}
		return ret;
	};
	//交集并集差集子集
	//并集
	this.union=function(otherSet){
		var ret=new Set();
		
		var values=this.values();
		for(var i=0,len=values.length;i<len;++i){
			ret.add(values[i]);
		}
		
		values=otherSet.values();
		for(var i=0,len=values.length;i<len;++i){
			ret.add(values[i]);
		}
		return ret;
	};
	//交集
	this.intersection=function(otherSet){
		var ret=new Set();
		
		var values=otherSet.values();
		for(var i=0,len=values.length;i<len;++i){
			if(otherSet.has(values[i])){
				ret.add(values[i]);
			}
		}
	};
	//差集
	this.difference=function(otherSet){
		var ret=new Set();
		
		var values=otherSet.values();
		for(var i=0,len=values.length;i<len;++i){
			if(!otherSet.has(values[i])){
				ret.add(values[i]);
			}
		}
	};
	//子集,当前集合是otherset的子集吗？
	this.subset=function(otherSet){
		if(this.size()>otherSet.size()){
			return false;
		}else{
			var values=this.values();
			for(var i=0,len=values.length;i<len;++i){
				if(!ohterSet.has(values[i])){
					return false;
				}
			}
		}
		return true;
	}
}

/*
	字典，即通过键值对形式储存数据
*/
function Dictionary(){
	var dict={};
	this.has=function(key){
		return dict.hasOwnProperty(key);
	}
	this.set=function(key,value){
		dict[key]=value;
	};
	this.get=function(key){
		if(this.has(key)){
			return dict[key];
		}
	};
	this.delete=function(key){
		if(this.has(key)){
			delete dict[key];
			return true;
		}
		return false;
	};
	this.values=function(){
		var ret=[];
		for(var key in dict){
			if(this.has(key)){
				ret.push(dict[key]);
			}
		}
		return ret;
	};
	this.clear=function(){
		dict={};
	};
	this.keys=function(){
		return Object.keys(dict);
	};
	this.size=function(){
		return Object.keys(dict).length;
	};
	this.getItem=function(){
		return dict;
	}
}
/*
	散列表，通过键名快速索引找到对应的值！
*/
function HashTable(){
	var table=[];
	var hash=function(key){
		var ret=0;
		for(var i=0,len=key.length;i<len;++i){
			ret+=key.charCodeAt(i);
		}
		return ret%37;
	};
	//若散列函数不够友好，很容易发生散列冲突。当发生冲突时，有3中解决方案：分离链表法、线性探查法、双散列法
	
	this.put=function(key,value){
		var pos=hash(key);
		table[pos]=value;
	};
	this.remove=function(key){
		var pos=hash(key);
		table[pos]=undefined;
	};
	this.get=function(key){
		var pos=hash(key);
		return table[pos];
	}
}
//分离链表法，如果冲突会使用链表
function listForHashTable(){
	var Node=function(data,next){
		this.data=data;
		this.next=next;
	};
	Node.prototype.equal=function(otherNode){
		return this.data.key===otherNode.data.key;
	}
	
	var head=null;
	//传入的data是一个对象！
	this.add=function(data){
		if(head===null){
			head=new Node(data,null);
		}else{
			var node=new Node(data,null),
				tmpNode=head,
				prevNode=tmpNode;
			while(tmpNode){
				if(!tmpNode.equal(node)){
					prevNode=tmpNode;
					tmpNode=tmpNode.next;
				}else{
					break;
				}
			}
			//键名相同，则修改value；否则添加入链表末尾
			if(tmpNode){
				tmpNode.data=node.data;
			}else{
				prevNode.next=node;
			}
			
		}

	};
	this.delete=function(data){
		if(!head){
			return false;
		}
		
		var node=new Node(data,null);
		if(head.equal(node)){
			head=head.next;
			return true;
		}else{
			var tmpNode=head.next,
				prevNode=head;
			while(tmpNode){
				if(!tmpNode.equal(node)){
					prevNode=tmpNode;
					tmpNode=tmpNode.next;
				}else{
					break;
				}
			}
			if(tmpNode){
				prevNode.next=tmpNode.next;
				return true;
			}else{
				return false;
			}
			
		}
	};
	this.get=function(data){
		if(!head){
			return ;
		}
		var node=new Node(data,null);

		var tmpNode=head;
		while(tmpNode){
			if(!tmpNode.equal(node)){
				tmpNode=tmpNode.next;
			}else{
				break;
			}
		}
		if(tmpNode){
			return tmpNode.data;
		}else{
			return ;
		}	
	}
}

function HashTable1(){
	var table=[];
	var hash=function(key){
		var ret=0;
		for(var i=0,len=key.length;i<len;++i){
			ret+=key.charCodeAt(i);
		}
		return ret%37;
	};
	
	var Data=function(key,value){
		this.key=key;
		this.value=value;
		this.toString=function(){
			return this.key+","+this.value;
		}
	};


	this.put=function(key,value){
		var pos=hash(key);
		
		if(typeof table[pos]==="undefined"){
			table[pos]=new listForHashTable();
		}
		table[pos].add(new Data(key,value));
	};
	this.remove=function(key){
		var pos=hash(key),
			list=table[pos];
		if(list){
			list.delete(new Data(key));
		}
	};
	this.get=function(key){
		var pos=hash(key),
			list=table[pos];
		return list?list.get(new Data(key)):undefined;
	}
}

//线性探查法，当发生冲突时依次向下进行搜寻（当表较满时，效率十分低下！）（线性探查的增量可以设置为函数，如hash函数）
function HashTable2(){
	var table=[];
	var hash=function(key){
		var ret=0;
		for(var i=0,len=key.length;i<len;++i){
			ret+=key.charCodeAt(i);
		}
		return ret%37;//假定表长度为37
	};
	//数据，存放value和key
	var Data=function(key,value){
		this.key=key;
		this.value=value;
	};
	
	this.put=function(key,value){
		var pos=hash(key);
		while(typeof table[pos] !=="undefined"){
			pos+=1;
			pos=pos%37;
		}
		table[pos]=new Data(key,value);
	};
	this.remove=function(key){
		var pos=hash(key),
			index=(pos+1)%37;
		while(typeof table[index]==="undefined" || table[index]["key"]!==key){
			index=(index+1)%37;
			if(index===pos){
				//找了一圈没有找到
				return false;
			}
		}
		if(typeof table[index]!=="undefined"){
			/*//不用移动~
			while(typeof table[pos]!=="undefined"){
				table[pos]=table[pos+1];
				pos+=1;
			} */
			return true;
		}else{
			return false;
		}
	};
	this.get=function(key){
		var pos=hash(key),
			index=(pos+1)%37;
		while(typeof table[index]==="undefined" || table[index]["key"]!==key){
			index=(index+1)%37;
			if(index===pos){
				return ;
			}
		}
		if(typeof table[index]!=="undefined"){
			return table[index]["value"];
		}else{
			return;
		}
	}
}

//更好的hash函数
var djbHashCode=function(key){
	var hash=5381;
	for(var i=0,len=key.length;i<len;++i){
		hash=hash*33+key.charCodeAt(i);
	}
	return hash%1013;
}
//使用桶技术解决冲突！



