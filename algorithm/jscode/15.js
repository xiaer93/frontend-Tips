/*
	高性能js之ajax
	- 通过ajax，避免每次都刷新页面。同时可以延迟下载大体积资源文件。
	- 选择合适的传输方式和有效的数据格式，可以显著改善用户和网站的交互体验
*/
/*
	数据传输方式
	- xhr
	- jsonp
	- multipart xhr
	- websocket（全双工）
*/
//xhr，主流的方法。get请求的数据会被缓存下来，有数据限制，通过url请求！参考文章：https://segmentfault.com/a/1190000004322487
/*
	XMLHttpRequest2.0：
		可以发送跨域请求，在服务器允许的情况下
		可以发送和接受二进制数据
		新增formDate对象，支持发送表单数据
		发送和获取数据时，可以获取进度信息
		可以设置请求超时时间
	xhr.withCredentials：跨域运行缓存cookie，server端一定不能将Access-Control-Allow-Origin设置为*，而必须设置为请求页面的域名。
*/
function xhrFunc(){
	var fd=new FormDate();
	fd.append("name":"xirer93");
	var xhr=new XMLHttpRequest();
	xhr.timeout=3000;
	
	xhr.responseType="blob";//可以为text、document、json、blob、arrayBuffer
	xhr.open("POST","",true);
	
	xhr.onload=function(){
		if(xhr.status===200){
			var b=xhr.response;
		}
	};
	xhr.onerror=function(event){
		console.log("error!");
	};
	xhr.upload.onprogress=function(){
		if (event.lengthComputable) {
		  var completedPercent = event.loaded / event.total;
		}
	};
	xhr.send(fd);//arrayBuffer、blob、ducument、formDate、null
}


//动态脚本注入jsonp，动态脚本注入的代码可以控制整个页面，避免引入外部源码

//mulitpart xhr。减少xhr请求，如将多张图片处理后同时发给浏览器，浏览器解析后使用！（还可以发送js代码、css等等）

/*
	发送数据
		- xhr
		- img（可以通过图片宽度告诉浏览器是否上传成功！）
*/


/*
	数据格式：
		- xml
		- json（推荐）
		- jsonp（可以跨域）
		- html（被用于特点场合，直接传输大段html文档，通过innerHtml直接解析）
		- 自定义数据格式
*/