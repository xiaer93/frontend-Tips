/*
	设计模式-迭代器模式
	- 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
	- 
*/
//迭代器！
function each(ary,callback){
	for(var i=0,len=ary.length;i<len;++i){
		callback.call(null,ary[i],i);
		//根据callback的返回值，可以设计中止迭代器功能！
		/*
		if(callback(ary[i],i)===false){
			break;
		}
		*/
	}
}
each([1,2,3],function(t){
	console.log(t);
});
//通过接口调用的迭代器
function Iterator(array){
	this.array=array;
	this.index=0;
}
Iterator.prototype={
	constructor:Iterator,
	next:function(){
		this.index+=1;
	},
	getValue:function(){
		return this.array[this.index];
	},
	isDone:function(){
		return this.index===this.array.length;
	}
}
//实例，比较2个数组是否相等
function compare(ay1,ay2){
	//如果2个数组不相等，则直接返回false！
	if(ay1.length!==ay2.length){
		return false;
	}
	
	var aIt1=new Iterator(ay1);
	var aIt2=new Iterator(ay2);

	//遍历2个数组，如有不相等则返回false！
	while(!(aIt1.isDone() && aIt2.isDone())){
		if(aIt1.getValue()!==aIt2.getValue()){
			return false;
		}
		//切换下一个元素
		aIt1.next();
		aIt2.next();
	}
	return true;
}
//在ie创建xhr时，由于有多个版本，所以可以通过迭代方式寻找可以使用的方法
var xhrIE=['ie1','ie2','ie3'];
for(var i=0,len=xhrIE.length;i<len;++i){
	try{
		var xhr=new ActiveObject(xhrIE[i]);
	}
	catch(e){
		console.log(e.message);
	}
}