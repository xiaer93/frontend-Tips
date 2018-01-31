/*
	设计模式-享元模式
	- 享元模式是一种用于性能优化的模式。如轮播新闻条等
	- 内部状态：内部状态储存于对象内部、可以被一些对象共享、独立于应用场景、通常不会改变！
	- 外部状态：取决于场景，不能被共享！
	- 1、一个程序有大量相似的对象，由于大量对象带来大量开销。
*/
//1-模特拍照，创建多位模特
function Model(sex,underwear){
	this.sex=sex;
	this.underwear=underwear;
}
Model.prototype.takePhoto=function(){
	console.log(this.sex+':'+this.underwear);
}
//实例
for(var i=0;i<5;++i){
	var m0=new Model('男','underwear-'+i);
	m0.takePhoto();
}
//2-可不可以少聘请一点模特，节约成本
function Model2(sex){
	this.sex=sex;
}
Model2.prototype.takePhoto=function(underwear){
	console.log(this.sex+':'+underwear);
}
var m1=new Model2('女');
for(var i=0;i<5;i++){
	m1.takePhoto('underwear-'+i);
}


//多文件同时上传
//创建多个上传对象！
function Upload(uploadType,filename,filesize,parent){
	this.uploadType=uploadType;
	this.fileName=filename;
	this.fileSize=filesize;
	this.parent=parent;//储存元素的位置
	this.ele=null;
}
Upload.prototype={
	constructor:Upload,
	init:function(id){
		this.ele=document.createElement('p');
		this.ele.innerHTML='<span>文件名称：'+this.fileName+'，文件大小：'+this.fileSize+'</span>'+'<button class="delFile">删除</button>';
		var btn=this.ele.querySelector('.delFile');
		var _self=this;
		btn.onclick=function(){
			_self.del();
		};
		this.parent.appendChild(this.ele);
	},
	del:function(){
		if(this.filesize<3000){
			return this.ele.parentNode.removeChild(this.ele);
		}
		if(window.confirm('确定要删除文件吗？'+this.fileName)){
			return this.ele.parentNode.removeChild(this.ele);
		}
	}
}
function startUpload(uploadType,files){
	var parent=document.querySelector('.m-upload');
	for(var i=0,file;file=files[i++];){
		var up=new Upload(uploadType,file.fileName,file.fileSize,parent);
		up.init(i);
	}
}
/*
startUpload( 'plugin', [
{
    fileName: '1.txt',
    fileSize: 1000
},
{
    fileName: '2.html',
    fileSize: 3000
},
{
    fileName: '3.txt',
    fileSize: 5000
}
]);
startUpload( 'flash', [
{
    fileName: '4.txt',
    fileSize: 1000
},
{
    fileName: '5.html',
    fileSize: 3000
},
{
    fileName: '6.txt',
    fileSize: 5000
}
]);
*/



//使用享元模式创建文件上传
function Upload2(uploadType,parent){
	this.uploadType=uploadType;
	this.parent=parent;
}
Upload2.prototype.del=function(id){
	uploadManager.changState(id,this);//传入该对象！???????????
	if(this.filesize<3000){
		return this.ele.parentNode.removeChild(this.ele);
	}
	if(window.confirm('确定要删除文件吗？'+this.fileName)){
		return this.ele.parentNode.removeChild(this.ele);
	}
};
var uploadFactory=(function(){
	var obj={};
	var parent=document.querySelector('.m-upload');
	return {
		create:function(uploadType){
			if(obj[uploadType]){
				return obj[uploadType];
			}
			return obj[uploadType]=new Upload2(uploadType,parent);
		}
	}
})();

var uploadManager=(function(){
	var fileData={};
	return {
		add:function(id,uploadType,fileName,fileSize){
			var ele=document.createElement('p');
			ele.innerHTML='<span>文件名称：'+fileName+'，文件大小：'+fileSize+'</span>'+'<button class="delFile">删除</button>';
			var btn=ele.querySelector('.delFile');
			var upObj=uploadFactory.create(uploadType);//对应类型的upload对象！
			btn.onclick=function(){
				upObj.del(id);
			};
			upObj.parent.appendChild(ele);
			
			fileData[id]={
				fileName:fileName,
				fileSize:fileSize,
				ele:ele
			}
			return upObj;//返回做什么？
		},
		//什么函数？？？？？？？？？？？？？？？？？？？？？？
		changState:function(id,upObj){
			var data=fileData[id];
			for(var key in data){
				upObj[key]=data[key];
			}
		}
	}
})();

var startUpload2 = function( uploadType, files ){
    for ( var i = 0, file; file = files[ i++ ]; ){
        var uploadObj = uploadManager.add( i, uploadType, file.fileName, file.fileSize );
    }
};
startUpload2( 'plugin', [
{
    fileName: '1.txt',
    fileSize: 1000
},
{
    fileName: '2.html',
    fileSize: 3000
},
{
    fileName: '3.txt',
    fileSize: 5000
}
]);
startUpload2( 'flash', [
{
    fileName: '4.txt',
    fileSize: 1000
},
{
    fileName: '5.html',
    fileSize: 3000
},
{
    fileName: '6.txt',

    fileSize: 5000
}
]);

//对象池
var objectPoolFactory = function( createObjFn ){
    var objectPool = [];
    return {
        create: function(){
            var obj = objectPool.length === 0 ?
            createObjFn.apply( this, arguments ) : objectPool.shift();
            return obj;
        },
        recover: function( obj ){
            objectPool.push( obj );

        }
    }
};

var iframeFactory = objectPoolFactory( function(){
    var iframe = document.createElement( 'iframe' );
    document.body.appendChild( iframe );
    iframe.onload = function(){
        iframe.onload = null; // 防止iframe 重复加载的bug
        iframeFactory.recover( iframe ); // iframe 加载完成之后回收节点
    }
    return iframe;
});

var iframe1 = iframeFactory.create();
iframe1.src = 'http:// baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http:// QQ.com';
setTimeout(function(){
    var iframe3 = iframeFactory.create();
    iframe3.src = 'http:// 163.com';
}, 3000 );
//对象池是另外一种性能优化方案，它跟享元模式有一些相似之处，但没有分离内部状态和外部状态这个过程。文件上传的程序其实也可以用对象池+事件委托来代替实现
//享元模式是为解决性能问题而生的模式，这跟大部分模式的诞生原因都不一样。在一个存在大量相似对象的系统中，享元模式可以很好地解决大量对象带来的性能问题