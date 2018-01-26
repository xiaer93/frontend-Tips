本章模拟了复杂页面，同时还封装了两个对象，一个用于多级菜单、另一个用于左右移动的图片。

主要技术知识点：
1. input等元素内部不能容纳其他的元素，所以无法使用:after和before等伪元素！
2. 清除表单空间样式：
    * input/button主要为background和border和padding！
    * select需要设置：appearance
3. 伸缩盒元素不能为position:absolute
4. 可以为块元素宽度为100%的块设置统一类名unit_100(提炼统一的属性，创建类)
5. form表单的的约束行为：required属性、novalidate不验证数据属性、oninvalid值无效时触发的函数！