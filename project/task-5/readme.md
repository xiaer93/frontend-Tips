> 表格布局

1：label和input包裹在块元素中（div）。指定div的宽度和高度！
2：所有label标签向左浮动，指定宽度和高度，并设置margin-right值！
3：input设置长度高度，填满div的内容区！

注意：
如果含有textarea等可变动高度元素，包裹在他外面的div不能设置高度！

参照：
小薇学院项目！

补充：
清除浮动3中方式：
a.在float元素下增加标签，设置属性clear：both(非语义化行为)
b.在父元素设置overflow：hidden（如果子元素有阴影会盖住！）
c.使用after和before伪类：.group:after,.group:before{content: '';display: table;}.group:after{clear: both;}  .group{*zoom: 1;}

> 两栏布局方案
* 右侧浮动，左侧转为BFC（其中在html结构中浮动元素位于正常文档流的上方）
* 右侧浮动，左侧设置margin-right：300px！