/* *
 * Created by winack on 2018/3/3 
 */
/*
* 异步模块：加载模块后，等待模块加载完后，再执行后续的逻辑！
* 注册模块和调用模块的函数相同，但是使用略不同。当js文件被加载成功后，执行注册模块函数，从而实现（depCount--）的变化！
* 模块化开发不仅解决了系统的复杂性问题，而且减少了多人开发中变量、方法名被覆盖问题，通过其强大的命名空间管理。使模块的结构更合理。通过模块的引用，提高了模块代码的复用率！
* 现代常用模块加载方法：commonJS、amd、es6自带模块加载功能！
* */

(function () {
    var moduleCache={};
    window.F={};

    /**
     *
     * @param url       模块的url
     * @param modDeps   依赖的模块
     * @param modCallback   执行的主要函数！
     */
    F.module=function (url,modDeps,modCallback) {
        var args=[].slice.call(arguments);
        var callback=args.pop();
        var deps=(args.length && args[args.length-1] instanceof Array)?args.pop():[];
        var url=args.length?args.pop():null;
        var params=[],
            depsCount=0,
            i=0,
            len;
        if(len=deps.length){
            while (i<len){
                (function (i) {
                    depsCount++;
                    loadModule(deps[i],function (mod) {
                        params[i]=mod;
                        depsCount--;
                        if(depsCount===0){
                            setModule(url,params,callback);
                        }
                    })
                })(i);
                i++;
            }
        }else{
            setModule(url,[],callback);
        }
    };
    function setModule(moduleName,params,callback) {
        var _module,fn;
        if(moduleCache[moduleName]){
            _module=moduleCache[moduleName];
            _module.status='loaded';
            _module.exports=callback ? callback.apply(_module,params):null;
            while (fn=_module.onload.shift()){
                fn(_module.exports);
            }
        }else{
            callback && callback.apply(null,params);
        }
    }
    function loadModule(moduleName,callback) {
        var _module;
        if(moduleCache[moduleName]){
            _module=moduleCache[moduleName];
            if(_module.status==='loaded'){
                setTimeout(callback(_module.exports),0);
            }else{
                _module.onload.push(callback);
            }
        }else{
            moduleCache[moduleName]={
                moduleName:moduleName,
                status:'loading',
                exports:null,//接口提供的接口！
                onload:[callback]//模块加载完后的回调函数！
            }
        }
        loadScript(getUrl(moduleName));
    }
    function getUrl(moduleName) {
        return String(moduleName).replace(/\.js$/g,'')+'.js';
    }
    function loadScript(src) {
        var _script=document.createElement('script');
        _script.type='text/javascript';
        _script.charset='UTF-8';
        _script.async=true;
        _script.src=src;
        document.getElementsByTagName('head')[0].appendChild(_script);
    }
})();

