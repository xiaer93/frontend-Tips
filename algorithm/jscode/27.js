/*
	设计模式-代理模式
	- 代理模式（Proxy），为其他对象提供一种代理以控制对这个对象的访问。代理模式使得代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。
	- 应用：1、远程代理；2、虚拟代理；3、安全代理；4、智能指引
*/
//送花
var Boy1=function(name){
	this.name=name;
}
Boy1.prototype={
	constructor:Boy1,
	sendGift:function(girl,gift){
		girl.getGift(this,gift);
	}
};

var Girl1=function(name){
	this.name=name;
}
Girl1.prototype={
	constructor:Girl1,
	getGift:function(who,gift){
		console.log('收到来自：'+who.name+'的礼物>'+gift);
	}
};
var b1=new Boy1('b1');
var g1=new Girl1('g2');
b1.sendGift(g1,'flower');

//送花的代理
function inherit(sub,sup){
	var p=Object.create(sup.prototype);
	p.constructor=sub;
	sub.prototype=p;
}
//继承方法！
var Girl2=function(name){
	Girl1.apply(this,arguments);
};
inherit(Girl2,Girl1);

var Boy2=function(girl){
	Boy1.apply(this,arguments);
};
inherit(Boy2,Boy1);
//中介，即girl的经理人
var Proxy=function(girl){
	this.proxy=girl;
	this.getGift=girl.getGift;
};

var b2=new Boy2('b2');
var g2=new Girl2('g2');
//定义p为g2的代理人，即boy向p送礼即可！
var p=new Proxy(g2);
b2.sendGift(p,'代理人居然是男的？');

//虚拟代理。？
//男孩给女孩送花，女孩心情好则成功，否则失败。而中介恰好可以监听到女孩的心情
var Girl3=function(name){
	Girl1.apply(this,arguments);
};
inherit(Girl3,Girl1);
Girl3.prototype.listenMood=function(fn){
	//延时2秒后执行回调函数fn
	setTimeout(function(){
		fn();
	},2000)
}

var Boy3=function(girl){
	Boy1.apply(this,arguments);
};
inherit(Boy3,Boy1);
var ProxyVirtual=function(girl){
	this.proxy=girl;
	//装饰者模式？
	this.getGift=function(who,gift){
		//虚拟代理，先将就着加载统一的对象吧！
		this.proxy.getGift(who,'这是女孩都有的礼物！');
		var _self=this;
		//心情变好后的回调函数！
		this.proxy.listenMood(function(){
			_self.proxy.getGift(who,gift);
		})
	}
}
var b3=new Boy3('b3');
var g3=new Girl3('g3');
//定义p为g2的代理人，即boy向p送礼即可！
var pv=new ProxyVirtual(g3);
b3.sendGift(pv,'这才是b3送的礼物！');

//保护代理，代理可以过滤一些请求，如男孩年龄太大或者没有宝马，555
//虚拟代理，将如果礼物对象较大，可以延迟到使用的时候再创建！（即直接传递Flower对象，在girl中运行！）
var Flower=function(){
	return {
		gift:'这个礼物怎么样？'
	}
}


/*
	图片预加载
*/
var myImg=function(){
	var img=document.createElement('img');
	document.body.appendChild(img);
	return {
		setSrc:function(src){
			img.src=src;
		}
	}
};
var ProxyImg=function(pimg,src){
	//创建img干嘛？
	var img=new Image();
	img.onload=function(){
		//等待图片预加载完成后，给pimg换上！
		pimg.setSrc(this.src);
	};
	return {
		setSrc: function( src ){
			//加载图片loading，大家都一样
            pimg.setSrc( 'http://s.cn.bing.net/th?id=OJ.zolN1O0dDK00aw&w=75&h=75&pid=MSNJVFeeds' );
			//实际图片！
            img.src = src;
        }
	}
};

var img=new myImg();
var pimg=new ProxyImg(img);



//参考链接：http://www.cnblogs.com/TomXu