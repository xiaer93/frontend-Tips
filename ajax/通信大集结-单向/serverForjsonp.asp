<%@ language="VBScript" codepage="65001" %>

<%
    dim name,callback
    callback=request.QueryString("jsonp")
    name=request.QueryString("name")
    Response.Write("top." & callback & "(" )
%>
{
    "info":"来自于jsonp的消息："
}
<%
    Response.Write(",'" & name & "'," & "4)")
%>