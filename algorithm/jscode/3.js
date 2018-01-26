/*
	功能类库
*/

/*
	[util工具库]
	@return [Object]
*/

var util={};

/*
	[function 返回数组中指定项的索引]
	@param	{[type]}	array	[description]
	@param	{[type]}	item	[description]
	@return	{[type]}	number
*/
util.indexOf=function(array,item){
	var i=0,
		len=array.length;
	for(;i<len;++i){
		if(array[i]===item){
			return i;
		}
	}
	return -1;
};

/*
	[function 判读是否为函数]
	@param	{[type]}	source	[description]
	@return	{[boolean]}
*/
util.isFunction=function(source){
	//@return typeof source ==="function";//为什么不直接使用typeof
	return "[object Function]"===Object.prototype.toString.call(source);
};

/*
	[function 随机获取5位字符函数后缀名]
	@param	{[type]}	prefix	[description]
	@return	{[script]}			[description]
*/
util.getName=function(prefix){
	return prefix+Math.random().toString(36).replace(/[^a-z]/g,"").substring(0,5);
};

/*
	[function 浅复制]
	@param	{[type]}	dest	[description]
	@param	{[type]}	orig	[description]
	@return	{[type]}			[description]
*/
util.extend=function(dest,orig){
	for(var i in orig){
		if(orig.hasOwnProperty(i)){
			dest[i]=orig[i]
		}
	}
};

/*
	[function 创建script脚本]
	@param	{[string]}	url		[description]
	@return	{[script]}	script	[description]
*/
util.createScript=function(url){
	var script=document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("src",url);
	script.async=true;//带有async或者defer的script都会立刻下载并不阻塞页面解析，不同之处在于async一旦下载完成就立即执行（在window.onload事件之前），不确保执行的顺序，而defer能确保js是在按照其在页面中的顺序执行（在DOMContentLoaded事件之前）。
	return script
};

/*
	[function 执行jsonp跨域传输]
	@param	{[type]}	url			[description]
	@Param	{[type]}	onsuccess	[description]
	@param	{[type]}	onerror		[description]
	@return	{[type]}				[description]
*/
util.jsonp=function(url,onsuccess,onerror){
	var callback="callback";
	callback=util.getName(callback);
	window[callback]=function(){
		if(onsuccess && util.isFunction(onsuccess)){
			onsuccess(arguments[0]);//需要使用call吗？
		}
	};
	var script=util.createScript(url+"&jsonp="+callback);
	script.onload=script.onreadystatechange=function(){
		//jsonp函数执行了吗？
		if(!script.readyState || /complete|loaded/.test(script.readyState)){
			script.onload=script.onreadystatechange=null;//删除元素之前应该手动清除事件
			//删除元素
			if(script.parentNode)
                script.parentNode.removeChild(script);
			//删除callback
			window[callback]=null;
		}
	};

    script.onerror = function () {
        if (onerror && util.isFunction(onerror)) {
            onerror();
        }
    };
	//加载script
	document.getElementsByTagName("head")[0].appendChild(script);
};

/*
	[function 利用ajax实现jsonp]
	@param	{[type]}	options		[description]
	@return	{[type]}				[description]
*/
//在jq中，jsonp是通过script模拟的！
util.json=function(options){
	var opt={
		url:"",
		type:"GET",
		data:{},
		success:function(){},
		error:function(){}
	};
	util.extend(opt,options);
	if(opt.url){
		var xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
		var data=opt.data,
			url=opt.url,
			type=opt.type.toUpperCase(),
			dataArr=[];
		for(var i in data){
			dataArr.push(i+"="+data[i]);
		}
		if(type==="GET"){
			url=url+"?"+dataArr.join("&");
			xhr.open(type,url.replace(/\?$/,""),true);//如果传入数据为空，则清除?。true为异步！
			xhr.send(null);
		}
		if(type==="POST"){
			xhr=open(type,url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send(dataArr.join("&"));
		}
		//使用onload就不用检查readyState
		xhr.onload=function(){
			if(xhr.status===200 || xhr.status===304){
				var res;
				if(opt.success && util.isFunction(opt.success)){
					res=xhr.responseText;
					if((typeof res) === "string"){
						res=JSON.parse(res);
						opt.success.call(xhr,res);//某个对象的函数就一定需要使用call更改执行环境！
					}
				}
			}else{
				if(opt.error && util.isFunction(opt.error)){
					opt.error.call(xhr,res);
				}
			}
		}
		
	}
};

//crc32加密

module.exports=util;