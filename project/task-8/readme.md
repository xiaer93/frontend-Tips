> 响应式网格，栅格化布局

1. html要写注释
2. :target为突出描点内容，指示活动的描点！
3. @media mediatype and|not|only (media feature) {CSS-Code;}
    1. 媒体类型有all、print、screen等
    2. 媒体功能有max-width、min-width等等！
4. 主要应用于移动端开发，设置尺寸！
     ```<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">```
5. css属性选择器记得使用，E(attr),E(attr="value")、E(attr~="value"【value属性值为中，以空格隔开】)、E(attr|="value"【以value-开头】)、还有^$*等等匹配符

重要：移动端栅格化布局必须设置meta的viewport属性！（target-densitydpi定义安卓屏幕采取高中低密度，默认为medium-dpi）
