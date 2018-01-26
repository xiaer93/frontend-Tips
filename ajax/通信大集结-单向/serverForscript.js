var scripts=top.document.getElementsByTagName("script");
var i,len;
for(i=0,len=scripts.length;i<len;++i){
    var srcStr=scripts[i].src.substring(0);
    if(srcStr.length>0){
        var index=scripts[i].src.indexOf("?");
        if(index>0){
            var item=scripts[i].src.substring(index+1);
            var info=item.split("=");
            var name=decodeURIComponent(info[0]),
                value=decodeURIComponent(info[1]);
            top.callback("来自script文件的消息："+value,1);
            break;
        }
    }
}
//top.callback("来自script文件的消息！");