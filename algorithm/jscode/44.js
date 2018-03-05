/* *
 * Created by winack on 2018/3/4 
 */
/*
* mvc即模型-视图-控制，将业务逻辑、数据、视图分离！
* 组件式架构开发，常将视图、数据、业务逻辑等写在一个模块中。如果组件内容过多，常常造成层次混乱，增加开发和维护成本！为了使业务视图、数据、逻辑层次分明，诞生了mvc模式！
* */

//使用jquery库
function formateString(tpl,data) {
    var _left='{#',
        _right='#}';
    for(var key in data){
        tpl=tpl.replace(new RegExp(_left+key+_right,'g'),data[key]);
    }
    return tpl;
}

var MVC=MVC || {};
//数据层
MVC.model=function () {
    var M={};
    M.data={};
    //左侧侧边栏导航服务端请求得到的响应数据
    M.data.slideBar=[
        {
            text:'萌妹子',
            icon:'left_meng.png',
            title:'瞄耳萝莉的千本樱',
            content:'自古幼女有三好~',
            img:'left_meng_img.png',
            href:'http://moe.hao123.com'
        },
        {
            text:'动漫',
            icon:'left_comic.png',
            title:'瞄耳萝莉的千本樱',
            content:'自古幼女有三好~',
            img:'left_comic_img.png',
            href:'http://moe.hao123.com'
        }
    ];
    M.conf={};
    //侧边导航动画配置数据
    M.conf.slideBarCloseAnimate=false;
    //返回接口方法
    return {
        getData:function (m) {
            return M.data[m];
        },
        getConf:function (c) {
            return M.conf[c]
        },
        setData:function (m,v) {
            M.data[m]=v;
            return this;
        },
        setConf:function (c,v) {
            M.conf[c]=v;
            return this;
        }
    }
}();
//视图层
MVC.view=function () {
    var M=MVC.model;
    //内部视图创建方法
    var V={};
    //创建侧边导航模块视图
    V.createSideBar=function () {
        var html='';
        var data=M.getData('slideBar');//使用了数据层的数据，导致视图层和数据层发生了耦合！降低了视图创建的灵活与复用性！
        if(!data || !data.length){
            return;
        }
        var dom=$('<div>').attr('class','slidebar').attr('id','slidebar');
        var tpl={
            container:[
                '<div class="slidebar-inner"><ul>{#content#}</ul></div>',
                '<a href="#" hidefocus class="slidebar-close" title="收起"/>'
            ].join(''),
            item:[
                '<li>',
                '<a class="icon" href="{#href#}">',
                '<img src={#icon#}>',
                '<span>{#text#}</span>',
                '</a>',
                '<div class="box">',
                '<a class="title" href="{#href#}">{#title#}</a>',
                '</div>',
                '</li>'
            ].join('')
        };
        for(var i=0,len=data.length;i<len;i++){
            html+=formateString(tpl.item,data[i]);
        }
        dom.html(formateString(tpl.container,{content:html}));
        document.body.appendChild(dom[0]);
    };
    return function (v) {
        V[v]();
    }
}();
//控制层
MVC.ctrl=function () {
    var M=MVC.model;
    var V=MVC.view;
    //内部控制器创建方法
    var C={};
    //侧边导航栏模块的控制
    C.initSlideBar=function(){
        //渲染视图
        V('createSideBar');
        $('#slidebar')
            .on('mouseover','li',function () {
                document.body.style.backgroundColor='red';
            })
            .on('mouseout','li',function () {
                document.body.style.backgroundColor='white';
            })

    };


    C.initSlideBar();
}();