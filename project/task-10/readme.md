##移动端的开发

flex布局的特点：
1. ![flex属性](/src/rec/flex.png)(图片引用处)[https://www.cnblogs.com/zourong/p/5630683.html]
2. 适用于应用程序的组件和小规模布局！
3. 如果只有一个子元素，可以设置子元素margin:auto实现居中！
4. 应用、圣杯布局、悬挂图片、input输入框应用，固定底栏（将底栏一直规定在页面底部，对body设置flex，？）

像素辨析
1. px为像素，dpi为单个像素占用物理像素的个数==物理像素/css像素==与物理像素无关的css像素==设备比例！
2. 如iPhone4的物理像素为640px，而设备设置缩放比例为2，所以检测出的像素为320px！可以通过调节比例缩放显示画面！
3. 通过设置viewport可以设置浏览器的实际窗口像素。而设置为device-width则为默认的窗口像素！（调整比例，达到改变画面大小的目的！【物理像素大小是固定的】）

横竖屏检测：通过@media的orientation可以检测横竖屏，portrait为竖屏、landscape为横屏！

jquery阻止默认时间和冒泡
1. 阻止默认事件event.preventDefault();
2. 阻止冒泡event.stopPropagation();
3. 阻止默认事件和冒泡，事件处理函数返回false即可！

网格布局特点：
1. 