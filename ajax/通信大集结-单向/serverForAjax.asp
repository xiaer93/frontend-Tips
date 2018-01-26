<%@ language="VBScript" codepage="65001" %>

<%
    dim name
    name=request.QueryString("name")
    Response.Write("来自于Ajax的消息：" & name)
%>