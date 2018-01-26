/*
	常见的排序算法
	选择、冒泡、插入、快速、希尔
	
	常见的搜索算法
	顺序搜索、二分法搜索
	
	动态规划和贪心算法（分而治之）
*/

var data=[2,3,1,4,5,7,1,9,10,0];

var util={};

/*
	[function 冒泡法排序]
	@param		[array]	data	[description]
	@return 	[array]			[description]
*/

util.buble=function(data){
	var i,
		j,
		flag=true,
		len=data.length;
	var results=deepCopy(data);
	for(i=0;i<len && flag;++i){
		flag=false;
		for(j=len-1;i<j;--j){
			if(results[j-1]>results[j]){
				swap(results,j-1,j);
				flag=true;
			}
		}
	}
	return results;
}

/*
	[function 选择排序]
	
*/
util.select=function(data){
	var i,
		j,
		min,
		len=data.length;
	var results=deepCopy(data);
	for(i=0;i<len;++i){
		for(min=i,j=min+1;j<len;++j){
			if(results[j]<results[min]){
				min=j;
			}
		}
		if(i!==min)
			swap(results,i,min);
	}
	return results;
}

/*
	[function 插入排序]	[description 选择排序是依次挑选极小值进行交换；插入排序是将大数依次移动至索引i处，再将i处的小值放入适当位置！]
*/
util.insert=function(data){
	var len=data.length;
	var results=deepCopy(data);
	var i,
		j,
		iDate;
	//将大数依次向后移动
	for(i=1;i<len;++i){
		iDate=data[i];
		for(j=i;j>0 && results[j-1]>iDate;j--){
			results[j]=results[j-1];
		}
		results[j]=iDate;
	}
	return results;
}

//算法的计算时间往往比数组的增长速度要快，所以进行划分！
//基础算法时间复杂度O(n^2),高级算法约为O(nlgn)
/*
	[function 希尔排序]	[description	对插入排序的改进！]
	
*/
util.shell=function(data){
	var i,
		h,
		len=data.length,
		increment=[];
	//构建最佳的分组距离
	for(h=1;h<len;){
		increment.push(h);
		h=3*h+1;
	}
	
	var results=deepCopy(data);
	var j,
		k,
		hTmp,
		dTmp;
	while(increment.length>0){
		h=increment.pop();
		for(hTmp=h;hTmp<2*h;++hTmp){
			//插入排序,数组以索引增量为hTmp递增构建！，即[0,hTmp],[1,hTmp+1]等等数组
			//此处还可以使用其他排序方法，如冒泡
			for(j=hTmp;j<len;j=j+hTmp){
				dTmp=results[j];
				for(k=j;k-hTmp>=0 && results[k-hTmp]>dTmp;k=k-hTmp){
					results[k]=results[k-hTmp];
				}
				results[k]=dTmp;
			}
		}
	}
	return results;
}



/*
	[function 快速排序]
*/

util.quick=function(data){
	var first=0,
		last=data.length;
	
	var results=deepCopy(data);
	
	if(last<2){
		throw new Error("快速排序适用于30个以上数据排序！");
	}
	
	//寻找最大的数,放在数组末尾！
	var i,
		max;
		
	for(max=0,i=max+1;i<last;++i){
		if(results[i]>data[max]){
			max=i;
		}
	}
	swap(results,max,last-1);
	
	_quick(results,first,last-2);
	
	return results;
	
}
//此处默认right和left为基本量
function _quick(data,left,right){
	var lower=left+1,
		upper=right,
		middleDate,
		middle=Math.ceil((left+right)/2);
	swap(data,left,middle);
	middleDate=data[left];
	
	while(lower<=upper){
		while(data[lower]<=middleDate){
			lower++;
		}
		while(data[upper]>middleDate){
			upper--;
		}
		if(lower<upper){
			swap(data,lower,upper);
		}else{
			lower+=1;
		}
	}
	swap(data,left,upper);
	if(left<(upper-1))
		_quick(data,left,upper-1);
	if((upper+1)<right)
		_quick(data,upper+1,right);
}

/*
	[function 归并排序]
*/

util.merge=function(data){
	var left=0,
		right=data.length-1;
	var results=deepCopy(data);
	_merge(results,left,right);
	return results;
}
function _merge(data,left,right){
	if(left<right){
		var middle=Math.floor((left+right)/2);//此地必须使用floor，(0+1)/2=0.5，取floor后返回0，即可避免_merge无限循环！
		_merge(data,left,middle);
		_merge(data,middle+1,right);
		_mergeSort(data,left,right);
	}
}
function _mergeSort(data,left,right){
	var tmpDate=[],
		first=left,
		last=right,
		middle=Math.floor((first+last)/2);
	var i=first,
		j=middle+1;
	while(i<=middle && j<=last){
		if(data[i]<data[j]){
			tmpDate.push(data[i]);
			i++;
		}else{
			tmpDate.push(data[j]);
			j++;
		}
	}
	while(i<=middle){
		tmpDate.push(data[i++]);
	}
	while(j<=last){
		tmpDate.push(data[j++]);
	}
	console.log(tmpDate);
	
	for(var k=left;k<=right;++k){
		data[k]=tmpDate.shift();
		//可以使用判断，如果数据相同，则不拷贝！
	}
}

/*
	[function 交换函数]
*/
function swap(data,left,right){
	console.log(data[left],data[right]);
	var tmp=data[left];
	data[left]=data[right];
	data[right]=tmp;
}

/*
	[function 深度拷贝函数]
*/
function deepCopy(data){
	return data.slice();
	
}

/*
	[function 顺序搜索]
*/
function sequentialSearch(array,value){
	var i=0,
		len=array.length;
	for(;i<len;++i){
		if(array[i]===value){
			return i;
		}
	}
	return -1;
};
/*
	[function 二分法搜索，必须先排序]
*/
function binarySearch(array,value){
	array.sort();//升序
	var low=0,
		height=array.length-1,
		middle;
	while(low<=height){
		middle=Math.floor((low+height)/2);
		if(array[middle]<value){
			low=middle+1;
		}else if(array[middle]>value){
			height=middle-1;
		}else{
			return middle;
		}
	}
	return -1;
}

/*
	动态规划
*/
/*
	找零问题。
	已知美国有1、5、10、25美分，求找零36美分的最小钱币数量方案！
*/
function MinCoinChange(coins){
	var coins=coins;
	var cache=[];
	var min,ret;
	
	//对输入的钱面值排序，升序
	coins.sort(function(a,b){return b-a});
	
	this.makeChange=function(amount){
		(function _go(money){
			//如果当前次数大于最小次数，直接退出循环！
			if(min && min<cache.length){
				return;
			}
			
			//根据money判断
			if(money>0){
				coins.forEach(function(value){
					//cache栈的值，从下到上依次递减（优化之一）
					if(cache.length>0 && value>cache[cache.length-1]){
						return;
					}
					cache.push(value);
					_go((money-value))
					cache.pop();
				});
			}else if(money<0){
				return;
			}else{
				min=cache.length;
				ret=cache.concat();
				console.log('OK');
			}
		})(amount);
		return ret;
	}
}
var s=new MinCoinChange([1,5,10,25]);
s.makeChange(36);

/*
	背包问题
	背包能够承受的重量已知，一堆货品的重量和价值已知。求最大携带货品的价值
	//有递归版本和非递归（表格版本）
*/
function knapSack1(info){
	var names=info.name,
		value=info.value,
		weight=info.weight,
		capacity=info.capacity;
	var cacheName=[],
		cacheValues=0,
		max,
		ret;
		
		
	var getValues=function(){
		return cache.reduce(function(a,b){return a+b;},0);
	};
	
	(function _go(index,cap){
		
		if(cap>0){
			var i,
				len=names.length;
			for(i=index;i<len;++i){
				cacheName.push(names[i]);
				cacheValues=cacheValues+value[i];
				_go(i,cap-weight[i]);
				cacheName.pop();
				cacheValues=cacheValues-value[i];
			}
		}else if(cap<0){
			return;
		}else{
			if(typeof max==="undefined"){
				max=cacheValues;
				ret=cacheName.concat();
			}else{
				if(max<cacheValues){
					max=cacheValues;
					ret=cacheName.concat();
				}
			}
			console.log('aaa');
		}
	})(0,capacity);
	
	return {
		'max':max,
		'name':ret
	};
}

var bag={
	name:['1#','2#','3#'],
	value:[3,4,5],
	weight:[2,3,4],
	capacity:5
}

var ss=knapSack1(bag);
/*
	背包问题表格版
	capacity为背包承重量，weight为货品重量数组，value为货品价值，n为货品数量！
*/

function findValue(n,capacity,ks,weight,value){
	var i=n,k=capacity;
	while(i>0 && k>0){
		if(ks[i][k]!==ks[i-1][k]){
			console.log(i+'# '+weight[i-1]+'kg '+value[i-1])
			i--;
			k=k-ks[i][k];
		}else{
			i--;
		}
	}
};
function knapSack2(capacity,weight,value,n){
	var i,w,a,b,ks=[];
	for(i=0;i<=n;i++){
		ks[i]=[];
	}
	
	for(i=0;i<=n;++i){
		for(w=0;w<=capacity;++w){
			if(i===0 || w===0){
				ks[i][w]=0;
			}else if(weight[i-1]<=w){
				a=value[i-1]+ks[i-1][w-weight[i-1]];
				b=ks[i-1][w];
				ks[i][w]=(a>b)?a:b;
			}else{
				ks[i][w]=ks[i-1][w];
			}
		}
	}
	findValue(n,capacity,ks,weight,value);
	return ks[n][capacity];//此值即为最大值！
}



/*
	最长公共子序列
	最长子序列指的是：在两个字符串以相同顺序出现，但是不要求连续的字符串！
*/
function lcs1(wordX,wordY){
	var cache=[];
	var i,j,
		lenx=wordX.length,
		leny=wordY.length;
	
	var ret,
		max;
	
	//x为wordx索引，y为wordy索引
	(function _go(x,y){
		//如果有一方面结束了，就判断
		if(x===lenx || y===leny){
			if(!max){
				ret=cache.join('');
				max=ret.length;
			}else if(max<cache.length){
				ret=cache.join('');
				max=ret.length;
			}
		}else{
			var a=x,
				b=y;
			for(;a<lenx;a++){
				var tmp=wordX[a];
				b=wordY.indexOf(tmp,b);
				if(b>-1){
					cache.push(tmp);
					_go(a+1,b+1);
					cache.pop();
				}
			}
		}
	})(0,0);
	
	return {
		'string':ret,
		'max':max
	};
}
var sss=lcs1('acbaed','abcadf');
//var sss=lcs('acbaed','acbaed');

//表格版本LCS
function lcs2(wordX,wordY){
	var m=wordX.length,
		n=wordY.length,
		table=[],
		i,j,a,b;
	//用于输出的表格solution
	var solution=[];
	for(i=0;i<=m;++i){
		table[i]=[];
		solution[i]=[];
		for(j=0;j<=n;++j){
			table[i][j]=0;
			solution[i][j]='0';
		}
	}
	
	for(i=0;i<=m;i++){
		for(j=0;j<=n;j++){
			if(i===0|| j===0){
				table[i][j]=0;
			}else if(wordX[i-1]===wordY[j-1]){
				table[i][j]=table[i-1][j-1]+1;
				solution[i][j]='diagonal';
			}else{
				a=table[i-1][j];
				b=table[i][j-1];
				table[i][j]=(a>b)?a:b;
				solution[i][j]=(table[i][j]===table[i-1][j])?'top':'left';
			}
		}
	}
	var ret=printSolution(solution,table,wordX,wordY,m,n);
	return ret;
}
var printSolution=function(solution,table,wordX,wordY,m,n){
	var a=m,b=n,i,j,
		x=solution[a][b],
		answer='';
	
	while(x!=='0'){
		if(solution[a][b]==='diagonal'){
			answer=wordX[a-1]+answer;
			a--;
			b--;
		}else if(solution[a][b]==='left'){
			b--;
		}else if(solution[a][b]==='top'){
			a--;
		}
		x=solution[a][b];
	}
	return answer;
}
var ssss=lcs2('acbaed','acbaed');

/*
	贪心算法
	期盼通过每个阶段的局部最优选择，从而达到全局最优解。不像动态规划那样计算更大的格局！
*/
/*
	贪心算法找钱币
	###如果面值为【1，3，4】，找零6元。
		- 动态规划为【3，3】
		- 贪心算法为【4，1，1】
*/

function MinCoinChange3(coins){
	var coins=coins;
	coins.sort();
	
	this.makeChange=function(amount){
		var cache=[],
			total=0;
		for(var i=coins.length-1;i>=0;i--){
			var tmp=coins[i];
			while((total+tmp)<=amount){
				cache.push(tmp);
				total+=tmp;
			}
		}
		return cache;
	}
}