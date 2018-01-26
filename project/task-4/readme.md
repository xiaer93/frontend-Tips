#定位居中
>float实现浮动流文档！而定位脱离了文档！

##定位的几种方式：
###水平方向：
* 如果是行内元素或者行内块元素，使用text-align:center！
* 如果是块元素，使用margin: 0 auto;
* 如果是多个块元素水平居中，
    1. 可以将块元素设置为display: inline-block;
    2. 使用伸缩盒布局，在父元素中设置display: flex;justify-content: center;
* 如果是多个块元素竖直方向依次排布，要求每个元素水平居中，还是可以使用margin:0 auto！
###竖直方向
* 如果是行内元素或者行内块元素：
    1. 如果是单行，
        1. 则可以使用padding-top和padding-bottom，两者属性值相等即可！
        2. 如果是单行文本，还可以使用line-height居中！
    2. 如果是多行，
        1. 如果padding不生效，可以在父元素中设置table&在子元素中设置table-cel
        2. 如果table不生效，可以使用伸缩盒模型  display: flex;justify-content: center;flex-direction: column;height: 400px;（高度必须设定）
        3. 多行文本，还有个hack方法，通过父元素:after插入inline-block元素，让子元素设置display: inline-block;vertical-align: middle;属性
* 如果是块元素：
    1. 知道子元素的宽高，可以利用负margin技术！
    2. 不知道子元素宽高，可以用过transform: translateY(-50%);转换！
    3. 还是可以使用伸缩盒，在父元素设置display: flex;flex-direction: column;justify-content: center;
###水平竖直方向
* 知道元素宽高，利用负margin！
* 不知道元素宽高，利用transform: translate(-50%, -50%);
* 伸缩盒，display: flex;justify-content: center;align-items: center;（必须知道父元素宽高）

> 多行文本居中，table代码
```
/*.center-table {
    display: table;
    height: 250px;
    background: white;
    width: 240px;
    margin: 20px;
  }
  .center-table p {
    display: table-cell;
    margin: 0;
    background: black;
    color: white;
    padding: 20px;
    border: 10px solid white;
    vertical-align: middle;
  }*/
  ```