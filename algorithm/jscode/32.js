/*
	设计模式-组合模式
	- 组合模式将对象组合成树形结构，以表示“部分——整体”的层次结构。
	- 除了用来表示树形结构之外，组合模式的另一个好处是通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性（接口一致性）
	- 组合模式会创建过多的对象！！！
*/
//1-控制命令
var openDoor={
	excute:function(){
		console.log('打开门！');
	}
};
var closeDoor={
	excute:function(){
		console.log('关闭门');
	}
};
//组合对象
var MacroCommand=function(){
	var commandList=[];
	return {
		add:function(command){
			commandList.push(command);
		},
		//接口一致
		excute:function(){
			for(var i=0,len=commandList.length;i<len;++i){
				commandList[i].excute();
			}
		}
	}
};
//创建遥控器
var mc0=new MacroCommand();
mc0.add(openDoor);
mc0.add(closeDoor);
mc0.excute();
//2-将命令分组，如开关门、开关扣扣
var openQQ={
	excute:function(){
		console.log('打开扣扣!')
	}
};
var closeQQ={
	excute:function(){
		console.log('关闭扣扣!')
	},
	//组合对象可以拥有子节点，基本对象下面就没有子节点，所以也许会发生一些误操作，比如试图往基本对象中添加子节点。解决方案通常是给基本对象也增加add方法，并且在调用这个方法时，抛出一个异常来及时提醒客户
	add:function(){
		return new Error('基本对象不能添加子节点！');
	}
};
//创建遥控器
var mc1=new MacroCommand();
mc1.add(openQQ);
mc1.add(closeQQ);
//　请求从上到下沿着树进行传递，直到树的尽头。作为客户，只需要关心树最顶层的组合对象，客户只需要请求这个组合对象，请求便会沿着树往下传递，依次到达所有的子对象
//客户调用mc的对象，会沿着层次结构向下依次执行！
var mc=new MacroCommand();
mc.add(mc0);
mc.add(mc1);
mc.excute();

//定义文件夹
//a-文件对象和文件夹对象不是继承关系，而是Has关系，都拥有相同的接口！
//b-对象和子对象接口一致，具有一致性？
//c-如果某人既属于架构组又属于开发组，对象之间不是严格意义的层次结构，则不符合组合模式！

//文件夹
function Folder(name){
	this.name=name;
	this.parent=null;
	this.files=[];
}
Folder.prototype.add=function(file){
	file.parent=this;
	this.files.push(file);
};
Folder.prototype.scan=function(){
	console.log('开始扫描文件夹：',this.name);
	for(var i=0,len=this.files.length;i<len;++i){
		this.files[i].scan();
	}
};
Folder.prototype.remove=function(){
	if(!this.parent){
		return;
	}
	for(var filePList=this.parent.files,len=filePList.length;len>=0;--len){
		var file=filePList[len];
		if(file===this){
			filePList.splice(len,1);
		}
	}
}
//文件对象
function File(name){
	this.name=name;
}
File.prototype.add=function(){
	return new Error('文件对象不能添加子对象！');
};
File.prototype.scan=function(){
	console.log('扫描到的文件：',this.name);
};
File.prototype.remove=function(){
	//如果父对象不存在，则退出
	if(!this.parent){
		return;
	}
	for(var filePList=this.parent.files,len=filePList.length;len>=0;--len){
		var file=filePList[len];
		if(file===this){
			filePList.splice(len,1);
		}
	}
}

var folder=new Folder('C盘');
var folder1=new Folder('前端总结');
var folder2=new Folder('我的博客');

var file1=new File('js总结.pdf');
var file2=new File('面试资料.docx');

folder1.add(file1);
folder1.add(file2);
folder.add(folder1);
folder.add(folder2);
folder.scan();
console.log('---------------');
folder2.remove();
folder.scan();

//新闻类
function News(){
	this.children=[];
	this.element=null;
}
News.prototype.add=function(){
	return new Error('抽象方法需要重定义');
};
News.prototype.getElement=function(){
	return this.element;
};
News.prototype.init=function(){
	return new Error('抽象方法需要重定义');
};

//继承prototype函数
function inherit(sub,sup){
	var p=Object.create(sup.prototype);
	p.constructor=sub;
	sub.prototype=p;
}
//图片加载虚拟代理
var loadImg=(function (){
	return function(ele,src){
		ele.src=src;
	}
})();
var proxyImg=(function(){
	var img=new Image();
	return function(ele,src){
		img.src=src;
		img.onload=function(){
			loadImg(ele,src);
		};
		loadImg(ele,'loading.gif');
	}
})();

//组合模式
//新闻容器
function Container(id,parent){
	News.call(this);
	this.id=id;
	this.parent=parent;
	this.init();
}
inherit(Container,News);
Container.prototype.add=function(newsItem){
	this.children.push(newsItem);
	this.element.appendChild(newsItem.getElement());
	return this;
};
Container.prototype.init=function(){
	this.element=document.createElement('ul');
	this.element.id=this.id;
	//向parent中添加container
	this.parent.appendChild(this.element);
};
//新闻项目
function NewsItem(className){
	News.call(this);
	this.className=className;
	this.init();
}
inherit(NewsItem,News);
NewsItem.prototype.add=function(news){
	this.children.push(news);
	this.element.appendChild(news.getElement());
	return this;
};
NewsItem.prototype.init=function(){
	this.element=document.createElement('li');
	this.element.class=this.className || '';
}
//文字新闻
function TextNews(text,href,className){
	News.call(this);
	this.text=text;
	this.href=href;
	this.className=className;
	this.init();
}
inherit(TextNews,News);
TextNews.prototype.init=function(){
	this.element=document.createElement('a');
	this.element.innerHTML=this.text || '默认文字';
	this.element.href=this.href  || '#';
	this.element.class=this.className || '';
};
//图片新闻
function ImgNews(src,href,className){
	News.call(this);
	this.src=src;
	this.href=href;
	this.className=className;
	this.init();
}
inherit(ImgNews,News);
ImgNews.prototype.init=function(){
	this.element=document.createElement('a');
	var img=new Image();
	this.element.appendChild(img);
	this.element.href=this.href  || '#';
	this.element.class=this.className || '';
	//通过代理加载图片
	proxyImg(img,this.src || '');
};
//分类新闻???
function TypeNews(type,href,className){
	
}//?????????

//创建实例
var n1=new Container('n-one',document.body);
n1.add(new NewsItem().add(new TextNews('hello world!'))).add(new NewsItem().add(new ImgNews('data:image/jpeg;base64,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')));
