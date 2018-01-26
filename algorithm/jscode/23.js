/*
	设计模式-建造者模式
	- 应用场景：解耦部件和组装过程，应用于具体部件常需要修改的环境！
	- 案例：
	
	- 建造者模式可以将一个复杂对象的构建与表示进行分离，使得同样的构建过程可以创建不同的表示。
	- 建造和表象分离，建造过程获取数据&表象过程处理显示数据（表象即回调函数！）
	- 建造者模式的“加工工艺”是暴露的，这样使得建造者模式更加灵活，并且建造者模式解耦了组装过程和创建具体部件，使得我们不用去关心每个部件是如何组装的。
*/

//》ajax获取信息
//1-xhr发出请求
function aj(url,callback){
	//函数检测，是否存在XMLHttpRequest
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest()
	}else{
		var xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xhr.open('GET',url);
	xhr.onload=function(){
		if(xhr.status===200){
			var response=xhr.responseText;
			callback(response);
		}
	}
	xhr.send();
}

//组装部件，传入表现部分！
function getInfoByID(id,callback){
	var url='http://localhost/serverForjQueryGet.asp?name='+id;
	aj(url,callback)
}
//2-表现部分
function run(){
	//传入回调函数，建造和表现解耦！
	getInfoByID('xiaer',function(data){
		console.log(data);
	});
}
run();

//》应聘者信息
//1-人物
var Human=function(param){
	this.skill=param && param.skill || '保密';
	this.hobby=param && param.hobby || '保密';
};
Human.prototype={
	constructor:Human,
	getSkill:function(){
		return this.skill;
	},
	getHobby:function(){
		return this.hobby;
	}
};
//2-姓名类
var Name=function(name){
	var that=this;
	(function(){
		that.wholeName=name;
		var index=name.indexOf(' ');
		if(index>-1){
			that.firstName=name.slice(0,index);
			that.secondeName=name.slice(index+1);
		}
	})();
};
//3-职位类
var Work=function(work){
	this.work=work;
}
Work.prototype={
	constructor:Work,
	changeWork:function(work){
		this.work=work;
	}
}
//4-应聘者类。组装过程！
var Person=function(name,work){
	var _per=new Human();
	_per.name=new Name(name);
	_per.work=new Work(work);
	
	return _per;
}
var p=new Person('xiao ming','front-end');



//参考链接：http://www.cnblogs.com/TomXu