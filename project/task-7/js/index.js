$(document).ready(function ($) {
    var url=String.prototype.substring.call(location,0);
    var choice=0;
    switch (true){
        case url.indexOf("news")>-1:
            $(".menu li:nth-child(2)").css("borderBottomColor","red");
            choice=2;
            break;
        default:
            $(".menu li:nth-child(1)").css("borderBottomColor","red");
            choice=1;
            break;
    }

    var dy={};
    $(".menu li").filter(function (index) { return index!==(choice-1); }).hover(
        function () {
            //delete dy.t1;
            clearTimeout(dy.t2);
            $(".menu li").eq(choice-1).css("borderBottomColor","transparent");
    },
        function () {
            delete dy.t2;
            dy.t2=setTimeout(function () {
                $(".menu li").eq(choice-1).css("borderBottomColor","red");
            },300)
    });
    $(".menu li").eq(choice-1).mouseenter(function () {
        $(this).css("borderBottomColor","red");
    })
});