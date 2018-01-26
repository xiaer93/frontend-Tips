/*
	高性能js之算法和流程控制
	-代码的多少并不能决定程序运行的速度（如递归和非递归），代码的组织结构和解决具体问题的思路是影响代码性能的主要因素！
	
*/

/*
	js提供4种循环：1、for；2、while；3、do-while；4、for-in
	-for-in同于遍历对象的属性，包括其从原型链继承而来的属性（每次迭代都会搜寻实例和原型属性，所以比较慢）
		-对象属性的数量未知才使用for-in
		-不要对数组使用for-in
	-其余3中循环，性能几乎相当。优化的方向：迭代的次数、迭代处理的事务
*/
var outInfo=['a','b'];
for(var i=0;i<outInfo.length;++i){
	console.log(outInfo[i]);
}
//使用局部变量减少属性访问（局部变量和基本量访问速度较快）
for(var i=0,len=outInfo.length;i<len;++i){
	console.log(outInfo[i]);
}
//使用倒序提高循环效率.i会自动会转为布尔值，从2次比较（i<len && 是否为true）较少到1次比较！
for(var i=outInfo.length;i--;){
	console.log(outInfo[i]);
}
//ECMAScript为数组新增forEach方法，但是基于速度的考虑不是合适选择
outInfo.forEach(function(value,index,array){
	console.log(value);
})
/*
	duffs'device对于循环次数大于1000次时，效率明显！
*/
/*
适用于c++?不适用于javascript，items[-1]无法取得正常值！
function duffs(items,process){
	var i=items.length%8;
	while(i){
		process(items[i--]);
	}
	i=Math.floor(items.length/8);
	while(i){
		process(items[i--]);
		process(items[i--]);
		process(items[i--]);
		process(items[i--]);
		process(items[i--]);
		process(items[i--]);
		process(items[i--]);
		process(items[i--]);
	}
}
*/

function duffs(items,process){
	var iterations=Math.floor(items.length/8),
		startAt=items.length%8,
		i=0;
	do{
		switch(startAt){
			case 0:process(items[i++]);
			case 7:process(items[i++]);
			case 6:process(items[i++]);
			case 5:process(items[i++]);
			case 4:process(items[i++]);
			case 3:process(items[i++]);
			case 2:process(items[i++]);
			case 1:process(items[i++]);
		}
		startAt=0;
	}while(iterations--);
}

/*
	条件语句if和switch，性能相当！
	-当需要判断多个离散值时，推荐使用switch（如事件委托，name=['a','b','c']）
	-优化if的目标是最小化到达正确分支所需要判断的条件数量。因此大概率放在最前面
*/
function judge1(value){
	if(value===0){
		console.log(0);
	}else if(value===1){
		console.log(1);
	}else if(value===2){
		console.log(2);
	}else if(value===3){
		console.log(3);
	}else if(value===4){
		console.log(4);
	}else if(value===5){
		console.log(5);
	}
}
//如果传入值为5，则需要进行6次判断。优化后只需要3次
function judge2(value){
	if(value<3){
		if(value===0){
			console.log(0);
		}else if(value===1){
			console.log(1);
		}else{
			console.log(2);
		}
	}else{
		if(value===3){
			console.log(3);
		}else if(value===4){
			console.log(4);
		}else{
			console.log(5);
		}
	}
}
//对于离散数，switch更快。
function judge3(value){
	switch(value){
		case 0:return 0;
		case 1:return 1;
		case 2:return 2;
		case 3:return 3;
		case 4:return 4;
		case 5:return 5;
	}
}
//对于单个键和值存在逻辑映射，推荐使用数组。而switch适用于每个键对应一些列动作！
function judge4(value){
	var results=[0,1,2,3,4,5];
	return results[value];
}

/*
	递归优化：1、缺少终止条件导致界面假死；2、触发调用栈大小限制错误！
	-递归分类：1、调用自身；2、相互调用
	-如果发生栈大小限制错误，将递归改为迭代或者memoization（以内存换时间）
*/
function fb1(n){
	return n <2? n : fb1(n -1) + fb1(n -2);
}
//使用迭代优化
function fb2(n){
	if(n<2){
		return n;
	}else{
		var one=0,
			two=1,
			sum=0;
		for(var i=2;i<=n;++i){
			sum=one+two;
			one=two;
			two=sum;
		}
		return sum;
	}
}
//使用memoization优化，以内存换速度
function fb3(n){
	var result="";
	if(n<2){
		fb3.cache[n]=n;
	}else{
		if(!fb3.cache[n]){
			result=fb3(n-1)+fb3(n-2);
			fb3.cache[n]=result;
		}
		return fb3.cache[n];
	}
}
fb3.cache={};
//归并算法的优化
function merge(left,right){
	var result=[];
	while(left.length>0 && right.length>0){
		if(left[0]<right[0]){
			result.push(left.shift());
		}else{
			result.push(right.shift());
		}
	}
	return result.concat(left).concat(right);
}
function mergeSort1(items){
	if(items.length===1){
		return items;
	}
	var middle=Math.floor(items.length/2),
		left=items.slice(0,middle),
		right=items.slice(middle);
	return merge(mergeSort(left),mergeSort(right));
}
//递归改迭代
function mergeSort2(items){
	if(items.length===1){
		return itemss;
	}
	var work=[]
	for(var i=0,len=items.length;i<len;i++){
		work.push([items[i]]);
	}
	work.push([]);
	for(var lim=len;lim>1;lim=(lim+1)/2){
		for(j=0,k=0;k<lim;j++,k+=2){
			work[j]=merge(work[k),work[k+1]);
		}
		work[j]=[]
	}
	return work[0];
}
//memoization，适用于斐波切数列和阶乘等等
function memoize(func,cache){
	cache=cache || {};
	var shell=function(arg){
		if(!cache.hasOwnProperty(arg)){
			cache[arg]=func(arg);
		}
		return cache[arg];
	}
	return shell;
}
