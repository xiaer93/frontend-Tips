/* *
 * Created by winack on 2018/3/4 
 */
/**
 * mvvm即模型-视图-视图模型，为视图层量身定做一套视图模型，并在视图模型vm中创建属性和方法，为视图层绑定数据并实现交互！
 * 通过html创建视图呢？》
 */

var VM=function () {
    var Method={
        //dom为进度条容器，data为进度条数据模型！
        progressbar:function (dom,data) {

            //创建进度条
            var progress=document.createElement('div');
            progress.classList.add('box');
            var param=data.data;

            dom.appendChild(progress);

            //添加事件。非精确的鼠标拖动事件！
            progress.onmousedown=function () {
                document.onmousemove=function (event) {
                    var e=event || window.event;
                    var w=e.clientX;
                   param.position=parseInt((w<param.total)?w:param.total);
                   console.log(param.position);
                    progress.style.left=param.position+'px';
                };
                document.onselectstart=function () {
                    return false;
                }
            };
            document.onmouseup=function () {
                document.onmousemove=null;
                document.onselectstart=null;
            };
            //监视数据变化。通过demo.position=20可以直接修改视图层！（数据层变化引起视图层变化！）
            observe(param,function () {
                progress.style.left=param.position+'px';
            })
        }
        
    };
    function getBindData(dom) {
        var data=dom.getAttribute('data-bind');
        //将data转为对象！
        return !!data && (new Function("return ({"+data+"})"))();
    }
    function observe(data,callback) {
        for(var key in data){
            (function (data,key,value) {
                Object.defineProperty(data,key,{
                    configurable:true,
                    enumerable:false,
                    get:function () {
                        return value;
                    },
                    set:function (newVal) {
                        if(value===newVal){
                            return;
                        }
                        value=newVal;
                        callback();
                    }
                })
            })(data,key,data[key]);
        }
    }
    return function () {
        var doms=document.getElementsByTagName('*');
        var ctx=null;
        for(var i=0,len=doms.length;i<len;++i){
            ctx=getBindData(doms[i]);
            ctx.type && Method[ctx.type] && Method[ctx.type](doms[i],ctx);
        }
    }
}();