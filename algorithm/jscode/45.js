/* *
 * Created by winack on 2018/3/4 
 */
/*
* mvp即模型-视图-管理器，view层不再直接引用model层数据，而是通过presenter层实现对model层内的数据访问！所有层次的交互都发生在p层！
* mvc模式中，视图层直接引用数据层数据，导致控制层不知情，而数据的修改直接影响到视图层！
*
* 在mvp模式下，视图的创建和逻辑控制都在p层实现！将数据层和视图层完全解耦，是的对视图层的修改不会影响数据层，数据层数值的变动不会影响到视图层！
*
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

var MVP=function(){};
MVP.model=function () {
    var M={};
    M.data={};
    M.data.nav=[
        {
            mode:'pic',
            text:'图片',
            href:'#'
        },
        {
            mode:'new',
            text:'新闻',
            href:'#'
        }
    ];
    M.conf={};
    return {
        getData:function (m) {
            return M.data[m];
        },
        setData:function (m,v) {
            M.data[m]=v;
            return v;
        },
        getConf:function (c) {
            return M.conf[c];
        },
        setConf:function (c,v) {
            M.conf[c]=v;
            return v;
        }
    }
}();
MVP.view=function () {
    return function (str) {
        //将str转为期望的模版！
        var html=str;
        return html;
    }
}();
MVP.presenter=function () {
    var V=MVP.view;
    var M=MVP.model;
    var C={};
    //导航栏组件
    C.nav=function (M,V) {
        //创建视图
        var data=M.getData('nav');
        var tpl=[
            '<li class="{#mode#}" data-mode="{#mode#}">',
            '<a id="nav_{#mode#}" href="{#href#}" title="{#text#}">',
            '<i class="nav-icon-{#mode#}"></i>',
            '<span>{#text#}</span>',
            '</a>',
            '</li>'
        ].join('');
        var dom=$('<ul>').attr('class','navgation');
        var html='';
        for(var i=0,len=data.length;i<len;++i){
            html+=formateString(tpl,data[i]);
        }
        dom.append($(html));
        document.body.appendChild(dom[0]);
        
        //交互逻辑
        dom.on('click','li',function (e) {
            var msg='';
            if(e.target.tagName.toLowerCase()==='span'){
                msg=$(e.target).text();
            }else{
                msg=$(e.target).find('span').text();
            }
            alert(msg);
        })
    };
    return {
        init:function () {
            for(var i in C){
                C[i]&&C[i](M,V,i);
            }
        }
    }
}();
