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
		//代理接口与对象接口一致性，方便使用！
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
pimg.setSrc('http://s.cn.bing.net/th?id=OJ.SEYPhWRyxnx3Jw&w=75&h=75&pid=MSNJVFeeds');

/*
	合并http请求
*/
//同步文件
function asyncFile(fileName){
	console.log('已经上传文件：'+fileName);
}
//代理同步文件，延时2秒，期间触发的任务加入任务队列！
var proxyAsyncFile=(function (){
	var timer,
		cache=[];
	return function(id){
		//存入任务
		cache.push(id);
		//检查是否已经设置定时
		if(timer){
			return;
		}
		timer=setTimeout(function(){
			//函数式编程
			cache.forEach(function(t){
				asyncFile(t);
			})
		},1000)
	}
})();
//绑定事件，使用闭包创建静态私有变量
document.body.addEventListener('click',(function(){
	var clickTimes=0;
	return function(){
		asyncFile(++clickTimes);
		proxyAsyncFile(clickTimes+'s');
	}
})());

//缓存代理结果
//两个函数对外接口一致！
function mult(){
	console.log('开始计算结果！');
	var args=Array.prototype.slice.call(arguments);
	var ret=args.reduce(function(lf,rg){
		return lf*rg;
	});
	return ret;
}
var proxyMult=(function(){
	//将结果缓存
	var cache={};
	return function(){
		var args=Array.prototype.slice.call(arguments);
		if(cache[args]){
			return cache[args];
		}
		//调用mult计算！
		return cache[args]=mult.apply(null,args);
	}
})();
//创建工厂函数，可以为mult函数创建代理函数！
function createProxyFactory(fn){
	var cache={};
	return function(){
		var args=Array.prototype.slice.call(arguments);
		if(cache[args]){
			return cache[args];
		}
		return cache[args]=fn.apply(null,args);
	}
}

/*
　　1、防火墙代理：控制网络资源的访问，保护主题不让“坏人”接近

　　2、远程代理：为一个对象在不同的地址空间提供局部代表

　　3、保护代理：用于对象应该有不同访问权限的情况

　　4、智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，比如计算一个对象被引用的次数

　　5、写时复制代理：通常用于复制一个庞大对象的情况。写时复制代理延迟了复制的过程，当对象被真正修改时，才对它进行复制操作。写时复制代理是虚拟代理的一种变体，DLL（操作系统中的动态链接库）是其典型运用场景
*/

//参考链接：http://www.cnblogs.com/TomXu