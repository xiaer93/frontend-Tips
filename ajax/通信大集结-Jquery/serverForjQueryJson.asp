<%@ language="VBScript" codepage="65001" %>

<%
    dim name,info
    name=request.QueryString("name")
	info="来自于asp的json数据"
	Response.write "{""info"":""" & info & """,""name"":""" & name & """}"
%>
