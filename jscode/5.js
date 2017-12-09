/*
	常用是数据结构，队列、栈、链表
*/

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
			for(var j=0;j<numOfClerk && clerks[j]>0 && !customers.isEmpty();++j){
				var tmp=customers.dequeue();
				clerks[j]-=tmp;
				currentWait-=tmp;
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

function Node(data,next){
	this.data=data;
	this.next=next;
}
function oneWayList(){
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

//信息节点，由于是对象，所以为引用！
function NodeStu(id,course,grade){
	this.data={
		id:id,
		course:course,
		grade:grade
	};
	//信息节点仅保存信息
	//this.nextCourse=nextCourse;
	//this.nextId=nextId;
}
//学生或课程的加点
function NodeSpe(data,next){
	this.data=data;
	this.next=next;
}
function StuList(name){
	//首节点为空间点
	var head=new NodeSpe(name,null);
	
	this.addToTail=function(data){
		if(head.next===null){
			head.next=new NodeSpe(data,null);
		}else{
			var node=head.next;
			while(node.next!==null){
				node=node.next;
			}
			node.next=new NodeSpe(data,null);
		}
	};
	this.deleteNode=function(data){
		if(head.next!==null){
			if(head.next.data.data.id===data.data.id){
				head.next=null;
			}else{
				var node=head.next;
				while(node.next!=null && node.next.data.data.id!==data.data.id){
					node=node.next;
				}
				if(node.next!==null){
					node.next=node.next.next;
				}
			}
		}
	};
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
				students[id]=new StuList(id,null,null);
			}
			var stu=students[id];
			
			var grades=studentTmp.grades;
			var j,
				len=grades.length;
				
			
			for(j=0;j<len;++j){
				var stunode=new NodeStu(id,grades[j].name,grades[j].total);
				
				if(!classes.hasOwnProperty(grades[j].name)){
					classes[grades[j].name]=new StuList(grades[j].name,null,null);
				}
				var cla=classes[grades[j].name];
				
				//学生表students，对应的学生stu添加信息节点（节点的data包含姓名、课程名、分数等信息）
				stu.addToTail(stunode);
				//课程表classes，对应的课程cla添加信息节点
				cla.addToTail(stunode);

			}
		}
	}
	
	//删除信息，如删除学生某门课程
	//添加信息，如学生选课！
	//查看信息
	this.show=function(){
		return {students:students,classes:classes};
	}
}

var sp=new SparseTable();
sp.addStu(json);


