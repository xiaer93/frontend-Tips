/*
	常见的排序算法
	选择、冒泡、快速、希尔
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
		for(j=i+1;j<len;++j){
			if(results[i]>results[j]){
				swap(results,i,j);
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
	[function 希尔排序]
	
*/
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