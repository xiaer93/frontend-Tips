/* *
 * Created by winack on 2018/3/4 
 */
/*
* 视图模块化，将页面划分为一个个组件。一个完整的组件包含完整的视图和功能！
* */

/*
* new Function(arguments,fnbody)将字符串变为函数！
* eval(str)，在全局作用域下执行代码！(function(){eval('b=2')})()，输出结果为：window.b=2!
* */

/*
* 将视图与创建视图所需的数据及组件交互逻辑耦合在一起了？
* */
F.module('lib/template',function () {
   var _TplEngine=function (str,data) {
            if(data instanceof Array){
                var html='';
                var i=0,
                    len=data.length;
                for(;i<len;++i){
                    html+=_getTpl(str)(data[i]);//str为模版？data为数据？
                }
                return html;
            }else {
                return _getTpl(str)(data);
            }
       },
       _getTpl=function (str) {
            var ele=document.getElementById(str);
            if(ele){
                var html=/^(textarea|input)$/i.test(ele.nodeName)?ele.value:ele.innerHTML;
                return _compileTpl(html);
            }else{
                return _compileTpl(str);
            }
       },
       _dealTpl=function (str) {
            var _left='{%',
                _right='%}';
            return String(str)
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/[\r\t\n]/g,'')
                .replace(new RegExp(_left+'=(.*?)'+_right,'g'),"',typeof($1)==='undefined'?'':$1,'")
                .replace(new RegExp(_left,'g'),"');")
                .replace(new RegExp(_right,'g'),"template_array.push('");
       },
       _compileTpl=function (str) {
            var fnBody="    var template_array=[];\n" +
                "           var fn=(function (data) {\n" +
                "               var template_key='';\n" +
                "               for(key in data){\n" +
                "                   template_key+=('var '+key+'=data[\"'+key+'\"];');\n" +
                "               }\n" +
                "               eval(template_key);\n" +//借助eval执行js语句，即获取tagCloud变量！
                "               template_array.push('"+_dealTpl(str)+"');\n" +//此处dealTpl为调用函数！生成字符串，通过new Function生成函数！
                "               template_key=null;\n" +
                "           })(templateData);\n" +
                "           fn=null;\n" +
                "           return template_array.join('');";
            return new Function("templateData",fnBody);
            /*
           var template_array=[];
           var fn=(function (data) {
               var template_key='';
               for(key in data){
                   template_key+=('var '+key+'=data[\"'+key+'\"];');
               }
               eval(template_key);
               template_array.push('"+_dealTpl(str)+"');
               template_key=null;
           })(templateData);
           fn=null;
           return template_array.join('');
           */
       };
    return _TplEngine;
});