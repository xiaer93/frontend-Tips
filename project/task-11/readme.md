主要内容：
1. setTimeout函数，后面函数必须为对象，不能为调用形式！
2. window.setTimeout(sayName.bind(this),duration);给对象函数绑定执行环境！
3. 延时函数：
```/*创建延时绑定函数，被传入的函数通过返回true、false辨别是否继续循环执行！*/
   function delay(func,funcArgument,duration,callback) {
       setTimeout(function () {
           var flag=func(funcArgument);
           if(flag){
               setTimeout(arguments.callee,duration);
           }else{
               var event={
                   what:"排序完成!"
               };
               callback(event);
           }
       },0);
   }```
4. javascript没有作用块概念，因此参数部分推荐使用对象，并在每层次手动修复参数对象的数据
5.算法的可视化，每种算法都来一次！（冒泡、选择，插入，快速，归并！）