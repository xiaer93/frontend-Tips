
/*
	递归在数学上用于定义无限集合，如n!=/1 n=0 ++ n*(n-1) n>0/包含初始条件和归纳步骤！
	使用递归看上去更直观，代码量更小；但是递归利用程序栈，会储存大量的外层变量，需要对递归进行优化！
*/

/*
	1.尾递归
	尾递归，在每个函数实现的末尾只使用一个递归调用，也就是说当执行完调用后没有其他语句需要执行！并且执行递归调用之前也没有其他直接或间接的递归调用！
	尾递归可以进行优化，转为for循环
*/
//求阶乘的函数
var tail=function(i){
	if(i===0){
		return 1;
	}else{
		return i*tail(i-1);
	}
};
var tailByFor=function(i){
	var ret=1;
	for(;i>0;--i){
		ret=ret*i;
	}
	return ret;
}


/*
	2.非尾递归
	非尾递归转为非递归形式，通常需要使用栈
*/

//取反
var noTail=function(str){
	var len=str.length;
	
	function _go(index){
		var ch="";
		if(index<len){
			ch=str[index];
			_go(index+1);
			console.log(ch);
		}
	}
	_go(0);
};
//
var noTailByFor=function(str){
	var ret="",
		len=str.length;
	
	var stack=[];
	for(var i=0;i<len;++i){
		stack.push(str[i]);
	}
	while(stack.length>0){
		console.log(stack.pop());
	}
}


/*
	3.间接递归
	通过不同的中间调用链调用自身，应用：1、消息接收解码储存；2、表达式计算
*/
//算术表达式计式
var sum=function(){
	var pattern=/[.\d]+/g;
	var str="";
	var index=0;
	
	var e1=function(){
		var ret=e2();
		while(true){
			//清除数字的后置位空格
			while(str[index]===" "){
				++index;
			}
			switch(str[index]){
				case "+":
					++index;//index+=1必须在上面，索引进一位！
					ret=ret+e2();
					break;
				case "-":
					++index;
					ret=ret-e2();
					break;
				default:
					return ret;
			
			}
		};
	}
	var e2=function(){
		var ret=e3();
		while(true){
			//清除数字后置位的空格
			while(str[index]===" "){
				++index;
			}
			switch(str[index]){
				case "*":
					++index;
					ret=ret*e3();
					break;
				case "/":
					++index;
					ret=ret/e3();
					break;
				default:
					return ret;
			}
		}
	};
	var e3=function(){
		var ret;
		var flag=1;
		//清除首个数字前置位空格！
		while(str[index]===" "){
			index+=1;
		}
		if(str[index]==="-"){
			flag=-1;
			index+=1;
		}
		//主要计算部分
		if(str[index]==="("){
			index+=1;
			var retTmp=e1();
			while(str[index]===" "){
				index+=1;
			}
			if(str[index]!==")"){
				throw new Error("括号不匹配！");
			}else{
				ret=retTmp;
				index+=1;
			}
		}else{
			pattern.lastIndex=index;
			var retTmp=pattern.exec(str);
			index=index+retTmp[0].length;
			ret=parseFloat(retTmp);
		}
		
		//如果为），或者str[index]为undefined，则返回值！
		return ret*flag;
	}
	
	this.calc=function(s){
		str=s;
		index=0;
		return e1();
	}
}

/*
	嵌套递归，
		|0			n=0
	h(n)|n			n>4
		|h(2+h(2n))	n<=4
*/

/*
	不合理递归，斐波切数列，递归次数增长太快！推荐使用迭代法、或者近视公式直接计算！
			|n					n<2
	Fib(n)	|Fib(n-2)+Fib(n-1)	其他情况
*/

var fib=function(n){
	if(n<2){
		return n;
	}else{
		return fib(n-2)+fib(n-1);
	}
};
var fibByFor=function(n){
	if(n<2){
		return n;
	}else{
		var i,
			upTwo=0,
			upOne=1,
			result=0;
		for(i=2;i<=n;++i){
			result=upTwo+upOne;
			upTwo=upOne;
			upOne=result;
		}
		
		return result;
	}
}

/*
	解决回溯问题，从给定的位置出发有许多不同的路径，但不知道哪一条路径才能解决问题，尝试一条路径不成功后，我们返回出发点并尝试其他路径！（回溯后原有状态清零）
	而迷宫问题，回溯也不需要清零原有状态，使用栈很好解决该问题！
	---八皇后---经典问题
	//上、下、左、右、2斜线，均不能重复！
*/
//简化问题，解决4皇后问题
var ChessBoard=function(){
	//储存皇后的数组
	var queen=[];
	
	var row=4,
		col=4,
		addRight=3;
	//创建左斜线，左斜线r+c=0-6
	var leftFlag=new Array(7);
	leftFlag.fill(0);
	//创建右斜线，右斜线r-c=-3-3，因此添加addRight！
	var rightFlag=new Array(7);
	rightFlag.fill(0);
	//创建列线
	var colums=new Array(4);
	colums.fill(0);
	
	var _go=function(r,c){
		
		//是否找到结果检测
		if(r===4){
			console.log(queen.toString());
		}
		
		//边界检查：：：列不会越界&行的上边界可能越界；还要检查位置是否可用！
		if(!(r<4 && leftFlag[r+c]===0 && rightFlag[r-c+addRight]===0 && colums[c]===0)){
			return;
		}
		
		//添加皇后
		queen.push([r,c]);
		//标记以被占用
		leftFlag[r+c]=1;
		rightFlag[r-c+addRight]=1;
		colums[c]=1;
		
		_go(r+1,0);
		_go(r+1,1);
		_go(r+1,2);
		_go(r+1,3);
		
		//标记解除，回溯ing
		leftFlag[r+c]=0;
		rightFlag[r-c+addRight]=0;
		colums[c]=0;
		//删除皇后
		queen.pop();
	}
	
	for(var i=0;i<col;++i){
		_go(0,i);
	}
}
