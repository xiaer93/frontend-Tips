(function () {
    var btnValue=['O','X'];
    $(".aside-btn").click(function (event) {
        if($(this).text()==='O'){
            $(".aside-banner").css("display","block");
            $(this).text(btnValue[1]);
        }else{
            $(".aside-banner").css("display","none");
            $(this).text(btnValue[0]);
        }
    })
})();