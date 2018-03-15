# swiper学习记录

1. swiper使用中，如果词汇拼写错误，将无法创建正确的轮播图，并且没有报错！
    - direction:"horizontal"，拼写错误将完全创建轮播图！
    - scrollbar:{el:".swiper-scrollbar"}，将无法创建滚动条！

2. 一个页面中引用多个Swiper，可以给每个容器加上ID或Class区分，要保留默认的类名swiper-container。
3. 默认情况下，类的名称已经定义，但是可以通过对应的变量进行修改！
    - 通过给预定义的类添加css属性，可对轮播图进行修改！
3. on监听事件，可以实现动画前中后的钩子控制！

4. 切换效果
    - slide
    - fade淡入淡出
    - cube立方体
    - coverflow空间旋转（第一个demo）
    - flipEffect三维翻转

5. 自动播放
    - delay延时，若向单独设置，则标签属性data-swiper-autoplay="2000"
    
6. 支持多个轮播图绑定，共进退！
    - thumbs.controller.control=gallery;
    - gallery.controller.control=thumbs;

7. 支持hash和history记录，需要在标签属性为data-hash或者data-history!
    - hash 修改url中的hash值，轮播图跳转
    - history 可以通过浏览器前进后退切换轮播图，并且每项slide都会保存历史记录！
    
8. 通过在swiper-container元素上添加标签属性：dir="rtl"，初始化后轮播图位于最右项！

9. 还可以设置视察模式parallax，即背景图每次变化一点点!
    - 位移data-swiper-parallax
    - 透明度data-swiper-parallax-opacity
    - 缩放data-swiper-parallax-scale
    - 视差动画持续时间data-swiper-parallax-duration

10. 背景或者img图片延迟加载
    - 图片延迟加载：需要将图片img标签的src改写成data-src，并且增加类名swiper-lazy。
    - 背景图延迟加载：载体增加属性data-background，并且增加类名swiper-lazy。
    - 当你设置了slidesPerView:'auto' 或者 slidesPerView > 1，还需要开启watchSlidesVisibility。
    - loadPrevNext设置为true允许将延迟加载应用到最接近的slide的图片（前一个和后一个slide）。
    - 对立面：：：swiper的一般选项preloadImages，强制加载所有图片
11. 支持响应式布局breakPoints，类似于媒体查询！

12. 允许轮播元素高度自定，通过开启一般选项autoHeight:true！（每个元素使用自己定义好的高度！）

13. 允许图片放大缩小，如开启一般选项zoom:true
    - <div class="swiper-slide"> <div class="swiper-zoom-container"> <img src="path/to/image"> </div> </div>
    
14. 开启虚拟virtual功能，可设置选项或true使用默认值，虚拟Slide只渲染当前slide和前后的slide。

15. 支持自定义插件，即自定义部分功能，新建的轮播图继承！

16. 

总结：swiper主要用于做轮播图，支持slide、fade、cube、coverflow、flip等形式切换，支持视差效果，支持自定义轮播元素的宽高、个数、分组滑动，支持多个轮播图绑定，支持hash和history，支持钩子函数，支持free模式和贴边缘模式！十分强大！