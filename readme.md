# 学习之路


1. flex动画

	- flex-grow设置伸长占比、flex-shrink设置收缩占比、flex-basis设置初始大小（可以设置百分比、或长度值、或auto！）
	- 动画transition设置在:hove中，则只有鼠标触动时有动画效果，离开时没有。因此需要设置在对应的元素样式中！
	- [1.html](http://clovey.party/frontend-Tips/code/1.html)

2. 轮播图
	
	- 通过target和animation，实现css轮播图！
	- [2.html]()
	
3. 水平两栏布局
	
	- float、负margin、position、grid、table、flex等常用于各种局部
	- [3.html]()

4. 水平三栏布局
	- float布局，在文字环绕图片等情况具有不可替代作用！但是缺点：1、脱离文档流，并且容易造成父元素坍塌，需要及时清除浮动；2.脱离文档流，在父元素中设置的定位属性（text-align、vertical-align）均不会对子浮动元素产生影响；3.周围文字会环绕这个元素！；4.有时候2排图片（部分图片高度不同）浮动排列时，可能会混乱；兼容性较好
	- inline-block布局(需要使用calc特性)，1.需要处理空白问题；2.对早期ie支持不是很友好！应用：图片排列、横向导航条！
	- position布局，绝对定位简单快捷，但是脱离文档流（兄弟元素都需要脱离文档流！），对于移动端适应不是很友好。
	- grid布局，做二维平面的布局，通常用于整个页面的规划。最新版本的浏览器才支持！
	- table布局，具有垂直居中，等高，水平级联，匿名创建等特性（IE8的兼容性非常好）。
	- flex布局，做局部布局，如某些应用程序的组件和小规模的布局（移动端布局优选）。
	- 延伸：1.5种方案的优缺点；2.等高布局的几种方案；3.5种方案的兼容性如何，在业务最优选取何种方案？
	- [4.html]
	
5. 垂直两栏布局
	- position布局：[5-1.html]()
	- flex布局：[5-2.html]()
	- grid布局：[5-3.html]()
	- table布局：[5-4.html]()

6. 垂直三栏布局
	-[6-1.html]
	
7.grid布局示例
	- grid布局，二维布局的神器！
	- [7.html]()
	
# frontend-Tips

* 页面布局（一面二面：）

	- 语义化掌握到位
	- 页面布局理解深刻
	- css基础知识扎实
	- 思维灵活上进
	- 代码书写规范
	-页面布局的延伸：
	
		- 三栏布局
			左右宽度固定、中间自适应
			上下高度固定，中间自适应
		- 两栏布局
			左宽度固定，右自适应
			右宽度固定，左自适应
			上高度固定，下自适应
			下高度固定，上自适应
			
* css盒模型

	1. IE和非IE的主要区别
	
		IE的		width=content+padding+border
		标准的		width=content
		* CSS3引入box-sizing设置盒模型的width形式！ *

	2. js获取的尺寸
	
		- element.style.width，获取在html文件中设置的宽度值px！
		- window.getComputedStyle（element），获取渲染后的元素css属性集合，返回值为CSSStyleDeclaration。拥有getPropertyPriority()、getPropertyValue()、item()、removeProperty()、setProperty()等方法！
		- element.getBoundingClientRect()，获取元素相对于视窗的坐标值（left、right、top、buttom），视窗即浏览器工具栏以下显示网页的所有部分！
		
		- element.clientWidth，可视区元素的宽度（不包含边线border和滚动条）
		- element.offsetWidth，可视区元素的宽度（包含边线border和滚动条）
		- element.scrollWidth，网页左右padding之间的距离（包括padding，不包括border）
		
		- element.clientLeft，边框的宽度！
		- element.offsetLeft，相对于定位父元素的距离（包括父元素的padding，不包括border和margin）
		- element.scrollLeft，如果元素是可以滚动的,可以通过这俩个属性得到元素在水平和垂直方向上滚动了多远,单位是象素. 对于不可以滚动的元素,这些值总是0.
		
	3. 鼠标获取的尺寸
		- clientX，获取鼠标相对于当前窗口的X坐标
		- offsetX，获取鼠标相对于触发事件的对象x坐标
		- screenX，获取鼠标相对于用户屏幕的x坐标
		
	4. jquery的兼容
	
	5. bfc规则创建应用
		- 在同一个bfc内部，相邻box会发生边界重叠（）
		- 计算高度时，内部float要参与计算
		- bfc不会与float发生重叠
		- bfc是一个容器，外部不会影响内部
		- bfc的box在竖直方向依次排布
		- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
		- 根元素、float不为none或visibile、position为absolute或fixed、display为inline-block或table或table-cell或flex或inline-flex、overflow不为visible！
		- 应用：2栏布局、清除浮动避免父元素坍塌，避免外边距叠加！
		- [8.html]()
	6. ifc

* dom
	- 基本概念：DOM事件级别
		- DOM0，element.click=function(){}
		- DOM2，element.addEventListener("click",function(){},"false")//新增绑定事件监听的方式
		- DOM3，element.addEventListener("keyup",function(){},"false")//新增键盘鼠标等等事件！
	- DOM事件模型
		- 捕获，从未知window到具体
		- 冒泡，从具体到未知
	- DOM事件流
		-事件从捕获到目标阶段，从目标阶段到冒泡！
	- DOM具体捕获过程
		- window-》document-》html（document.documentElement）->body->按照结构依次传播到目标元素
	- Event对象的常见应用
		- event.stopPropagation，阻止冒泡
		- event.preventDefault，阻止默认事件
		- event.currentTarget，当前目标（事件流）
		- event.target，事件流传播到的目标
		- event.stopImmediatePropagation，如果注册多个监听事件，监听函数将按照顺序依次执行。则可以通过此函数阻止冒泡，及其后序其他监听事件！
	- 自定义事件
		- new Event("ev")...

* http

	- http协议的主要特点
		- 简单快捷URI
		- 灵活MIME
		- 无连接，不会保持链接
		- 无状态，服务端没有记住客户端的状态
	- http报文的组成部分
		- 请求报文：
			- 请求行（http方法、URI、协议版本、），请求头，空行，请求体
		- 响应报文
			- 状态行（协议版本、状态码【200 ok】）、响应头、空行、响应体
	- http方法
		- get 获取资源
		- post 传输资源
		- put 更新资源
		- delete 删除资源
		- head 获得报文首部
	- post和get的区别
		- * get在浏览器回退时无害的，而post会再次请求！ *
		- get产生的url地址可以被收藏，而post不可以
		- * get请求浏览器会主动缓存，而post不会，除非手动设置 *
		- get只能进行URI编码，而post支持多种编码形式
		- * get请求参数会完整的保留在浏览器历史记录中，而post中的参数不会被保留！ *
		- * get请求在url中传递的数据长度是有限制的，而psot没有限制！ *
		- 对参数的数据类型，get只接受ascii，而post没有限制
		- get比post更不安全，因为参数直接在url中，所以不能传递敏感信息
		- * get参数通过URL传递，post放在request Body中！ *
	- http状态码
		- 1xx 提示信息，请求以接收，继续处理！
		- 2xx 成功，表示请求已被成功接收！
		- 3xx 重定向，要完成请求必须进行更进一步的操作
		- 4xx 客户端错误，请求有语法错误或请求无法实现
		- 5xx 服务器错误，服务器未能实现合法的请求
		- 200客户端请求成功；206客户端发送一个带有range头的get请求，服务器完成（视频）；301所请求的页面已经转移到新的url；302所有请求页面已经临时转移至新的url；304客户端有缓冲的文档并发出一个条件性的请求，服务器告诉客户端原有的缓冲文件还可以使用！
		- 400客户端请求有语法错误，不能被服务器理解；401请求未经授权；403对被请求的页面的访问被禁止；404请求的资源不存在；500服务器发生不可预期的错误原来缓冲的文档还可以继续使用；503请求未完成，服务器临时过载或当机，一段时间后可能恢复正常！
	- 是什么是持久连接
		- http协议采用“请求-应答”模式，当使用普通模式时，每个请求/应答,客户和服务器都要新建一个连接，完成之后立即断开链接
		- 当使用keep-alive时（持久连接），keep-alive功能使客户端的连接持续有效，当出现对服务器的后继请求时，keep-alive能够避免建立或重新建立连接！
		- 1.1版本支持持久连接！
	- 什么是管化线
		- 请求1》响应1》请求2》响应2》请求3》响应3》
		- 请求1》请求2》请求3》响应1》响应2》响应3》（管线化，请求响应打包）
		- 1.1版本支持管线化，管线化机制通过持久连接完成；只有get和head请求可以进行管线化，而post有所限制；初次创建连接时不应启动管线化，因为服务器不一定支持http1.1；管线化不会影响响应到来的顺序；chrom默认关闭管线化支持！
		
	- URI和URL
		- 统一资源标识符（Uniform Resource Identifier，或URI)是一个用于标识某一互联网资源名称的字符串
		- URL是Uniform Resource Locator的缩写，译为“统一资源定位符”。
		- URL是URI的子集！
		
* 原型链

	- 创建对象的几种方法
		- 字面量创建，等价于new Object()；
		- new、构造函数，原型如果未定义则默认生成！
		- Object.create()，Object.create(null)，则不继承任何原型！【将对象作为原型继承！】
	- 原型、构造函数、实例、原型链
		构造函数.__proto__===Function.prototype；构造函数是函数的实例！
	- instanceof的原理
		- typeof Array输出为function，因此 a instanceof Object!而不是Object.prototype
	- new运算符原理
		- 创建对象，继承构造函数的原型
		- 调用构造函数fun.call(this,args)
		- 如果构造函数返回对象，则new的结果为这个对象！
		
* 面向对象

	- 类的声明
		-es5
			function Animal(){
				this.name="animal";
			}
		-es6
			class Animal{
				constructor(name){
					this.name=name;
				}
			}
			
	- 类的继承(如果问到此题，则应该写所有的继承的方式。面试时间一定，如果此题多分析，则总的答题数量减少！)
		- 借助构造函数实现继承，无法继承Animal原型链的属性方法！
			function Cat(){
				Animal.call(this);
				this.type="call";
			}
			
		- 通过new继承原型属性，缺点：Cat的实例共有Animal原型（包括this.name属性，所以实例间可能相互影响!）
			function Cat(age){
				this.type='new';
			}
			Cat.prototype=new Animal();
			
		- 组合Prototype。但是父子类共用原型。子类Prototype修改，父类会受影响！
			function Cat(){
				Animal.call(this);
				this.type="proto"
			}
			Cat.prototype=Animal.prototype;
			
		- 组合new，对Prototype优化（父子类也达到了隔离），但是this.name被创建了2次！
			function Cat(){
				Animal.call(this);
				this.type="comped"
			}
			Cat.prototype=new Animal();//不推荐使用new，Animal中的属性this.name被创建2次！

		- 组合法create，父类原型被拷贝了一份，父子类原型对象隔离！（子类继承父类，子类prototype修改不会影响父类）
			function Cat(){
				Animal.call(this);
				this.type="create"
			}
			Cat.prototype=Object.create(Animal.prototype);//不推荐使用new，Animal中的属性this.name被创建2次！
			Cat.prototype.constructor=Cat;
		
		- 如何判断实例是由什么什么类类创建的，constructor！
		- 上述继承中，需要进一步修改Prototype.constructor属性！
		
	- 静态，私有，公有，特权
		- 静态，构造函数的静态属性只能通过构造函数自身调用，实例的静态属性只能通过实例自身调用！
			- 构造函数.name=name
			- 构造函数.say=function(){}
		- 私有，构造函数内部直接调用
			- function(){var name="123"}
			- func体on(){function say(){}
		- 公有，调用前必须实例化；通过this调用！
			- function(){this.name=name}
			- 构造函数.prototype.say=function(){}
		- 特权方法，可以直接调用私有属性，可以通过this调用共有属性，可以通过XX自身调用静态属性
			- function(){this.say=function(){}}
			
	- 函数和变量的声明会被提升至开头！
	
*通信类

	- 什么是同源策略
		协议、域名、端口相同，则是同源。从一个源加载的文档或脚本，如何与另一个源的资源进行交互！这是一个隔离签在恶意文件的关键机制！
	- 同源的限制
		- 跨源无法使用cookie、localStorage、indexDB
		- ajax无法跨源
		- DOM无法获得
	- 前后端如何通信
		- webSocket//不限制
		- CORS	//支持同源跨源
		- ajax	//同源通信
	- 如何创建ajax，XMLHttpRequest
		- XMLHttpRequest工作流程、兼容性（IE/火狐）、触发条件（）、触发顺序（）！
	- 跨域通信的集中方式
		-双向
			- location.hash//hash改变页面不会刷新
				- 窗口中2个页面，嵌套页面。
			- postMessage
				- 窗口中2个页面，嵌套页面。
			- webSocket//不受同源策略影响
				- http的局限性，无连接、无状态（请求响应后断开）！【1.0变相双向通信和消息推送：1、轮询、客户端定期请求；2、长轮询、服务端保持连接，直到有新消息才响应结束！】升级版有http1.1，支持持久连接，但是请求=响应！
				- websocket，支持长连接、双向实时通信！异步、事件驱动！
		-单向
			- jsonp
				-实现的原理script
			- cors//支持ajax的跨域通信（浏览器自动识别是否为跨域，跨域则添加origin头部）
				- fetch
					var myImage = document.querySelector('img');
					fetch('flowers.jpg')
					.then(function(response) {
					  return response.blob();
					})
					.then(function(myBlob) {
					  var objectURL = URL.createObjectURL(myBlob);
					  myImage.src = objectURL;
					});
					
* 前端安全
	- csrf跨站请求伪造！（网站b诱导用户点击，一个链接指向网站a的某个api链接，而浏览器自动携带cookie，导致网站a执行！）
		- 执行条件：1、网站a存在api漏洞，b用户登录了a站。
		- 防御措施
			Token验证，将其储存在 localStorage 中，在每次发起请求时手动将 Token 添加到请求中。（）
	- xss
	
* 算法
	- 排序
		* a冒泡
		* a选择
		* 插入
		* a快速
		* 归并
		* a希尔
	- 堆栈、队列。链表
		* 链表
		* 堆栈
		* 队列
	- 递归
		* 递归
	- 波兰式、逆波兰式
		* （1+2）*3
	- 技巧
		1. 请求提示
		2. 伪代码
		3. 知道原理
		
* 二面/三面
	- 知识面要广
	- 知识体系要深度
	- 内心要诚实（面试官，看什么书可以找到这个知识点？）
	- 态度要谦虚
	- 回答要灵活（我们可以查查资料）
	- 要学会赞美（我还没有看到这一点，回去后一定查询）
	
	- 渲染机制
		- 什么是doctype及作用
			DTD是一些列语法规则，告诉浏览器html文件是什么文档类型！
			DOCTYPE是用来声明文档类型和DTD规范。一个主要用途是文件的合法性验证，如果文件代码不符合要求，那么浏览器解析时便会出一些差错！
			- html5		
				<!DOCTYPE html>
			- html4.0.1 strict
				<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML4.0.1//EN" "http://www.w3.org/TR/html4/strict.dtd">
			- html4.0.1 transitional【包含所有html元素和属性，包括展示型和弃用的元素，如font】
				<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML4.0.1 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
				
		- 浏览器渲染过程
			html经过解析转为dom树，css经过解析转为css树，两者整合，通过layout计算实际尺寸位置得到render树，接着经过绘制呈现给用户
	
		- 重排reflow
			dom结构的各个子元素都有自己的盒模型，这需要浏览器根据各种样式规则来计算，将元素放在该出现的位置，这个过程为reflow！
			-触发reflow（）
				当增加、删除、修改dom节点时，会导致reflow和repaint
				放移动dom的位置，或者动画时
				当修改css样式时（尺寸等等）
				当resize窗口时，或者滚动屏幕
				当修改网页的默认字体时
		- 重绘repaint
			当各种盒子的位置、大小、及其他属性（如颜色、字体大小）等确定下来后，浏览器于是便将这些元素按照各自的特性绘制一遍，于是页面的内容出现了，这个过程被称之为repaint。
			- 触发repaint（页面内容变化，如何比小最小repaint。将结果存储，document片段！）
				dom改动
				css改动
		- 布局layout
	- js运行机制
		js单线程，同一时间只能执行一件事情！
		任务队列，（支持异步事件）
			异步任务，异步任务挂起，同步任务执行完毕后才会执行异步任务！
			同步任务
		什么是eventloop（3者循环）
			- 同步任务
			- 异步任务
			- setTimeout，setTimeout中的事件先放在这里，达到定时时间后放入异步任务队列
		异步任务
			setTimeout、setInterval
			DOM事件
			ES66中的promise
	- 页面性能
		- 资源压缩合并，减少http请求
		- 非核心代码异步加载-异步加载的方式-异步加载的区别
			- 动态脚本脚本
			- defer在html解析完后才会执行，如果是多个，按照加载的顺序依次执行！
			- async是在加载完后立刻执行，如果是多个，执行顺序和加载顺序无关！
			
		- 利用浏览器缓存，缓存的分类，缓存的原理（最重要的方式）
			- 强缓存【在有效期内不再与服务器通信】
				- Expires Expires:Thu,21 Jan 2017 23:39:02 GMT(下发时服务器时间)
				- Cache-Control Cache-Control:max-age=3600（相对时间，3600s缓存有效）（以次为准）
			- 协商缓存【客户端有缓存，但是过期，客户端携带（etag和if-modified-since）向服务器询问是否使用已有缓存）】
				Last-Modified if-Modefied-Since  Last-Modified:Wed,26 Jan 2017 00:35:11 GMT
				Etag if-None-Match（可以理解为缓存的hash，缓存比较）
		- 使用cdn（非常有用）
			- cdn
		- 预解析
			http默认打开了预解析，而https没有。页面中有多个其他页面，预解析非常有用
			- <meta http-equiv="x-dns-prefetch-control" content="on">
			- <link rel="dns-prefetch" href="//host_name_to_prefetch.com">
	
	- 错误监控
		- 如何检测js错误，如何保证产品质量
		- 前端错误的分类
			即时运行错误：(代码错误)
				try-catch
				window.onerror
			资源加载错误
				Object.onerror(img,script等发生错误使用onerror捕获！)
				performance.getEntries()获取页面加载项（通过差集即可知道未加载项）
				Error事件捕获
					window捕获错误！
			-跨域捕获错误
				-在script标签中添加crossorigin属性
				-在服务端设置Access-Control-Allow-Origin:*
		- 错误的捕获方式
		- 上报错误的基本原理
			- 采用ajax通信上报
			- img对象上报
			