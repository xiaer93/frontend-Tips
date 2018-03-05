/* *
 * Created by winack on 2018/3/4 
 */
/**
 * 第一个参数为模块名，第二个参数为依赖模块，第三个为模块的主体！
 */
F.module('lib/event',['lib/dom'],function (dom) {
   var events={
       on:function (id, type,fn) {
            dom.g(id)['on'+type]=fn;
       }
   };
   return events;
});