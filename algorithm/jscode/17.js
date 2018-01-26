/*
	高性能js之js应用
		- 减少http请求数量，js合并！
		- 压缩js
		- 在http传输压缩gzip
		- 缓存js，再访问性能提升！（附带版本号或者时间戳，检验js是否需要更新）
		-cdn分发
*/

//性能分析
var Timer={
	_data:{},
	start:function(key){
		Timer._data[key]=new Date();
	},
	stop:function(key){
		var time=Timer._data[key];
		if(time){
			Timer._data[key]=new Date()-time;
		}
	},
	getTime:function(key){
		return Timer._data[key];
	}
}