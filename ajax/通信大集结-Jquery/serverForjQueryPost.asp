<%@ language="VBScript" codepage="65001" %>

<%
    dim name
    name=Request.Form("name")
    Response.Write("来自于Ajax的Post消息：" & name)
%>