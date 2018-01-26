self.onmessage=function(event){
	//importScripts("1.js");阻塞加载js，并执行。但是webworker工作在UI线程之外！
	var json=JSON.parse(event.data);
	self.postMessage(json);
}