# 前端前端
学习前端有一段时间了，贴上这段时间总结的一些代码。一是为了总结经验，二是希望能够有助于找份工作！

## 在线简历

[在线简历](http://clovey.party/xiaer/index.html)

## xmind

1. HTML&css，[下载xmind](https://pan.baidu.com/s/1slohDJR)，[下载doc](https://pan.baidu.com/s/1dE5kOXN)
2. JavaScript，[下载xmind](https://pan.baidu.com/s/1dFxt6i1)，[下载doc](https://pan.baidu.com/s/1dF2Jkfn)

## 其他仓库

1. 原生js实现简单的计算器，支持函数和常量[在线使用](http://clovey.party/SimpleCalculator/build/index.html)
2. jQ插件之日期选择器，支持年月日3种视图切换！[在线使用](http://clovey.party/datePicker/build/index.html)
3. 学习vue做的demo[在线网址](http://clovey.party/vue/index.html)

## css总结
> 总结了部分css效果，对效果进行简单分析对比，在实战项目中该选取何种方案？

1. [transition动画]
2. [animation动画]
	
3. [左右两栏布局](http://www.clovey.party/algorithm/cscode/3.html)
	1. 
4. [左右三栏布局](http://www.clovey.party/algorithm/cscode/4.html)
	- float布局，在文字环绕图片等情况具有不可替代作用！但是缺点：1、脱离文档流，并且容易造成父元素坍塌，需要及时清除浮动；2.脱离文档流，在父元素中设置的定位属性（text-align、vertical-align）均不会对子浮动元素产生影响；3.周围文字会环绕这个元素！；4.有时候2排图片（部分图片高度不同）浮动排列时，可能会混乱；兼容性较好
	- inline-block布局(需要使用calc特性)，1.需要处理空白问题；2.对早期ie支持不是很友好！应用：图片排列、横向导航条！
	- position布局，绝对定位简单快捷，但是脱离文档流（兄弟元素都需要脱离文档流！），对于移动端适应不是很友好。
	- grid布局，做二维平面的布局，通常用于整个页面的规划。最新版本的浏览器才支持！
	- table布局，具有垂直居中，等高，水平级联，匿名创建等特性（IE8的兼容性非常好）。
	- flex布局，做局部布局，如某些应用程序的组件和小规模的布局（移动端布局优选）。
	- 等高布局的几种方案
		- table、flex、grid、position
	- 种方案的兼容性如何，在业务最优选取何种方案？

5. 上下两栏布局
	1. [position布局实现](http://www.clovey.party/algorithm/cscode/5-1.html)
	2. [flex布局实现](http://www.clovey.party/algorithm/cscode/5-2.html)
	3. [grid布局实现](http://www.clovey.party/algorithm/cscode/5-3.html)
	4. [table布局实现](http://www.clovey.party/algorithm/cscode/5-4.html)
6. 上下三栏布局
	1. [flex布局实现](http://www.clovey.party/algorithm/cscode/6-1.html)
	2. [calc布局实现](http://www.clovey.party/algorithm/cscode/6-2.html)
	3. [grid布局实现](http://www.clovey.party/algorithm/cscode/6-3.html)
	4. [table布局实现](http://www.clovey.party/algorithm/cscode/6-4.html)
	5. [position布局实现](http://www.clovey.party/algorithm/cscode/6-5.html)
	6. 总结：position布局简单快速，但是脱离文档流了，后续内容都需要脱离文档流。同时对于移动端支持不是很友好！/table布局对于IE8的兼容性很好，垂直居中的特点。对于移动端支持不是很友好!/flex用于做局部布局/grid用于做二维平面布局，新版浏览器才支持！/calc方便快捷，css3属性！
7. [grid布局](http://www.clovey.party/algorithm/cscode/7.html)
	1. 网格布局，父元素设置：grid-template-areas/grid-template-columns/grid-template-rows
	2. 网格布局，子元素设置：grid-row/grid-column/grid-area
	3. 宽度高度属性：auto、percentage、length、fr（占有剩余空间）、min-content（网格项目占有最小宽度！）
8. [BFC总结](http://www.clovey.party/algorithm/cscode/8.html)
	1. Bfc为独立容器，内部元素的margin等不会影响到外部元素布局！（body为bfc！）
	2. bfc内部的box，会发生margin重叠！
	3. bfc不会与浮动元素发生重叠！
	4. bfc在计算高度时，会考虑内部浮动元素的高度！
	5. bfc内的box自上而下依次排布，每个box占据一行
	6. overflow不为visiable，position为absolute、fixed，浮动元素、根元素，table和flex、inline-flex等创建bfc
	7. bfc应用：清除浮动；避免外边距叠加、创建两列布局！
9. [IFC总结](http://www.clovey.party/algorithm/cscode/9.html)
	1. 就结构而言与BFC相同，具有margin、border、padding、content。
	2. ifc的高度仅能通过font-size来设置，宽度由内容来自适应！
	3. 当ifc宽度很大发生跨行时，将拆散为多个ifc分布在多行，margin-left仅对第一个ifc起作用！margin-right仅对最后一个生效！
	4. inline构建IFC！
10. [元素居中总结](http://www.clovey.party/algorithm/cscode/10.html)
	- 行内元素（包括inline-block）
		- text-align
		- table技术
		- line-height
		- vertical-align配合ghost技术
		- padding
	- 块级元素
		- margin实现水平居中
		- position：absolute配合负margin或者transform
		- flex
		- grid
11. [包含块总结](http://www.clovey.party/algorithm/cscode/11.html)
	- 创建包含块
		* 如果该元素的定位为 "relative" 或者 "static"，它的包含块由它最近的块级、单元格（table cell）或者行内块（inline-block）祖先元素的内容框创建。元素如果未声明 'position' 特性，那么就会采用 'position' 的默认值 "static"。
		* 如果元素是fixed定位元素，那么它的包含块是当前可视窗口（viewport）。
		* 绝对定位元素的包含块由离它最近的 'position' 属性为 'absolute'、'relative' 或者 'fixed' 的祖先元素创建，也就是非static祖先元素。但是如果当这个祖先元素为行内元素的时候，包含块就要取决于祖先元素的direction元素了。
		* html、body均为包含块
	- 单位百分比的参照：
	    * 参照父元素的宽度：padding、margin、width、text-align、left
	    * 参照父元素的高度：height、top、bottom
	    * 参照父元素字体：font-size、line-height（line-height不带单位时，参照当前字体尺寸！）
	    * 参照于自身：border-radius、transform-translate（自身的border-box）
	- 参照的选取：
	    * 普通元素（包括浮动元素）为相对父元素（块级元素、td、th、html、body）
	    * position：absolute参照于定位父元素（即position不为static的父元素）
	    * position：fixed参照于可视窗口尺寸
	    * position：relative参照于相对父元素，而left、top等参照与自身
	 - 细节
		* 子元素为absolute，则以父元素paddingbox为计算基准；子元素为relative，则以父元素contentbox为计算基准！（如计算子元素width：100%（float与relative相同））

12. []

## js总结

1. [搜索二叉树的实现](http://www.clovey.party/algorithm/jscode/1.js)
	1. js垃圾清理机制之一：引用计数法。因此删除二叉树的节点方式就是清空对象的引用次数！
	2. 搜索二叉树，只有左右子树，满子树节点数量2^k-1
	3. 代码实现插入、删除、遍历等基本功能；暂时未实现左右旋、半开策略等优化！

2. [自定义事件](http://www.clovey.party/algorithm/jscode/2.js)
	1. 简单的自定义事件类，支持添加、删除、触发事件等功能！
	2. js原生支持new Event()对象。使用dispatchEvent()触发事件！
	3. js原生支持new CustomEvent()对象
	4. js古老方案document.createEvent(),e.initEvent();

3. [jsonp的原理](http://www.clovey.party/algorithm/jscode/3.js)

4. [常见的算法](http://www.clovey.party/algorithm/jscode/4.js)
	> 数据排序随着数据量的增加，排序耗时成倍递增；因此通过划分数据减少排序耗时！但是当数据量较少时，不建议使用高级排序方法！
	1. 冒泡：
	2. 选择：比较次数多，但是交换次数少！
	3. 插入：
	4. 希尔：对数组通过增量值的方式分组，每组数组使用插入法排序！
	5. 快速：低于30个数据不适用！
	6. 归并：

5. [常用的数据结构](http://www.clovey.party/algorithm/jscode/5.js)
	> js原生数组支持队列和栈的操作方法，因此只需要构建链表结构！
	1. 队列
		1. 普通队列：主要用于排队问题模拟！
		2. 优先队列（加入数据后，判断数据的优先级！）
	2. 栈
		1. 应用：大数相加、寻找迷宫出口，将非尾递归转为迭代形式！
	3. 链表
		1. 单向链表
		2. 双向链表
		3. 循环链表
		4. 哈希表：如学生和课程的关系，使用哈希表可以节省大量数据空间！


6. [波兰式和逆波兰式](http://www.clovey.party/algorithm/jscode/6.js)
	1. 波兰式即为中序遍历结构，直观的写法；逆波兰式即为后序遍历结构，计算机易于分析计算的结构！
	2. 常用于解析器和表达式计算！

7. [递归](http://www.clovey.party/algorithm/jscode/7.js)
	1. 尾递归，函数执行完递归调用后没有其他需要执行的代码，且只执行一次递归调用！
		1. 可以转为for循环，优化节省内存！
	2. 非尾递归，
		1. 非尾递归转为非递归形式，需要配合使用数据结构---栈
	3. 间接递归，通过中间链调用自身
		1. 在接收数据的应用：接受、解码、储存----循环
	4. 不合理的递归
		1. 斐波切数列，使用递归非常耗计算机内存！
	5. 回溯问题（回溯过程需要取回已经放置的皇后！）（迷宫问题不需要复原变量！）
		1. 八皇后问题

## 通信

1. 前后端通信
	1. ajax
	2. jsonp
	3. websocket
2. 单向通信
	1. jsonp
	2. ajax
	3. img
	4. 
3. 跨域通信
	1. websocket
	2. cors
	3. postMessage
	4. hash

## 百度学院

> 在百度前端学院，做了一些老师给的小题目。

1. 表单验证
	1. [注册百度帐号](http://www.clovey.party/project/task-1/html/baidu.html)
	2. [通过正则表达式验证](http://www.clovey.party/project/task-1/html/index.html)
		- 常用中文：\u4e00-\u9fa5
		- 数字：\d
		- 数字字母：\w
		- 空白字符：\s
		- 单字节字符：\x00-\xff
		- 网址、邮箱：html支持email、url控件
	3. [html5新增表单验证](http://www.clovey.party/project/task-1/html/indexh5.html)
		- 定义提交不验证：novalidate
		- 定义对控制进行判断：required
		- oninvalid="setCustomValidity('tips')"，支持错误消息弹出！
		- input.checkValidity()检查控件是否有效！
	
2. [页面排版1](http://www.clovey.party/project/task-2/html/index.html)
3. [页面排版2](http://www.clovey.party/project/task-3/html/index.html)
4. [css定位的几种方式、需要改动](http://www.clovey.party/project/task-4/html/index.html)
5. [页面排版3](http://www.clovey.party/project/task-5/html/index.html)
6. [报刊排版](http://www.clovey.party/project/task-6/html/index.html)
7. [常见公司网站排版](http://www.clovey.party/project/task-7/html/index.html) 
	- [自定义select选择框](http://www.clovey.party/project/task-7/html/hack3.html)
8. [栅格化布局响应](http://www.clovey.party/project/task-8/html/index.html)
9. [复杂页面布局](http://www.clovey.party/project/task-9/html/index.html)  
	- [轮播图](http://www.clovey.party/project/task-9/html/slide.html)
	- [轮播图（纯css）](http://www.clovey.party/project/task-9/html/slidecss.html)
	- [多级菜单](http://www.clovey.party/project/task-9/html/mulitnav.html)
10. [移动端布局](http://www.clovey.party/project/task-10/html/index.html)
11. [常见排序算法动画](http://www.clovey.party/project/task-11/html/index.html)
12. [搜索二叉树](http://www.clovey.party/project/task-12/html/index.html)
13. [多叉树](http://www.clovey.party/project/task-12/html/mulitTree.html)
14. [听指令的小方块](http://www.clovey.party/project/task-13/html/index.html)
15. [浮层设计，需修改](http://www.clovey.party/project/task-14/html/index.html)
16. [排序表格](http://www.clovey.party/project/task-14/html/sorttable.html)
17. [3d动画](http://www.clovey.party/project/task-15/html/index.html)
18. [计算器](http://clovey.party/SimpleCalculator/build/index.html)

## 待完成

1. 完善上面的代码
2. 使用html5新增的布局标签重写百度前端学院任务！
3. 设计电脑端手机端兼容的个人简历
4. 学习使用vue框架
5. 。。。