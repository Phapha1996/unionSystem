<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="glut.db.auto.Users"%>
<%@page import="glut.util.SecurityUtil"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Insert title here</title>
<link rel="stylesheet" type="text/css"
	href="../Ext/resources/css/ext-all.css">
<script type="text/javascript" src="../Ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="../Ext/ext-all.js"></script>
<script type="text/javascript" src="../Ext/src/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="../script/sys_act_sign_up_result.js" charset="UTF-8"></script>
<script type="text/javascript" charset="UTF-8">
	//获取名字和工号
	<%
	Users user=SecurityUtil.getUserInfo(request);
	
	%>
	
	var mbName ="<%=user.getMember().getName()%>";

	var dpm="<%=user.getMember().getDpmBrief()%>";
	
	var account="<%=user.getMember().getNumber()%>";
	
</script>
<style type="text/css">
</style>
</head>
<body>

	<div id="apply_activity_grid"></div>
</body>
</html>
