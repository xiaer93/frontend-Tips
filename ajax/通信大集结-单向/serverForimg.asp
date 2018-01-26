<%@ language="VBScript" codepage="65001" %>

<html>
<head>
    <meta charset="utf-8"/>
    <title>这是服务器的脚本！</title>
</head>
<body>
<%

    dim fs,fname
    set fs=Server.CreateObject("Scripting.FileSystemObject")
    set fname=fs.OpenTextFile("E:\wwwroot\index\log.txt",8,true)
    fname.WriteLine("记录文件：")

    for each key in Request.QueryString
        fname.WriteLine(key & "=" & request.QueryString(key))
    next
    fname.Close
    set fname=nothing
    set fs=nothing
%>

</body>
</html>