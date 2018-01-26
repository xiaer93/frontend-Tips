'use strict'

var a="g";
function func(){
	a="l";	//访问全局变量
	//b="l";	//声明全局变量,全局变量在严格模式下禁止这样！
	console.log(a);
}
func();
console.log(a);

//实现页面内容搜索匹配
/* var p=/hello/g;
var str=document.getElementsByTagName("p")[0].innerHTML;
var index=0,
	last=0,
	result="";
var match=null;
while((match=p.exec(str))!==null){
	index=match.index;
	result=result+str.substring(last,index);
	result=result+"<span class='light'>"+match[0]+"</span>";
	
	last=index+match[0].length;
}
result+=str.substring(last);

document.getElementsByTagName("p")[0].innerHTML=result; */

//设置最大的圆
var box=document.querySelector("#elem");
var style=window.getComputedStyle(box);
var width=parseInt(style.width),
	height=parseInt(style.height),
	min=Math.min(width,height);
var cir=document.getElementById("circ");
circ.setAttribute("r",min/2);
circ.setAttribute("cx",min/2);
circ.setAttribute("cy",min/2);

//将二维数组转为一维数组
var array1=[[1,2,3],[4,5,6]];
var array1_out=array1.concat.apply([],array1);

//forEach遍历nodelist集合
var array2=document.querySelectorAll("p");
//为什么不能使用apply？call将后者作为参数，而apply使用数组包裹再传递！
Array.prototype.forEach.call(array2,function(item){
	console.log(item.innerHTML);
});
//将arguments和nodelist等转为数组
Array.prototype.slice.call(array2);

//存储表单数据，array3[key]=value;
var object1={
	"name":"xiaer93"
}
Object.keys(object1).forEach(function(key){
	console.log(key+":"+object1[key]);
})

//函数和变量声明会被提升，但是实例化过程却不会（或者说初始化）
console.log(show1());
function show1(){
	return "show1";
}
//声明提升了，但是却未初始化！！！！
//console.log(show2());
var show2=function(){
	return "show2";
}

//创建能够记住数据的函数，但是不适用全局变量----闭包
function compareMake1(prototype){
	var p=prototype;
	return function(left,right){
		return left[p]-right[p];
	}
}
//使用局部应用减少冗余性（局部应用是一种方法）
function makeString(ldelim,str,rdelim){
	return ldelim+str+rdelim;
}
function quoteString(str){
	return makeString("'",str,"'");
}

//链化函数。必须返回该对象！
function Book(title,author){
	this.getTitle=function(){
		return 'Title:'+title;
	};
	this.setTitle=function(newTitle){
		title=newTitle;
		return this;
	};
	this.getAuthor=function(){
		return 'Author:'+author;
	};
	this.setAuthor=function(newAuthor){
		author=newAuthor;
		return this;
	}
}
var book=new Book("前端","xier93");
console.log(book.setTitle("找工作").getAuthor());

//可折叠片段
var elements=document.querySelectorAll("#accordion p");
elements[0].onclick=function(event){
	var e=elements[1];
	if(e.style.display=="none"){
		e.style.display="block";
	}else{
		e.style.display="none";
	}
	event.stopPropagation();
}

//淡出
var fadingObject={
	yellowColor:function(val){
		var r='ff',
			g='ff',
			b=val.toString(16);
		return '#'+r+g+b;
	},
	fade:function(id,start,finish){
		this.count=this.start=start;
		this.finish=finish;
		this.id=id;
		this.elem=document.getElementById(this.id);
		this.countDown=function(){
			this.count+=30;
			if(this.count>=this.finish){
				this.elem.style.background='transparent';
				this.countDown=null;
				return;
			}
			this.elem.background=this.yellowColor(this.count);
			setTimeout(this.countDown.bind(this),100);
		}
	}
}
