/*
	波兰式和逆波兰式
	正常算术表达式为中序遍历、波兰式；经转换为后序表达式、即逆波兰式；
	主要应用于解析器和算术表达式
*/

/*
	此函数只计算简单的四则运算，同时支持圆括号
*/
var util={};

/*
	中序转后序，逆波兰式
*/

util.toPostOrder=function(str){
	var number=/\d{1,}(\.[\d]+)?/g;
	var ch=/[+\-*\/]{1}/;
	var nu=/\d/;
	
	var op={
		"+":1,
		"-":1,
		"*":2,
		"/":2,
		"(":0,
		")":0
	};
	var compare=function(lf,rg){
		return op[lf]>=op[rg];
	};
	
	var index=0,
		len=str.length;
	
	var outStack=[],
		tmpStack=[];
	
	var skip=function(){
		while(str[index]===" "){
			index+=1;
		}
	}
	
	while(index<len){
		skip();
		if(nu.test(str[index])){
			number.lastIndex=index;
			var tmp=number.exec(str);
			index=index+tmp[0].length;
			outStack.push(parseFloat(tmp[0]));
		}else if(ch.test(str[index])){
			var tmp=str[index];
			
			while(compare(tmpStack[tmpStack.length-1],tmp)){
				outStack.push(tmpStack.pop());
			}
			
			tmpStack.push(str[index]);
			index+=1;
		}else if(str[index]==="("){
			tmpStack.push(str[index]);
			index+=1;
		}else if(str[index]=")"){
			while(tmpStack.length>0 && tmpStack[tmpStack.length-1]!=="("){
				outStack.push(tmpStack.pop());
			}
			if(tmpStack[tmpStack.length-1]!=="("){
				throw new Error("圆括号不匹配");
			}else{
				tmpStack.pop();
			}
			index+=1;
		}else{
			;
		}
		skip();
	}
	
	while(tmpStack.length>0){
		outStack.push(tmpStack.pop());
	}
	
	return outStack;
}

/*
	[function 对后序表达式（逆波兰式）进行计算！]
*/

util.calc=function(str){
	var numStack=[];
	var inputStack=util.toPostOrder(str);
	
	while(inputStack.length>0){
		while(typeof inputStack[0] === "number"){
			numStack.push(inputStack.shift())
		}
		var a=numStack.pop(),
			b=numStack.pop(),
			ret;
		var op=inputStack.shift();
		switch(op){
			case "*":
				ret=a*b;
				break;
			case "/":
				ret=a/b;;
				break;
			case "+":
				ret=a+b;
				break;
			case "-":
				ret=a-b;
				break;
		}
		numStack.push(ret);
	}
	var ret=numStack.pop();
	if(typeof ret=== "number"){
		return ret.toFixed(2);
	}else{
		throw new Error("结果错粗~");
	}
}