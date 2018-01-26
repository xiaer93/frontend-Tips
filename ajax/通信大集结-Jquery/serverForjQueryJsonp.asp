<%@ language="VBScript" codepage="65001" %>

<%
    dim name,callback,info
    callback=request.QueryString("jsonp")
    name=request.QueryString("name")
    Response.Write("top." & callback & "(" )
	
	info="来自于asp的jsonp数据:"
	Response.write "{""info"":""" & info & """,""name"":""" & name & """}"
	Response.Write("," & "5)")
%>
