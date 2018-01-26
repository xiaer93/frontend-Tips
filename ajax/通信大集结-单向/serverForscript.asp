<%@ language="VBScript" codepage="65001" %>

<%
    dim name,out
    name=request.QueryString("name")
	out="来自于asp动态脚本的消息："&name
    Response.Write("top.callback('"+out+"',2)")
%>