# 报纸排版
> 报纸排版，其页面尺寸相对固定，所以跨设备兼容性不好！在本案例中遇到一些问题。   


* 类的命名，类的命名应该简洁，但是主要信息应该表示清除。本案例中最开始命名contentThreeLeftPager，命名过长！改进后自我感觉良好
* 英文首字母大小写通过span包裹，设置font-size:1.2em实现！
* 汉字首字母下沉，通过float实现，借助margin调整位置！
* jQuery的动画方法animate使用：
    1. 形式一：```.animate( properties [, duration ] [, easing (jquery提供swing和linear)] [, complete ] )```
    2. 形式二：```.animate( properties, options(包括duration、easing、queue、step每一步动画调用【传入函数参数function(now, fx)】、progress、complete动画完成后调用、done函数执行后调用、fail动画失败后调用、always持续调用) )```
    3. 停止动画stop（参数1，参数2），延时delay（时长）
    4. 队列函数queue(func)，将函数加入队列，dequeue()出队咧！
* Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。_未研究！！！_

手机端打开时，the technolog后面字被挡住了？？？