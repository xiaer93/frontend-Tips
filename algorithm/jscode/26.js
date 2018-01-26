/*
	设计模式-外观模式
	- 外观模式（Facade）为一组复杂的子系统接口提供高级的统一接口，通过接口更容易访问。
	- 外观模式的优势是易于使用，而且本身也比较轻量级。但也有缺点，外观模式被开发者连续使用时会产生一定的性能问题，因为在每次调用时都要检测功能的可用性。
	- 设计初期有意识将不同的两个层分离；开发阶段；维护阶段！
*/
//外观模式
var addMyEvent1=function(el,ev,fn){
	if(el.addEventListener){
		//标准绑定事件
		el.addEventListener(ev,fn,false);
	}else if(el.attachEvent){
		//ie的绑定事件
		el.attachEvent('on'+ev,fn);
	}else{
		//dom1级
		el['on'+ev]=fn;
	}
}
//未经优化，每次调用都会检测功能!
//优化方案，只进行一次检测！
var addMyEvent2=(function(){
	var ret;
	var ele=document.body;
	if(ele.addEventListener){
		ret=function(el,ev,fn){
			el.addEventListener(ev,fn,false);
		}
	}else if(ele.attachEvent){
		ret=function(el,ev,fn){
			el.attachEvent('on'+ev,fn);
		}
	}else{
		ret=function(el,ev,fn){
			al['on'+ev]=fn;
		}
	}
	return ret;
})();

addMyEvent2(document.body,'click',function(){
	console.log('ok1');
});
addMyEvent2(document.body,'click',function(){
	console.log('ok2');
});
//其他封装，如阻止默认程序
var mobileEvent={
	stop:function(e){
		e.preventDefault();
		e.stopPropagation();
	}
}


//参考链接：http://www.cnblogs.com/TomXu