/*
	设计模式-原型模式
	- 应用：通过继承实现面向对象编程！
	- 案例：轮播图，多种切换方式
*/
/* *
 * Created by winack on 2018/1/26 
 */


//动画状态标识符
var STATE_INITIAL=0;
var STATE_START=1;
var STATE_STOP=2;

/**
 * 动画类。
 * 需求分析：1、生成过度动画；2、支持异步（同步）动画队列；3、支持动画执行完的回调函数；4、支持链式调用
 * 调用方式：1、t.add(ele,{width:200,duration:1000}).add(ele,{width:200,duration:1000,async:true})
 * 接口：
 *      - add(ele,options)添加动画
 *      - delay(duration)延时执行
 *      - start()运行动画
 *      - stop清空动画队列
 *
 */
(function(){
    //任务的标识符
    var TASK_SYNC=1;
    var TASK_ASYNC=2;

    /**
     * 动画队列管理，支持同步动画和异步动画
     */
    function Timeline() {
        var methods=[];
        var index=0;
        var _self=this;
        //动画任务的回调函数！（执行下一个任务）
        function next() {
            index+=1;
            run();
        }
        //运行动画队列
        function run() {
            if(index===methods.length){
                _self.stop();
            }else{
                methods[index]();
            }
        }
        //同步任务
        function sync(task) {
            var taskFn=function () {
                task();
                next();
            };
            methods.push(taskFn);
        }
        //异步任务
        function async(task) {
            var taskFn=function () {
                task(next);
            };
            methods.push(taskFn)
        }
        //添加任务
        this.addMethod=function (task,type) {
            if(type===TASK_SYNC){
                sync(task);
            }else{
                async(task);
            }
            return this;
        };
        //运行动画
        this.start=function () {
            run();
        };
        //清空动画队列表
        this.stop=function () {
            index=0;
            methods.length=0;
        }
    }

    /**
     * 定时器类，产生过度动画！
     * @param interval  定时时长
     * @param callback  动画执行完后的回调函数
     * @param next  动画队列的回调函数
     */
    function Timer(interval,callback,next) {
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
    }

    //单例对象
    var TimeFunction=(function() {
        /**
         * 动画变化函数
         * @param c 当前值
         * @param t 目标值
         * @param s 运行帧数
         * @param d 动画总帧数
         * @returns {*}
         */
        var instance=null;
        //待创建的单例对象
        function Single() {
            this.linear=function (c,t,s,d) {
                var step=(t-c)/(d-s);
                return (c+step);
            };
            this.easing=function (c,t,s,d) {
                var step=(t-c);
            };
        }

        return function () {
            //单例模式
            if(!instance){
                instance=new Single();
            }
            return instance;
        }
    })();


    function Transition(){
        this.state=STATE_INITIAL;
        //时间轴线，动画队列
        this.timeline=new Timeline();
        //动画变化函数
        this.timefunc=new TimeFunction();
        //定时器时长
        var interval=50;
        var _self=this;
        //动画任务个数
        var count=0;

        //闭包模式
        /**
         * 修改元素属性，实现动画效果
         * @param ele   元素
         * @param options   参数
         * @returns {function}  闭包函数
         */
        var change=function (ele,options) {
            //带单位px：如left等属性
            var px=['width','height','left','top','right','bottom'];
            //不带单位：如opacity等属性
            var dex=['opacity'];

            var property=options.p,
                current=options.c,
                target=options.t,
                steps=options.s;
            var index=0;
            var dest=current;
            var sign=(px.indexOf(property)===-1)?'':'px';

            return function () {
                current=dest=_self.timefunc.linear(current,target,++index,steps);
                ele.style[property]=dest+sign;
                return (index < steps);
            };
        };
        //工具函数-深度复制
        function extend(sup,sub) {
            sub=sub || {};
            for(var key in sup){
                sub[key]=sup[key]
            }
            return sub;
        }
        //装饰者模式
        function aop(sup,sub) {
            var ret;
            if(!sup){
                ret=sub;
            }else{
                ret=function () {
                    sup();
                    sub();
                };
            }
            return ret;
        }
        //暂时只支持position:absolute和opacity属性变化
        /**
         * 调用Timer和change等对象，创建动画！
         * @param ele   元素
         * @param options   参数
         */
        var t=function (ele,options) {
            var methods=[];
            var option={};
            option.s=Math.ceil(options.duration/interval);
            for(var key in options){
                switch (key){
                    case 'next':
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
            timer=null;//需要释放timer对象吗？
        };
        //添加动画任务
        this.add=function (ele,options) {
            //如果动画正在运行禁止添加动画任务！
            if(this.state===STATE_START){
                return this;
            }
            //动画任务计数！
            count+=1;
            //装饰者模式
            options.callback=aop(options.callback,function () {
                //任务完成后计数
               count-=1;
               if(count===0){
                   _self.state=STATE_STOP;
               }
            });

            if(options.hasOwnProperty('async') && options.async){
                //添加异步任务
                _self.timeline.addMethod(function (next) {
                    //添加异步任务队列回调函数
                    options.next=next;
                    t(ele,options);
                },TASK_ASYNC);
            }else{
                //添加同步任务
                _self.timeline.addMethod(function () {
                    t(ele,options);
                },TASK_SYNC);
            }
            return this;
        };
        //延时n秒
        this.delay=function () {
            return this;
        };
        //开始动画
        this.start=function () {
            if(this.state!==STATE_START){
                _self.timeline.start();
                this.state=STATE_START;
            }else{
                return ;
            }

        };
        //清空动画队列
        this.stop=function () {
            if(this.state!==STATE_STOP){
                this.timeline.stop();
                this.state=STATE_STOP;
            }else{
                return ;
            }
        };
        //释放资源
        this.dispose=function () {
            this.stop();
            this.state=STATE_INITIAL;
            this.timeline=null;
            this.timefunc=null;
        }
    }

    //生成接口
    window.Transition=Transition;
})();



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
    this.transition=new window.Transition();
    var _self=this;
    //初始化加载图片
    var load=function (imgArr) {
        _self.imgs.forEach(function (t, number) {
            t.src=imgArr[number];
        })
    };

    //工厂模式？？？策略模式
    function put(ele,p,v,sign) {
        ele.style[p]=v+(sign?'':'px');
    }
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
    var initOpacity={
        zero:function (ele) {
            put(ele,'opacity',0,true)
        },
        one:function (ele) {
            put(ele,'opacity',1,true)
        }
    };
    //设置初始位置
    var putPosition={
        //图片全部放在右侧
        right:function() {
            _self.imgs.forEach(function (t) {
                initPosition.right(t);
            })
        },
        left:function () {
            _self.imgs.forEach(function (t) {
                initPosition.left(t);
            })
        },
        center:function () {
            //
        },
        //左右交替
        lfrg:function () {
            _self.imgs.forEach(function (t,n) {
                if(n%2){
                    initPosition.left(t);
                }else {
                    initPosition.right(t);
                }
            })
        },
        factory:function (type) {
            if(putPosition[type]){
                putPosition[type]();
            }else {
                return new Error('指令错误！')
            }
        }
    };
    //设置初始透明度
    var putOpacity={
        hide:function () {
            _self.imgs.forEach(function (t) {
                initOpacity.zero(t);
            })
        },
        show:function () {
            _self.imgs.forEach(function (t) {
                initOpacity.one(t);
            })
        },
        factory:function (type) {
            if(putOpacity[type]){
                putOpacity[type]();
            }else {
                return new Error('指令错误！')
            }
        }
    };


    //初始设置img对象属性
    //建造者模式
    this.initImage=function (direction,opacity) {
        putPosition.factory(direction);
        putOpacity.factory(opacity);
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
        //如果动画正在执行，则直接返回
        if(this.transition.state===STATE_START){
            return;
        }
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
        _self.transition.start();
    };
};

//var s=new SlideImages([],'.m-slideshow',500,250);
//s.initImage('right','one');

var FadeImages=function () {
    LoopImages.apply(this,arguments);
    var _self=this;

    this.changeImage=function () {
        //如果动画正在执行，则直接返回
        if(this.transition.state===STATE_START){
            return;
        }
        var first=_self.index;
        var second=(_self.index+1)%_self.imgs.length;
        _self.imgs[second].style['z-index']=1;
        _self.transition.add(_self.imgs[second],{opacity:1,duration:1000,async:true,callback:function () {
            console.log('动画-1');
        }}).add(_self.imgs[first],{opacity:0,duration:100,async:true,callback:function () {
            console.log('动画-2');
            _self.imgs[second].style['z-index']='auto';
        }});
        _self.index=second;
        _self.transition.start();
    }
};
var f=new FadeImages([],'.m-slideshow',500,250);
f.initImage('center','hide');

