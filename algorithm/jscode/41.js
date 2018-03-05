/* *
 * Created by winack on 2018/3/3 
 */
/*
* 模块化，将复杂的系统分解成高内聚、低耦合的模块，使系统开发变得可控、可维护、可拓展，提高模块的复用率！
* 同步模块模式：加载模块后，无论模块是否存在，立即执行后续逻辑！
*
* 场景：大型应用都是协同开发的，每个程序员写一部分。通过模块化分解复杂系统，共同开发维护！
* */

var F=F||{};
/**
 * 定义模块（理论上模块方法应该放在闭包中，而此处模块直接放在F对象上！）
 * @param str
 * @param fn
 */
F.define=function (str,fn) {
    var parts=str.split('.');
    var old=parent=this;
    var i=len=0;

    //如果模块第一个命名为F,则删除！
    if(parts[i]==='F'){
        parts=parts.splice(1);
    }
    //避免重写define和module方法！
    if(parts[0]==='define' || parts[0]==='module'){
        return;
    }
    for(len=parts.length;i<len;++i){
        if(typeof parent[parts[i]]==='undefined'){
            parent[parts[i]]={};
        }
        old=parent;
        parent=parent[parts[i]];
    }
    //如果方法存在，则注册模块！
    if(fn){
        old[parts[--i]]=fn();
    }
    return this;
};

/**
 * 模块调用（被调用的模块（即方法）作为函数的参数传入！）
 */
F.module=function () {
    var args=[].slice.call(arguments);
    //获取待执行的函数！
    var fn=args.pop();
    var parts=args[0] && args[0] instanceof Array? args[0]:args;//????
    var module=[],
        modId='',
        i=0,
        ilen=parts.length,
        parent,j,jlen;
    while (i<ilen){
        if(typeof parts[i] === 'string'){
            parent=this;
            modId=parts[i].replace(/^F\./,'').split('.');
            for(j=0,jlen=modId.length;j<jlen;++j){
                parent=parent[modId[j]] || false;
            }
            module.push(parent);
        }else{
            //传入的对象直接添加进模块列表！
            module.push(parts[i])
        }
        i++;
    }
    fn.apply(null,module);
};

//案例
F.define('string',function () {
    return {
        trim:function (str) {
            return str.replace(/^\s+|\s+$/g,'');
        }
    }
});
F.define('dom',function () {
   var $=function (id) {
       $.dom=document.getElementById(id);
        return $;
   };
   $.html=function (html) {
       if(html){
           this.dom.innerHTML=html;
       }else{
           return this.dom.innerHTML;
       }
   };
   return $;
});
F.define('dom.addClass');
F.dom.addClass=function (type,fn) {
    return function (className) {
        if(!this.dom.classList.contains(className)){
            this.dom.classList.add(className);
        }
    }
};
//调用模块
F.module('dom','string.trim',document,function (dom,trim,doc) {
    dom("app").html('通过加载的模块设置文字！');
    doc.body.style.backgroundColor='red';
    console.log(trim('  abc  '));
});


//优化，将模块封装在闭包中，隐藏模块的调用！
var M=(function () {
    //返回的模块管理对象！
    var m={};
    //闭包储存模块信息！
    var modules={};
    m.define=function (str,fn) {
        var parts=str.split('.');

        if(parts[0]==='F'){
            parts=parts.splice(1);
        }
        if(parts[0]==='define' || parts[0]==='module'){
            return;
        }
        //将模块方法添加
        var old=modules,
            parent=modules;
        for(var i=0,len=parts.length;i<len;++i){
            if(typeof parent[parts[i]] === 'undefined'){
                parent[parts[i]]={};
            }
            old=parent;
            parent=parent[parts[i]];
        }
        if(fn){
            old[parts[--i]]=fn();
        }
        console.log(modules);
        return this;
    };
    m.module=function () {
        var args=[].slice.call(arguments);
        var fn=args.pop();
        var parts=args[0] && args[0] instanceof Array?args[0]:args;//多种调用模版方式，可以通过数组，也可以通过多个参数！
        //被导入的模块
        var tmpModule=[];
        var modID='',
            parent=modules;
        for(var i=0,ilen=parts.length;i<ilen;++i){
            if(typeof  parts[i]==='string'){
                modID=parts[i].replace(/^M\./,'').split('.');
                for(var j=0,jlen=modID.length;j<jlen;++j){
                    parent=parent[modID[j]] || false;
                }
                tmpModule.push(parent);
            }else{
                tmpModule.push(parts[i]);
            }
        }
        fn.apply(null,tmpModule);
    };
    return m;
})();
M.define('js.msg',function () {
    return {
        hi:function (name) {
            console.log('hi',name);
        }
    }
});
M.module('js.msg.hi',document,function (hi,doc) {
    hi('cjw');
    doc.body.appendChild(document.createTextNode('闭包形式的模块管理器！'))
});
