/* *
 * Created by winack on 2018/3/4 
 */
//模拟jquery
(function (window) {
    var A=function (selector,context) {
        if(typeof selector==='function'){
            A(window).on('load',selector);
        }else{
            return new A.fn.init(selector,context);
        }
    };
    
    A.fn=A.prototype={
        constructor:A,
        init:function (selector,context) {
            if(typeof selector==='object'){
                this[0]=selector;
                this.length=1;
                return this;
            }
            this.length=0;
            context=document.getElementById(context) || document;
            if(~selector.indexOf('#')){
                this[0]=document.getElementById(selector.slice(1));
                this.length=1;
            }else if(~selector.indexOf('.')){
                var doms=[];
                var className=selector.slice(1);
                if(context.getElementsByClassName){
                    doms=context.getElementsByClassName(className)
                }else{
                    doms=context.getElementsByTagName('*');
                }
                for(var i=0,len=doms.length;i<len;++i){
                    if(doms[i].className && !!~doms[i].className.indexOf(className)){
                        this[this.length]=doms[i];
                        this.length++;
                    }
                }
            }else{
                var doms=context.getElementsByTagName(selector);
                for(var i=0,len=doms.length;i<len;++i){
                    this[i]=doms[i];
                }
                this.length=len;
            }
            this.context=context;
            this.selector=selector;
            return this;
        },
        length:0,
        push:[].push,
        splice:[].splice
    };
    A.fn.init.prototype=A.fn;
    A.extend=
})