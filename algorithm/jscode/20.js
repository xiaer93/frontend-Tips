/*
	高性能js之数据存储
	-作用链[[scope]]包含着一个函数被创建的作用域中对象的集合，他决定着哪些数据可以被访问。最终指向全局对象global！
		-函数每次都被执行的环境（执行上下文）都是独一无二的，所以多次调用同一个函数会创建多个执行环境，在函数执行完成后执行环境被销毁！
		-每个执行环境都有自己的作用域链，用于解析标识符（变量名），当执行环境被创建时。scope[0]指向活动对象（当前执行环境，包含this、arguments等局部变量和参数集合）；scope[1]指向函数创建时的作用域链（终点为全局对象，全局对象this=window，全局对象包含window、document等等）
	-变量名的解析：一个标识符的深度越深，他的读写速度越慢！搜寻过程为：局部变量》》》全局变量
		-建议：如果跨作用域的值被引用一次以上时，推荐把他存储在局部对象中！
	-with、try-catch、eval等会改变作用域链的先后顺序，但是局部变量被放在第二层搜索，会降低局部变量的解析速度！
	-闭包：允许函数访问局部作用域之外的数据！缺点：占内存和耗执行速度！
	-原型链_proto_，终点指向Object.prototype。实例和原型！
		- hasOwnProperty检测属性在实例中存在吗？（方法）
		- in检测属性在实例和原型中存在吗？（操作符）
		- instanceof检测实例是某原型的实例吗？（操作符）
		- 缺点：属性越深，速度越慢！
	
	总结：访问字面量和局部变量速度最开；作用链、原型链的深度越深，速度越慢；将跨作用域变量存储在局部变量中优化速度！！
	
*/


//scope的理解范例！
//当执行add函数值，其scope共有4个值：1、local（局部变量，包括this指针和arguments类数组）；2、外层匿名（包括变量c）；3、外层util（包括变量d）；4、全局变量global
function util(){
	var d=4;
	return (function(){
		var c=3;
		var method=function(){
			this.add=function(a,b){
				var sum=a+b+c+d;
				return sum;
			}
		}
		return new method();
	})();
}

var a=new util();
a.add(1,2);

/*
	将跨作用域的值存储在局部对象中，加快解析速度！
*/
function initUI(){
	var doc=document;
	doc.open();
	doc.write("hello");
	doc.write("world!");
	doc.close();
}

/*
	try-catch改进，简化担待，将错误委托给函数处理（不再有局部变量访问缓慢的bug）
*/
try{
	initUI();
}catch(e){
	handleError(e);
}
function handleError(e){
	console.log(e.message);
}

/*
	创建闭包
	闭包的scope链：1、local（包含event、this指向body）；2、外层assignEvent（包含变量id，this指向window）；3、全局global变量！
	//优化：将常用的跨作用于变量储存在局部变量中！
*/

function assignEvent(){
	var id="xiaer93";
	document.body.onclick=function(event){
		var info="name:"+id;//将跨域变量存储在局部变量中，直接访问局部变量！
		showId(info);
	}
}
function showId(id){
	console.log(id);
}

/*
	原型的优化，将多次读取的属性存入局部变量中。但是不推荐使用在对象的方法中，因为对象的方法有this指针，需要灵活执行！
*/
function checkClass(){
	var body=document.body;
	console.log(body.className);
}
