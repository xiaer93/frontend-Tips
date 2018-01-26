$(document).ready(function ($) {
    $(".child").click(function (event) {
        var target=event.target;
        /*如果为li的子元素span被单击，则将target改为其父元素li*/
        if(target.tagName.toLowerCase()==="span"){
            target=$(target).closest("li")[0];/*封装成对象但会对象，closese返回的是元素。综合此例原本返回对象，使用括号选取了对应元素*/
        }

        if(target.tagName.toLowerCase()==="li" && $(this).has(target).length>0){

            /*检测其他兄弟元素是否展开，如果有兄弟菜单展开，则关闭兄弟栏菜单*/
            var parent=$(target).closest("ul")[0];
            $(parent).find("li>ul:visible").css("display","none");
            $(target).css("backgroundColor", "transparent");

            /*给地址栏添加新路径*/
            $("#toplocation").empty();
            var top=$(target).parent(),
                location= [];
            location.push($(target).children("span").text());
            while (!top.hasClass("child")){
                var tmp=top.children("span").text();
                if(tmp!==""){
                    location.unshift(tmp);
                }
                top=top.parent();
            }
            $("#toplocation").append($("<span></span>").text(location.join(" \/ ")));

            /*如果存在子菜单，则打开它*/
            if($(">ul",target).length>0){
                $(">ul",target).css("display","block");
                $(target).css("backgroundColor", "#383d4e");
            }

        }else{
            $("ul:visible",this).css("display","none");
            $(">li",this).css("backgroundColor", "transparent");
        }
        /*阻止事件继续冒泡，再次传到document中*/
        event.stopPropagation();
    });
    $(document).click(function (event) {
        $(".child").trigger("click",event);
    });

    /*滑动向左移动*/
    $("#leftSlide").click(function (event) {
        bannerLeft();
    });
    $("#rightSlide").click(function () {
        bannerRight();
    });
});


function bannerLeft() {
    var flag=0;
    $(">div:last","#dv").css("display","block");
    $(">div","#dv").animate({left:"-=25.5%"},{duration:3000,queue:false,easing:"swing",complete:function () {

        flag+=1;
        if(flag===6){
            try{
                $(">div:nth(1)","#dv").css({"display":"none"});
                $(">div:first","#dv").css({left:"102%"});
                $("#dv").append($(">div:first","#dv"));
                flag=false;
            }catch (ex){
                console.log(ex.errorCode);
            }
        }
    }});
}
function bannerRight() {
    var flag=0;
    $(">div:first","#dv").css("display","block");
    $(">div","#dv").animate({left:"+=25.5%"},{duration:3000,queue:false,easing:"swing",complete:function () {
        flag+=1;
        if(flag===6){
            try{
                $(">div:nth(4)","#dv").css({"display":"none"});
                $("#dv").prepend($(">div:last","#dv"));
                $(">div:first","#dv").css({left:"-25.5%"});
                flag+=1;
            }catch (ex){
                console.log(ex.errorCode);
            }
        }
    }});
}