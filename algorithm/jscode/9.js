/*
	高性能js之脚本篇
	-js是单线程语言。
	-无论内嵌还是外联js脚本，浏览器都会停止下载和渲染等待脚本下载执行（因为js文件可能会修改html中的内容！）
	-建议：js文件放在body中，且在最底部，有助于页面渲染和交互的正确性（浏览器直到解析<body>才会开始渲染解析页面）
	-建议：压缩js文件体积，减少js文件的请求次数（可以通过一条链接请求多个js文件！）
	-建议：如果脚本较多、体积较大，可以通过动态脚本的形式加载进来！
	-建议：defer、脚本下载后，等待页面渲染完后执行（发生在window.onload之前[会堵塞DOMContentLoaded]）；async、脚本下载完后立即执行（默认情况与async相似）！
		-实测：在chrom中实测，defer仅当src属性声明时才有效！！！
	-推荐：动态脚本，无论何时启动下载，文件的下载和执行都不会阻塞页面的其他进程！建议将动态脚本添加在head标签中！【最通用的无阻塞加载解决方案】
	-不常用方案：xhr脚本注入!
	-综合推荐：先加载所需要的脚本（尽可能精简），然后动态加载所需要的脚本！
	
	总结：1、将所有script标签放在<body>底部；2、合并脚本（页面的script越少速度越快，无论代码是内嵌还是外链）；3、通过defer、动态脚本、xhr注入等方式无阻塞加载脚本！
*/

/*
	加载动态脚本
*/
function loadScript(url，callback){
	if(typeof url !=="string"){
		throw new Error("js文件地址错误！");
	}
	var script=document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("src",url);
	script.async=true;//确保脚本加载完后立即执行
	document.getElementsByTagName("head")[0].appendChild(script);
	
	//加载完后捕获onload事件（ie为onreadystatechange）
	script.onload=script.onreadystatechange=function(){
		if(!script.readyState || /loaded|complete/.test(script.readyState)){
			script.onload=script.onreadystatechange=null;
			alert("脚本加载完成");
			callback();//执行脚本
			//删除脚本，脚本已经执行()
			if(script.parentNode){
				script.parentNode.removeChild(script);
			}
		}
	}
}
/*
	脚本加载顺序：chrome和ie不能保证动态脚本的执行顺序！
	- 使用嵌套加载多个脚本
	- 将多个脚本合一，一次性加载完成（动态脚本为异步过程，大一点不会有影响！）
	
	loadScript("file1.js",function(){
		loadScript("file2.js",function(){
			alert("file1&file2都加载成功！")
		});
	});
*/

/*
	xhr脚本注入:1、脚本不会立即执行（可控制）；2、在所有主流浏览器都可以正常使用；3、局限于同源策略！
*/
function loadScriptByXHR=function(){
	var xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open("GET","file.js",true);
	xhr.send();
	//xhr事件对象有onreadystatechange和onload事件，前者在每次状态改变时候触发，后者在xhr.readystate===4时候触发
	xhr.onload=function(){
		if(xhr.status>=200 && xhr.status<300 || xhr.status===304){
			var script=document.createElement("script");
			script.setAttribute("type","text/javascript");
			script.text=xhr.responseText;
			document.body.appendChild(script);
		}
	}
}

