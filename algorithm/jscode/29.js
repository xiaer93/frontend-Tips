/*
	设计模式-原型模式
	- 应用：
	- 案例：轮播图，多种切换方式
*/
/* *
 * Created by winack on 2018/1/26 
 */

//原型模式实现轮播图
function $(selectorText,context) {
    context=context || document;
    var ret=context.querySelectorAll(selectorText);
    //转为数组输出！
    return Array.prototype.slice.call(ret);
}

var LoopImages=function (imgArr,container,width,height) {
    this.index=0;
    this.width=width;
    this.height=height;
    this.container=container;
    this.imgs=$(container+' img');
    this.transition=new Transition();
    var _self=this;
    //初始化加载图片
    var load=function (imgArr) {
        _self.imgs.forEach(function (t, number) {
            t.src=imgArr[number];
        })
    };

    //工厂模式？？？策略模式
    var put=function (ele,direction,distance) {
        ele.style[direction]=distance+'px';
    };
    var initPosition={
        left:function (ele) {
            put(ele,'left',-width);
        },
        right:function (ele) {
            put(ele,'left',width);
        },
        top:function (ele) {
            put(ele,'top',-height);
        },
        bottom:function (ele) {
            put(ele,'top',height)
        },
        center:function (ele) {
            put(ele,'top',0);
            put(ele,'left',0)
        }
    };

    var putModule={
        //图片全部放在右侧
        right:function() {
            _self.imgs.forEach(function (t) {
                initPosition.right(t);
            })
        },
        factory:function (type) {
            if(putModule[type]){
                putModule[type]();
            }else {
                return new Error('指令错误！')
            }
        }
    };


    //初始设置img对象属性
    this.initImage=function (direction) {
        putModule.factory(direction);
    };
    this.changeImage=function (direction) {
        return new Error('抽象类必须重新定义！');
    }
};

//原型模式，继承LoopImages
//滑动
var SlideImages=function () {
    LoopImages.apply(this,arguments);
    var _self=this;

    //改为策略模式？
    this.changeImage=function (direction) {
        var first=_self.index;
        var second=(_self.index+1)%_self.imgs.length;

        _self.imgs[second].style['z-index']=1;
        _self.transition.add(_self.imgs[second],{left:0,duration:1000,async:true,callback:function () {
            console.log('动画-1');
        }}).add(_self.imgs[first],{left:_self.width,duration:100,async:true,callback:function () {
            console.log('动画-2');
            _self.imgs[second].style['z-index']='auto';
        }});
        _self.index=second;
        _self.transition.run();

    };
};

var s=new SlideImages([],'.m-slideshow',500,250);
s.initImage('right');

var FadeImages=function () {
    LoopImages.apply(this,arguments);

    this.changeImage=function () {

    }
};

//动画类
/**
 * 动画队列管理，支持同步动画和异步动画
 */
var TASK_SYNC=1;
var TASK_ASYNC=2;
function Timeline() {
    var methods=[];
    var index=0;
    var _self=this;
    //动画队列的回调函数！
    var next=function () {
        index+=1;
        _self.run();
    };
    //同步任务
    var sync=function (task) {
        var taskFn=function () {
            task();
            next();
        };
        methods.push(taskFn);
    };
    //异步任务
    var async=function (task) {
        var taskFn=function () {
            task(next);
        };
        methods.push(taskFn)
    };
    //添加任务
    this.addMethod=function (task,type) {
        if(type===TASK_SYNC){
            sync(task);
        }else{
            async(task);
        }
        return this;
    };
    //运行动画队列
    this.run=function () {
        if(index===methods.length){
            this.dispose();
        }else{
            methods[index]();
        }
    };
    this.dispose=function () {
        methods.length=0;
        index=0;
    }
}

function TimeFunction() {
    var distance=0;
    /**
     *
     * @param c 当前值
     * @param t 目标值
     * @param s 运行帧数
     * @param d 动画总帧数
     * @returns {*}
     */
    this.linear=function (c,t,s,d) {
        var step=(t-c)/(d-s);
        return (c+step);
    };
    this.easing=function (c,t,s,d) {
        var step=(t-c)
    }
}

function Transition(){
    //时间轴线，动画队列
    this.timeline=new Timeline();
    //动画变化函数
    this.timefunc=new TimeFunction();
    //定时器时长
    var interval=50;
    var _self=this;

    /**
     * 定时器类，产生过度动画！
     * @param interval  定时时长
     * @param callback  动画执行完后的回调函数
     * @param next  动画队列的回调函数
     * @constructor
     */
    var Timer=function (interval,callback,next) {
        this.frame=function () {
            return new Error('抽象函数不能直接调用！');
        };
        this.start=function() {
            var _self=this;
            setTimeout(function() {
                if(_self.frame()){
                    _self.start();
                }else{
                    if(callback) callback();
                    if(next) next();
                }
            },interval);
        };
    };
    /**
     * 修改元素属性，实现动画效果
     * @param ele   元素
     * @param options   参数
     * @returns {function}  闭包函数
     */
    var change=function (ele,options) {
        var property=options.p,
            current=options.c,
            target=options.t,
            steps=options.s;
        var index=0;
        var dest=current;
        return function () {
            current=dest=_self.timefunc.linear(current,target,++index,steps);
            ele.style[property]=dest+'px';
            return (index < steps);
        };
    };
    //深度复制
    var extend=function (sup,sub) {
        sub=sub || {};
        for(var key in sup){
            sub[key]=sup[key]
        }
        return sub;
    };
    //暂时只支持position:absolute和opacity属性变化
    /**
     * 调用Timer和change等对象，创建动画！
     * @param ele   元素
     * @param options   参数
     */
    var tran=function (ele,options) {
        var methods=[];
        var option={};
        option.s=Math.ceil(options.duration/interval);
        for(var key in options){
            switch (key){
                case '_next':
                case 'duration':
                case 'callback':
                    break;
                default:
                    var opt=extend(option);
                    opt.p=key;
                    opt.c=parseInt(getComputedStyle(ele)[key]);
                    opt.t=options[key];
                    methods.push(change(ele,opt))
            }
        }
        //重定义_frame。在同步任务中，需要创建2个不同的timer实例！
        //或者通过装饰者模式将同步任务使用一个定时器！？
        var timer=new Timer(interval,options.callback,options.next);
        timer.frame=function () {
            var flag=true;
            methods.forEach(function (t) {
                flag=flag && t();
            });
            return flag;
        };
        timer.start();
        timer=null;
    };

    this.add=function (ele,options) {
        //如果异步属性为true！
        if(options.hasOwnProperty('async') && options.async){
            _self.timeline.addMethod(function (next) {
                //添加异步任务队列回调函数
                options.next=next;
                tran(ele,options);
            },TASK_ASYNC);
        }else{
            _self.timeline.addMethod(function () {
                tran(ele,options);
            },TASK_SYNC);
        }
        return this;
    };
    this.delay=function () {
        return this;
    };
    this.run=function () {
        _self.timeline.run();
    };
    this.dispose=function () {
        this.timeline.dispose();
        this.timeline=null;
        this.timefunc=null;
    }
}

var t=new Transition();
//t.add($('.m-slideshow img')[2],{left:500,duration:2000,async:true}).add($('.m-slideshow img')[1],{left:500,duration:2000,async:true});
//t.add($('.m-slideshow img')[2],{left:500,top:150,duration:1000,async:false}).add($('.m-slideshow img')[1],{left:500,duration:1000,async:false});



