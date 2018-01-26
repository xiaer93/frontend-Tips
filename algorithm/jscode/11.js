/*
	-DOM文档对象模型，同于操作html和xhtml文档的程序接口API。他是web应用的最常见性能瓶颈！
		-dom和js相互独立，通过api接口实现互相访问，应该减少互相访问的次数！
		
		
	-浏览器在下载页面中的所有组件（html标记、js、css、图片），之后会解析并生成两个内部数据结构
		-dom树，表示页面的结构（dom树中每一个需要显示的节点，在渲染树中至少存在一个对应的节点）
		-渲染树，表示dom节点如何显示（渲染树中的节点被称为帧或盒）
		-一旦dom树和渲染树构建完成后，浏览器就开始绘制（paint）页面元素！
			-当dom发生变化影响了元素的集合属性(宽和高)【如段落文本增加或者改变边框宽度】，浏览器就需要重新计算元素的几何属性。浏览器会使渲染树中受影响的部分失效，并重新构造渲染树，这个过程称为重排！reflow！
			-完成重排后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为重绘！repaint！
			-并不是所有的dom变化都会影响几何属性，如修改背景颜色。在这种情况下，只会发生重绘，不会发生重排！
			-何时发生重排：
				-添加或删除dom元素
				-元素的位置变化
				-元素的尺寸变化（包括margin、padding、border、width）
				-内容发生改变（文本改变或图片被另一个不同尺寸的图片替代）
				-页面渲染器初始化
				-浏览器窗口尺寸变化
				-根据改变的范围和程度，渲染树中部分需要重新计算。如果出现滚动条（从无到有）时，则整个渲染树发生重排！
		-减少重绘重排的次数
			-对于重绘：一次性修改css，避免边修改css边获取属性
			-对于重排：推荐使用文档片段一次性修改dom元素节点！
			-其他补充：
				-减少访问元素的布局信息
				-展开动画使用绝对定位脱离文档流，避免影响页面重排！
				-使用事件委托，减少事件处理器的数量
				-使用更快的选择器querySelectorAll
				-注意html实体，实体与文档实时关联！
*/

/*
	常见优化方式;减少dom的访问次数，把运算尽量留在ECMAScript中处理！
*/
function innerHtmlLoop1(){
	for(var count=0;count<10000;count++){
		document.body.innerHTML+="a";
	}
}
function innerHtmlLoop2(){
	var content="";
	for(var count=0;count<10000;count++){
		content+="a";
	}
	document.body.innerHTML=content;
}
/*
	innerHTML和document.createElement效率相当，视编程者习惯！
	//推荐使用数组合并大量字符！
*/
function createTable1(){
	var nums=["零","一","二","三"];
	var table=["<table><tbody>"];
	for(var i=0;i<4;++i){
		table.push("<tr>");
		table.push("<td>"+i+"</td>");
		table.push("<td>"+nums[i]+"</td>");
		table.push("</tr>");
	}
	table.push("</tbody></table>");
	document.body.innerHTML=table.join('');
}
function createTable2(){
	var nums=["零","一","二","三"];
	var table=document.createElement("table");
	var tbody=document.createElement("tbody");
	table.appendChild(tbody);
	for(var i=0;i<4;++i){
		var tr=document.createElement("tr");
		var td1=document.createElement("td");
		td1.appendChild(document.createTextNode(i));
		var td2=document.createElement("td");
		td2.appendChild(document.createTextNode(nums[i]));
		tr.appendChild(td1);
		tr.appendChild(td2);
		tbody.appendChild(tr);
	}
	document.body.appendChild(table);
}

/*
	某些情况下可以使用element.cloneNode()，节点克隆更有效率，但是也不是特别明显！
	//如果传递给它的参数是 true，它还将递归复制当前节点的所有子孙节点。否则，它只复制当前节点。
	//返回的节点不属于文档树，它的 parentNode 属性为 null。
	//当复制的是 Element 节点时，它的所有属性都将被复制。但要注意，当前节点上注册的事件监听器函数不会被复制。
*/

/*
	html集合的优化：集合如documen.getElementById/document.images/document.links/document.forms[0].elements等等
	每次获取集合的length属性时，都会重新进行查询！
*/
//使用len提升速度
function collectGlobal(){
	var coll=document.getElementsByTagName("div"),
		len=coll.length,//将length存储在局部变量中
		name='';
	for(var count=0;count<len;count++){
		name+=document.getElementsByTagName("div")[count].nodeName;
		name+=document.getElementsByTagName("div")[count].nodeType;
		name+=document.getElementsByTagName("div")[count].tagName;
	}
	return name;
}

//使用coll集合提升速度
function collectLocal(){
	var coll=document.getElementsByTagName("div"),
		len=coll.length,
		name="";
	for(var count=0;count<len;count++){
		name+=coll[count].nodeName;
		name+=coll[count].nodeType;
		name+=coll[count].tagName;
	}
	return name;
}

//使用局部元素el提升速度
function collectNodesLocal(){
	var coll=document.getElementsByTagName("div"),
		len=coll.length,
		name="",
		el=null;
	for(var count=0;count<len;++count){
		el=coll[count];
		name+=el.nodeName;
		name+=el.nodeType;
		name+=el.tagName;
	}
	return name;
}

/*
	遍历DOM优化
	1：childNodes/firstChild/lastChild/nextSlibling/previousSibling获取元素节点，但是返回值包括注释、文本等节点！
	2：children/childElementCount/firstElementChild/lastElementChild/nextElementSibling/previousElemeSibling返回元素节点！
	使用后者速度更快，因为包含的数据量更少！
*/

/*
	选择器api，使用选择器querySelectorAll能够提升性能！【js提供的的api】
*/
var element1=document.getElementById("menu").getElementsByTagName("a");//返回html集合！而且前者必须返回有效元素，否则会抛出错误！
var element2=document.querySelectorAll("#menu a");//返回静态列表！

/*
	减少重排重绘的次数
	//浏览器通过队列化修改并批量执行来优化重排过程。但是部分方法会刷新队列，强制计划任务立即执行！
	-offsetTop/offsetLeft/offsetWidth/offsetHeight
	-scrollTop/scrollLeft/scrollWidth/scrollHeight
	-clientTop/clientLeft/clientWidth/clientHeight
	-getComputedStyle()[currentStyle 仅限于IE]
	-不要边修改样式边调用上面方法！
*/
function changeBG1(){
	var computed,
		tmp='',
		bodyStyle=document.body.style;
	if(document.body.currentStyle){
		computed=document.body.currentStyle;
	}else{
		computed=document.defaultView.getComputedStyle(document.body,"");
	}
	bodyStyle.background='red';
	tmp=computed.backgroundColor;
	bodyStyle.background='yellow';
	tmp=computed.backgroundImage;
	bodyStyle.background="blue";
	tmp=computed.backgroundAttachment;
	
	return tmp;
}
//不要在修改样式的时候查询它的信息！
function changeBG2(){
	var computed,
		tmp='',
		bodyStyle=document.body.style;
	if(document.body.currentStyle){
		computed=document.body.currentStyle;
	}else{
		computed=document.defaultView.getComputedStyle(document.body,"");
	}
	bodyStyle.background='red';
	bodyStyle.background='yellow';
	bodyStyle.background="blue";
	tmp=computed.backgroundColor;
	tmp=computed.backgroundImage;
	tmp=computed.backgroundAttachment;
	
	return tmp;
}
/*
	减少重排和重绘
*/
//css
function changStyle1(){
	var el=document.body;
	el.style.borderLeft="1px";
	el.style.borderRight="2px";
	el.style.padding="4px";
}
//一次性设置所有css
function changStyle2(){
	var el=document.body;
	el.style.cssText="border-left:1px;border-right:2px;padding:4px;";
	el.style.cssText+="border-color:red;";
}
//通过修改类名更改css
function changStyle3(){
	var el=document.body;
	el.className="active";
	el.classList.add("love");
}
//dom：1、将元素脱离文档流；2、对齐进行修改；3、将元素带回文档
//脱离文档的3中办法：1、隐藏元素，应用修改，重新显示；2、使用文档片段在当前dom之外构建一个文档树，再把它拷贝回文档；3、将原始元素拷贝到一个脱离文档流的节点中，修改副本，替换原始元素！
var data=[
	{
		"name":"aaa",
		"url":"http://clovey.party"
	},
	{
		"name":"bbb",
		"url":"http://clovet.party"
	}
];
function appendDateToElement(appendToElement,data){
	var a,li;
	for(var i=0,len=data.length;i<len;++i){
		a=document.createElement("a");
		a.setAttribute("href",data[i].url);
		a.appendChild(document.createTextNode(data[i].name));
		li=document.createElement("li");
		li.appendChild(a);
		appendToElement.appendChild(li);
	}
}
//没有优化的行为
var ul=document.getElementById("my_links");
appendDateToElement(ul,data);

//使用display:none的优化
var ul=document.getElementById("my_links");
ul.style.display="none";
appendDateToElement(ul,data);
ul.style.display="block";

//使用文档，添加操作时，被添加为其子节点，而不是片段本身
var fragment=document.createDocumentFragment();
appendDateToElement(fragment,data);
document.getElementById("my_links").appendChild(fragment);

//创建节点副本
var old=document.getElementById("my_links");
var clone=old.cloneNode(true);
appendDateToElement(clone,data);
old.parentNode.replaceChild(clone,old);


//减少获取offset、scroll、computedStyle等属性值！
function moveElement1(){
	var element=document.getElementById("box");
	setTimeout(function _go(){
		element.style.left=1+element.offsetLeft+'px';
		element.style.top=1+element.offsetTop+'px';
		if(element.offsetLeft<100){
			setTimeout(_go,1000);
		}
	},1000)
}
//将获取的值存储在局部变量中
function moveElement2(){
	var element=document.getElementById("box");
	var left=element.style.left,
		top=element.style.top;
	setTimeout(function _go(){
		left++;
		top++;
		element.style.left=left+'px';
		element.style.top=top+'px';
		if(element.offsetLeft<100){
			setTimeout(_go,1000);
		}
	},1000)
}

////????????????????????????????????????????
//对于展开和折叠的方式显示和隐藏页面元素，需要进行优化，否则会导致大规模的页面重排
//使用绝对定位将动画元素脱离文档流！》》让元素动起来，当他扩大时只会覆盖其他元素

//当元素很多时，应该避免使用hover伪类来改变样式！！！？？？

//使用事件委托减少事件绑定（委托的事件会占用内存，同时会占用处理时间）
//时间委托是重点
//兼容性：1、event=event | window.event;2、target=event.target | event.srcElement;3、event.stopPropagation()/event.preventDefault() | event.returnValue=false/event.cancelBubble=true!

