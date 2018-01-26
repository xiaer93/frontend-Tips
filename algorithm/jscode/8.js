/*
	图
	-表示方法：
		-矩阵法
		-邻接表
		-关联矩阵
*/
//字典
'use strict'

function Dictionary(){
	var dic={};
	
	this.set=function(key,value){
		dic[key]=value;
	};
	this.get=function(key){
		return dic[key];
	};
	this.has=function(key){
		return dic.hasOwnProperty(key);
	};
	this.delete=function(key){
		if(this.has(key)){
			delete dic[key];
			return true;
		}
		return false;
	};
	this.size=function(){
		return Object.keys(dic).length;
	};
	this.clear=function(){
		dic={};
	};
	this.values=function(){
		var ret=[];
		Object.keys(dic).forEach(function(key){
			ret.push(key+"="+dic[key]);
		});
		return ret;
	}
}
//队列
function Queue(){
	var queue=[];
	
	this.enqueue=function(value){
		queue.push(value);
	};
	this.dequeue=function(){
		if(!this.isEmpty()){
			return queue.shift();
		}else{
			return;
		}
	};
	this.isEmpty=function(){
		return !queue.length;
	}

}

//邻接表表示
function Graph(flag){
	var that=this;
	//邻接表
	this.vertices=[];//顶点
	this.gra=new Dictionary();//储存邻接顶点
	//邻接矩阵表示法
	this.matrix=[];
	
	//邻接节点，储存顶点和权值
	var Node=function(v,weight){
		this.v=v;
		this.weight=weight;
	};
	//添加顶点
	this.addVertex=function(v){
		this.vertices.push(v);
		this.gra.set(v,[]);
	};
	//添加边
	this.addEdge=flag?
			function(v,w,weight){
				//无向
				this.gra.get(v).push(new Node(w,weight));
				this.gra.get(w).push(new Node(v,weight));
			}:
			function(v,w,weight){
				this.gra.get(v).push(new Node(w,weight));
				//this.gra.get(w).push(new Node(v,weight));
			};
	//输出
	this.toString=function(){
		var i,
			len1=this.vertices.length;
		for(i=0;i<len1;++i){
			var tmp=this.gra.get(this.vertices[i]);//临时存储邻接点数组
			var ret="",
				j,
				len2=tmp.length;
			for(j=0;j<len2;++j){
				ret=ret+" "+tmp[j]["v"];
			}
			console.log(this.vertices[i]+" ->>> "+ret);
		}
	};
	//遍历：可以寻找特定顶点、寻找两顶点路径、检查图的连通性、检查图是否含有环
	//BFS
	this.bfs=function(v,callback){
		var index=0,
			nums=new Dictionary(),
			queue=new Queue();
		queue.enqueue(v);
		nums.set(v,index++);//标识已经访问过（被加入队列）
		while(!queue.isEmpty()){
			var tmp=queue.dequeue();
			var tmpNode=this.gra.get(tmp);
			
			var i,
				len=tmpNode.length;
			for(i=0;i<len;++i){
				if(!nums.has(tmpNode[i]["v"])){
					queue.enqueue(tmpNode[i]["v"]);
					nums.set(tmpNode[i]["v"],index++);//标识已经访问过（被加入队列）
					
/* 					if(tmpNode[i]["v"]==='D'){
						debugger;
					} */
				}
			}
			if(callback){
				callback(tmp);
			}
		}
	};
	//DFS
	var _dfs=function(v,index,nums,callback){
		
		if(callback){
			callback(v);
		}
		
		nums.set(v,index++);
		var tmpNode=that.gra.get(v),//tmpNode=this.gra.get(v),此时的this指向window？dfs在window对象下调用_dfs，所以this指向window
			i,
			len=tmpNode.length;
		for(i=0;i<len;++i){
			if(!nums.has(tmpNode[i]["v"])){
				_dfs(tmpNode[i]["v"],index,nums,callback);
			}
		}
	};
	this.dfs=function(v,callback){
		var index=0,
			nums=new Dictionary();
		
		_dfs(v,index,nums,callback);
	};
	//转换为邻接矩阵.多源多目标最短问题。生成最短树问题？？？
	this.toMatrix=function(){
		var len=this.vertices.length;
		for(var i=0;i<len;++i){
			var tmp=[];
			for(var j=0;j<len;++j){
				tmp[j]=0;;
			}
			this.matrix.push(tmp);
		}
		
		//获取字母在数组中的索引
		var getIndex=function(value){
			return that.vertices.indexOf(value);
		};
		
		this.vertices.forEach(function(u){
			var tmpNode=that.gra.get(u);//Object.keys(this.gra).forEach,this为undefined，因此改为that
			tmpNode.forEach(function(v){
				that.matrix[getIndex(u)][getIndex(v['v'])]=v['weight'];
			})
		});
	}

};


//无向图
var graph=new Graph(true);
var myvertices=['A','B','C','D','E','F','G','H','I'];
for(var i=0,len=myvertices.length;i<len;++i){
	graph.addVertex(myvertices[i]);
}
graph.addEdge('A','B',1);
graph.addEdge('A','C',1);
graph.addEdge('A','D',1);
graph.addEdge('C','D',1);
graph.addEdge('C','G',1);
graph.addEdge('D','G',1);
graph.addEdge('D','H',1);
graph.addEdge('B','E',1);
graph.addEdge('B','F',1);
graph.addEdge('E','I',1);

function printNode(value){
	console.log('Visited vertex: '+value);
}
this.graph.bfs(myvertices[0],printNode);
this.graph.dfs(myvertices[0],printNode);

//无向图
var NoDirection=function(){
	Graph.call(this,true);
	
	//bfs变种，搜寻最短路径(只适用于不考虑权值，只考虑边数的情况！)
	this.minDis=function(v,callback){
		var index=0,
			queue=new Queue(),
			nums=new Dictionary();
		//输出路径和最短值
		var dis={},
			pred={};
		this.vertices.forEach(function(value){
			dis[value]=0;
			pred[value]=null;
		});
			
		queue.enqueue(v);
		nums.set(v,index++);
		while(!queue.isEmpty()){
			var tmp=queue.dequeue(),
				tmpNode=this.gra.get(tmp);
			var i,
				len=tmpNode.length;
			for(i=0;i<len;++i){
				var u=tmpNode[i]["v"];
				if(!nums.has(u)){
					queue.enqueue(u);
					nums.set(u,index++);
					//路径和权值记录！
					dis[u]=dis[tmp]+tmpNode[i]["weight"];
					pred[u]=tmp;
				}
			}
		}
		return {
			'distance':dis,
			'predece':pred
		}
	};
};

//有向图
var Direction=function(){
	Graph.call(this,false);
	var INF=Number.MAX_SAFE_INTEGER;
	
	//dijkstra不适用于带有负权值的图！
	this.dijkstra=function(v){
		//私有函数，求tobechecked中dist最小的点
		var minDistance=function(toBecheck,dist){
			//var INF=Number.MAX_SAFE_INTEGER;//定义的作用域外面没有INF，局部作用域没有传入INF，所以：1、定义在this.dijkstra之内，二
			var min=INF,
				minIndex='';
			toBecheck.forEach(function(value){
				if(dist[value]<=min){
					min=dist[value];
					minIndex=value;
				}
			});
			toBecheck.splice(toBecheck.indexOf(minIndex),1);//访问后踢出队列
			return minIndex;//返回对应的字母
		};
		
		var pred={},//记录父节点
			dist={},//记录路径距离
			toBecheck=this.vertices.concat();//拷贝一份
		
		toBecheck.forEach(function(value){
			dist[value]=INF;
		});
		
		dist[v]=0;
		while(toBecheck.length>0){
			var minU=minDistance(toBecheck,dist);
			var tmpNode=this.gra.get(minU);
			tmpNode.forEach(function(value){
				var minV=value["v"];
				if(toBecheck.indexOf(minV)!==-1){
					if(dist[minV]>(dist[minU]+value["weight"])){
						dist[minV]=dist[minU]+value["weight"];
						pred[minV]=minU;
					}
				}
			})
		}
		return {
			'distance':dist,
			'predece':pred
		}
	};
	//ford算法，支持权值为负的图
	this.ford=function(v){
		var pred={},
			dist={};
		var toBecheck=this.vertices.concat();
		toBecheck.forEach(function(value){
			dist[value]=INF;
		});
		dist[v]=0;
		
		var i,
			j,
			len=toBecheck.length;
		var tmpU,tmpV,tmpNode,flag;
		//外层循环边--|V|-1次（v表示顶点，e表示边）
		for(i=1;i<len;++i){
			flag=false;
			//循环每一条边,进行松弛操作！
			for(j=0;j<len;++j){
				tmpU=toBecheck[j];
				tmpNode=this.gra.get(tmpU);
				tmpNode.forEach(function(value){
					tmpV=value['v'];
					if(dist[tmpV]>(dist[tmpU]+value['weight'])){
						dist[tmpV]=dist[tmpU]+value['weight'];
						pred[tmpV]=tmpU;
						flag=true;
					}
				});
			}
			//优化，如果未修改则退出循环
			if(!flag){
				break;
			}
		}
		//检查是否为负回路，权值之和小于0的环路
		//循环每一条边
		for(j=0;j<len;++j){
			tmpU=toBecheck[j];
			tmpNode=this.gra.get(tmpU);
			tmpNode.forEach(function(value){
				tmpV=value['v'];
				if(dist[tmpV]>(dist[tmpU]+value['weight'])){
					throw new Error("Graph contains a negative-weight cycle");
				}
			});
		}
		return {
			'distance':dist,
			'predece':pred
		};
	};
	
	//标记校正版和标记设置版本，通用代码实现？
	
	//多源多目标的最短路径实现
	
	//输出路径和最短路径值！
	this.showRoute=function(obj){
		var dist=obj.distance,
			pred=obj.predece;
		
		this.vertices.forEach(function(value){
			var ret='A';
			ret=ret+'>'+value+'('+dist[value]+')'+':';
			ret=ret+value;
			while(typeof pred[value]!=="undefined"){
				ret=ret+' '+pred[value];
				value=pred[value];
			}
			console.log(ret);
			
		});
	}
};

var graph2=new Direction();
myvertices=['A','B','C','D','E','F'];
for(var i=0,len=myvertices.length;i<len;++i){
	graph2.addVertex(myvertices[i]);
}
graph2.addEdge('A','B',2);
graph2.addEdge('A','C',4);
graph2.addEdge('B','C',2);
graph2.addEdge('B','D',4);
graph2.addEdge('B','E',2);
graph2.addEdge('C','E',3);
graph2.addEdge('D','F',2);
graph2.addEdge('E','D',3);
graph2.addEdge('E','F',2);



